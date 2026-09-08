from flask import request, jsonify
from database.db import db
from utils.helpers import serialize_doc, serialize_docs
from bson.objectid import ObjectId
import datetime

def place_order(current_user):
    data = request.get_json()
    delivery_address = data.get('delivery_address')
    payment_method = data.get('payment_method', 'COD')
    
    if not delivery_address:
        return jsonify({'error': 'Delivery address is required'}), 400
        
    # Get user's cart items
    pipeline = [
        {'$match': {'user_id': current_user['_id']}},
        {
            '$lookup': {
                'from': 'food_items',
                'localField': 'item_id',
                'foreignField': '_id',
                'as': 'food_details'
            }
        },
        {'$unwind': '$food_details'}
    ]
    cart_items = list(db.carts.aggregate(pipeline))
    
    if not cart_items:
        return jsonify({'error': 'Cart is empty'}), 400
        
    total_amount = sum(item['quantity'] * item['food_details']['price'] for item in cart_items)
    
    order_items = [{
        'item_id': item['item_id'],
        'name': item['food_details']['name'],
        'quantity': item['quantity'],
        'price': item['food_details']['price']
    } for item in cart_items]
    
    order = {
        'customer_id': current_user['_id'],
        'customer_name': current_user['name'],
        'customer_phone': current_user['phone'],
        'items': order_items,
        'total_amount': total_amount,
        'delivery_address': delivery_address,
        'payment_method': payment_method,
        'payment_status': 'Pending' if payment_method == 'COD' else 'Completed',
        'status': 'Pending', 
        'delivery_partner_id': None,
        'timeline': [{
            'status': 'Pending',
            'timestamp': datetime.datetime.utcnow()
        }],
        'created_at': datetime.datetime.utcnow()
    }
    
    result = db.orders.insert_one(order)
    
    # Clear cart
    db.carts.delete_many({'user_id': current_user['_id']})
    
    order['_id'] = result.inserted_id
    return jsonify({
        'message': 'Order placed successfully',
        'order': serialize_doc(order)
    }), 201

def get_customer_orders(current_user):
    orders = list(db.orders.find({'customer_id': current_user['_id']}).sort('created_at', -1))
    return jsonify({
        'status': 'success',
        'data': serialize_docs(orders)
    }), 200

def get_all_orders(current_user):
    # Admin only
    orders = list(db.orders.find().sort('created_at', -1))
    return jsonify({
        'status': 'success',
        'count': len(orders),
        'data': serialize_docs(orders)
    }), 200

def update_order_status(current_user, order_id):
    # Admin can update status directly
    data = request.get_json()
    status = data.get('status')
    
    if not status:
        return jsonify({'error': 'Status is required'}), 400
        
    try:
        timeline_entry = {
            'status': status,
            'timestamp': datetime.datetime.utcnow()
        }
        
        result = db.orders.update_one(
            {'_id': ObjectId(order_id)},
            {
                '$set': {'status': status},
                '$push': {'timeline': timeline_entry}
            }
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Order not found'}), 404
            
        return jsonify({'message': f'Order status updated to {status}'}), 200
    except:
        return jsonify({'error': 'Invalid ID format'}), 400

def assign_order(current_user, order_id):
    data = request.get_json()
    partner_id = data.get('delivery_partner_id')
    
    if not partner_id:
        return jsonify({'error': 'Delivery partner ID is required'}), 400
        
    try:
        timeline_entry = {
            'status': 'Assigned',
            'timestamp': datetime.datetime.utcnow()
        }
        
        result = db.orders.update_one(
            {'_id': ObjectId(order_id)},
            {
                '$set': {
                    'delivery_partner_id': ObjectId(partner_id),
                    'status': 'Assigned'
                },
                '$push': {'timeline': timeline_entry}
            }
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Order not found'}), 404
            
        return jsonify({'message': 'Order assigned to delivery partner'}), 200
    except:
        return jsonify({'error': 'Invalid ID format'}), 400
