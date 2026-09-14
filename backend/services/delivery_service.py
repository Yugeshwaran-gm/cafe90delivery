import uuid
from sqlalchemy import text, func
from database.connection import db
from database.models.order import Order, OrderStatusHistory, OrderStatus
from database.models.user import User, PartnerStatus, UserRole

class DeliveryService:
    @staticmethod
    def auto_dispatch_unassigned_orders(unassigned_threshold_minutes=5):
        """
        ROUND-ROBIN 5-MINUTE AUTO DISPATCHER:
        Finds orders with NO assigned delivery partner where created_at is older than threshold minutes.
        Auto-assigns to available delivery partners in Round-Robin fashion.
        """
        try:
            from datetime import datetime, timezone, timedelta
            cutoff_time = datetime.now(timezone.utc) - timedelta(minutes=unassigned_threshold_minutes)

            unassigned_orders = db.session.query(Order).filter(
                Order.delivery_partner_id.is_(None),
                Order.status.in_([OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.READY_FOR_PICKUP]),
                Order.created_at <= cutoff_time
            ).order_by(Order.created_at.asc()).all()

            if not unassigned_orders:
                return 0

            dispatched_count = 0

            for order in unassigned_orders:
                # Query available delivery partner (Round-Robin selection)
                available_partner = db.session.query(User).filter(
                    User.role == UserRole.DELIVERY_PARTNER,
                    User.is_active == True,
                    User.partner_status == PartnerStatus.AVAILABLE
                ).first()

                if not available_partner:
                    break

                order.delivery_partner_id = available_partner.id
                if order.status in [OrderStatus.PENDING, OrderStatus.CONFIRMED]:
                    order.status = OrderStatus.READY_FOR_PICKUP

                available_partner.partner_status = PartnerStatus.ON_DELIVERY

                history = OrderStatusHistory(
                    order_id=order.id,
                    status=order.status.value if hasattr(order.status, "value") else str(order.status),
                    changed_by_user_id=None,
                    notes=f"Auto-assigned to {available_partner.full_name} via 5-min Round-Robin dispatcher"
                )
                db.session.add(history)
                dispatched_count += 1

            if dispatched_count > 0:
                db.session.commit()
            return dispatched_count
        except Exception:
            db.session.rollback()
            return 0

    @staticmethod
    def get_available_pool():
        """Fetch unassigned active orders that have not been claimed by any delivery partner."""
        orders = db.session.query(Order).filter(
            Order.status.in_([OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.READY_FOR_PICKUP]),
            Order.delivery_partner_id.is_(None)
        ).order_by(Order.created_at.asc()).all()
        
        return [order.to_pool_dict() for order in orders]

    @staticmethod
    def get_assigned_orders(partner_id):
        orders = db.session.query(Order).filter(
            Order.delivery_partner_id == partner_id
        ).order_by(Order.created_at.desc()).all()
        
        return [order.to_dict() for order in orders]

    @staticmethod
    def claim_delivery_task(partner_id, order_id_str):
        """
        ATOMIC CONCURRENCY CLAIM TASK:
        Uses an atomic conditional SQL UPDATE statement.
        Guarantees that ONLY ONE driver gets the order, preventing race conditions.
        """
        try:
            order_uuid = uuid.UUID(order_id_str)
            
            # Atomic Conditional Update Query
            sql = text("""
                UPDATE orders
                SET delivery_partner_id = :partner_id,
                    status = 'OUT_FOR_DELIVERY',
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = :order_id
                  AND delivery_partner_id IS NULL
                  AND status IN ('PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP');
            """)
            
            result = db.session.execute(sql, {
                "partner_id": partner_id,
                "order_id": order_uuid
            })
            
            affected_rows = result.rowcount
            
            if affected_rows == 0:
                existing_order = db.session.get(Order, order_uuid)
                if not existing_order:
                    return None, "Order not found"
                if existing_order.delivery_partner_id is not None:
                    return None, "Too late! This task was already claimed by another delivery partner."
                return None, f"Order status is '{existing_order.status.value}', which cannot be claimed right now."
                
            # Log to OrderStatusHistory
            history = OrderStatusHistory(
                order_id=order_uuid,
                status=OrderStatus.OUT_FOR_DELIVERY.value,
                changed_by_user_id=partner_id,
                notes="Task claimed by delivery partner"
            )
            db.session.add(history)

            # AUTO STATUS CHANGE FOR DELIVERY PARTNER
            partner = db.session.get(User, partner_id)
            if partner:
                partner.partner_status = PartnerStatus.ON_DELIVERY

            db.session.commit()
            
            updated_order = db.session.get(Order, order_uuid)
            return updated_order.to_dict(), None
            
        except ValueError:
            db.session.rollback()
            return None, "Invalid Order ID format"
        except Exception as e:
            db.session.rollback()
            return None, str(e)

    @staticmethod
    def update_delivery_status(partner_id, order_id_str, new_status_str):
        """Update delivery status (Picked Up, Out for Delivery, Delivered) for assigned order."""
        try:
            order_uuid = uuid.UUID(order_id_str)
            order = db.session.get(Order, order_uuid)
            
            if not order:
                return None, "Order not found"
            if str(order.delivery_partner_id) != str(partner_id):
                return None, "Order is not assigned to you"

            # Terminal State Check: Cannot modify DELIVERED or CANCELLED orders
            if order.status in [OrderStatus.DELIVERED, OrderStatus.CANCELLED]:
                current_val = order.status.value if hasattr(order.status, "value") else str(order.status)
                return None, f"Order #{order.order_number} is already '{current_val}' and cannot be modified."
                
            allowed_statuses = [OrderStatus.OUT_FOR_DELIVERY.value, OrderStatus.DELIVERED.value]
            if new_status_str not in allowed_statuses:
                return None, f"Invalid delivery status. Allowed: {allowed_statuses}"
                
            order.status = OrderStatus(new_status_str)
            
            history = OrderStatusHistory(
                order_id=order.id,
                status=new_status_str,
                changed_by_user_id=partner_id,
                notes=f"Delivery status updated to {new_status_str}"
            )
            db.session.add(history)

            # AUTO STATUS CHANGE: Check if partner has remaining active orders
            if new_status_str == OrderStatus.DELIVERED.value:
                active_remaining = db.session.query(func.count(Order.id)).filter(
                    Order.delivery_partner_id == partner_id,
                    Order.status.in_([OrderStatus.OUT_FOR_DELIVERY, OrderStatus.READY_FOR_PICKUP]),
                    Order.id != order_uuid
                ).scalar() or 0

                partner = db.session.get(User, partner_id)
                if partner and active_remaining == 0:
                    partner.partner_status = PartnerStatus.AVAILABLE

            db.session.commit()
            
            return order.to_dict(), None
        except Exception as e:
            db.session.rollback()
            return None, str(e)

    @staticmethod
    def update_partner_work_status(partner_id, status_str):
        try:
            partner = db.session.get(User, partner_id)
            if not partner or partner.role != "delivery_partner":
                return None, "Invalid delivery partner"

            try:
                new_status = PartnerStatus(status_str)
            except ValueError:
                return None, f"Invalid status. Allowed: {[s.value for s in PartnerStatus]}"

            partner.partner_status = new_status
            db.session.commit()
            return partner.to_dict(), None
        except Exception as e:
            db.session.rollback()
            return None, str(e)

    @staticmethod
    def get_partner_history_and_stats(partner_id):
        partner = db.session.get(User, partner_id)
        if not partner:
            return None, "Partner not found"

        assigned_orders = db.session.query(Order).filter(
            Order.delivery_partner_id == partner_id
        ).order_by(Order.created_at.desc()).all()

        delivered_count = sum(1 for o in assigned_orders if o.status == OrderStatus.DELIVERED)
        active_count = sum(1 for o in assigned_orders if o.status in [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.READY_FOR_PICKUP])
        total_earnings = delivered_count * 40.0 # Fixed incentive ₹40 per delivery

        return {
            "partner_id": str(partner.id),
            "partner_name": partner.full_name,
            "partner_email": partner.email,
            "partner_status": partner.partner_status.value if isinstance(partner.partner_status, PartnerStatus) else partner.partner_status,
            "delivered_count": delivered_count,
            "active_count": active_count,
            "total_earnings": total_earnings,
            "orders": [o.to_dict() for o in assigned_orders]
        }, None

    @staticmethod
    def update_partner_live_location(partner_id, latitude, longitude):
        try:
            partner = db.session.get(User, partner_id)
            if not partner or partner.role != "delivery_partner":
                return None, "Invalid delivery partner"

            partner.current_latitude = float(latitude)
            partner.current_longitude = float(longitude)
            db.session.commit()
            return partner.to_dict(), None
        except Exception as e:
            db.session.rollback()
            return None, str(e)
