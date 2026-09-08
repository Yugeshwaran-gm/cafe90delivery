from flask import request, jsonify
from database.db import db
from utils.helpers import serialize_doc, serialize_docs
from bson.objectid import ObjectId
import datetime

def add_food_item(current_user):
    data = request.get_json()
    
    required_fields = ['name', 'price', 'category', 'description']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400
            
    food_item = {
        'name': data['name'],
        'price': float(data['price']),
        'category': data['category'],
        'description': data['description'],
        'image_url': data.get('image_url', ''),
        'is_available': data.get('is_available', True),
        'created_at': datetime.datetime.utcnow()
    }
    
    result = db.food_items.insert_one(food_item)
    food_item['_id'] = result.inserted_id
    
    return jsonify({
        'message': 'Food item added successfully',
        'food_item': serialize_doc(food_item)
    }), 201

def get_all_food_items():
    # Customer can browse without login
    category = request.args.get('category')
    search = request.args.get('search')
    
    query = {}
    if category:
        query['category'] = category
    if search:
        query['name'] = {'$regex': search, '$options': 'i'}
        
    food_items = list(db.food_items.find(query))
    return jsonify({
        'status': 'success',
        'count': len(food_items),
        'data': serialize_docs(food_items)
    }), 200

def get_single_food_item(item_id):
    try:
        food_item = db.food_items.find_one({'_id': ObjectId(item_id)})
        if not food_item:
            return jsonify({'error': 'Food item not found'}), 404
        return jsonify({'status': 'success', 'data': serialize_doc(food_item)}), 200
    except:
        return jsonify({'error': 'Invalid ID format'}), 400

def update_food_item(current_user, item_id):
    data = request.get_json()
    
    try:
        result = db.food_items.update_one(
            {'_id': ObjectId(item_id)},
            {'$set': data}
        )
        if result.matched_count == 0:
            return jsonify({'error': 'Food item not found'}), 404
            
        updated_item = db.food_items.find_one({'_id': ObjectId(item_id)})
        return jsonify({
            'message': 'Food item updated successfully',
            'data': serialize_doc(updated_item)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def delete_food_item(current_user, item_id):
    try:
        result = db.food_items.delete_one({'_id': ObjectId(item_id)})
        if result.deleted_count == 0:
            return jsonify({'error': 'Food item not found'}), 404
            
        return jsonify({'message': 'Food item deleted successfully'}), 200
    except:
        return jsonify({'error': 'Invalid ID format'}), 400
