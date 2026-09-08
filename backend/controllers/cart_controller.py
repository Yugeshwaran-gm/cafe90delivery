from flask import request, jsonify
from database.db import db
from utils.helpers import serialize_doc, serialize_docs
from bson.objectid import ObjectId
import datetime

def add_to_cart(current_user):
    data = request.get_json()
    item_id = data.get('item_id')
    quantity = data.get('quantity', 1)
    
    if not item_id:
        return jsonify({'error': 'Item ID is required'}), 400
        
    try:
        food_item = db.food_items.find_one({'_id': ObjectId(item_id)})
        if not food_item:
            return jsonify({'error': 'Food item not found'}), 404
            
        cart_item = db.carts.find_one({
            'user_id': current_user['_id'],
            'item_id': ObjectId(item_id)
        })
        
        if cart_item:
            db.carts.update_one(
                {'_id': cart_item['_id']},
                {'$inc': {'quantity': quantity}}
            )
        else:
            db.carts.insert_one({
                'user_id': current_user['_id'],
                'item_id': ObjectId(item_id),
                'quantity': quantity,
                'created_at': datetime.datetime.utcnow()
            })
            
        return jsonify({'message': 'Item added to cart successfully'}), 200
    except:
        return jsonify({'error': 'Invalid Item ID format'}), 400

def get_cart_items(current_user):
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
    return jsonify({
        'status': 'success',
        'data': serialize_docs(cart_items)
    }), 200

def remove_from_cart(current_user, cart_id):
    try:
        result = db.carts.delete_one({
            '_id': ObjectId(cart_id),
            'user_id': current_user['_id']
        })
        
        if result.deleted_count == 0:
            return jsonify({'error': 'Cart item not found'}), 404
            
        return jsonify({'message': 'Item removed from cart'}), 200
    except:
        return jsonify({'error': 'Invalid ID format'}), 400

def update_cart_quantity(current_user, cart_id):
    data = request.get_json()
    quantity = data.get('quantity')
    
    if not quantity or quantity < 1:
        return jsonify({'error': 'Valid quantity is required'}), 400
        
    try:
        result = db.carts.update_one(
            {'_id': ObjectId(cart_id), 'user_id': current_user['_id']},
            {'$set': {'quantity': quantity}}
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Cart item not found'}), 404
            
        return jsonify({'message': 'Cart quantity updated'}), 200
    except:
        return jsonify({'error': 'Invalid ID format'}), 400
