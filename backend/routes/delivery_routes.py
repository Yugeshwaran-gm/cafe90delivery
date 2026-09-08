from flask import Blueprint
from controllers.delivery_controller import get_assigned_orders, get_today_orders, update_delivery_status
from middleware.auth import token_required

delivery_bp = Blueprint('delivery', __name__)

delivery_bp.route('/assigned-orders', methods=['GET'])(token_required(['delivery_partner'])(get_assigned_orders))
delivery_bp.route('/today-orders', methods=['GET'])(token_required(['delivery_partner'])(get_today_orders))
delivery_bp.route('/order/<order_id>/status', methods=['PUT'])(token_required(['delivery_partner'])(update_delivery_status))
