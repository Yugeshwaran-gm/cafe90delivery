from flask import request, jsonify
from database.db import db
from utils.helpers import serialize_doc, serialize_docs
from bson.objectid import ObjectId
import datetime

def get_assigned_orders(current_user):
    orders = list(db.orders.find({'delivery_partner_id': current_user['_id']}).sort('created_at', -1))
    return jsonify({
        'status': 'success',
        'count': len(orders),
        'data': serialize_docs(orders)
    }), 200

def get_today_orders(current_user):
    today = datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    orders = list(db.orders.find({
        'delivery_partner_id': current_user['_id'],
        'created_at': {'$gte': today}
    }))
    
    delivered_count = sum(1 for order in orders if order.get('status') == 'Delivered')
    
    return jsonify({
        'status': 'success',
        'total_assigned_today': len(orders),
        'delivered_today': delivered_count,
        'data': serialize_docs(orders)
    }), 200

def update_delivery_status(current_user, order_id):
    data = request.get_json()
    status = data.get('status')
    
    allowed_statuses = ['Picked Up', 'Out for Delivery', 'Delivered']
    
    if status not in allowed_statuses:
        return jsonify({'error': f'Invalid status. Allowed: {allowed_statuses}'}), 400
        
    try:
        timeline_entry = {
            'status': status,
            'timestamp': datetime.datetime.utcnow()
        }
        
        # Verify this order belongs to this delivery partner
        result = db.orders.update_one(
            {
                '_id': ObjectId(order_id),
                'delivery_partner_id': current_user['_id']
            },
            {
                '$set': {'status': status},
                '$push': {'timeline': timeline_entry}
            }
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Order not found or not assigned to you'}), 404
            
        return jsonify({'message': f'Delivery status updated to {status}'}), 200
    except:
        return jsonify({'error': 'Invalid ID format'}), 400
