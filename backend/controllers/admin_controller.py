from flask import request, jsonify
from database.db import db
from utils.helpers import serialize_doc, serialize_docs
from bson.objectid import ObjectId
import datetime
import bcrypt

def get_dashboard_stats(current_user):
    total_customers = db.customers.count_documents({})
    total_orders = db.orders.count_documents({})
    pending_orders = db.orders.count_documents({'status': 'Pending'})
    delivered_orders = db.orders.count_documents({'status': 'Delivered'})
    
    # Calculate total revenue from Delivered orders
    pipeline = [
        {'$match': {'status': 'Delivered'}},
        {'$group': {'_id': None, 'total_revenue': {'$sum': '$total_amount'}}}
    ]
    revenue_result = list(db.orders.aggregate(pipeline))
    total_revenue = revenue_result[0]['total_revenue'] if revenue_result else 0
    
    return jsonify({
        'status': 'success',
        'data': {
            'total_customers': total_customers,
            'total_orders': total_orders,
            'pending_orders': pending_orders,
            'delivered_orders': delivered_orders,
            'total_revenue': total_revenue
        }
    }), 200

def get_customer_list(current_user):
    customers = list(db.customers.find({}, {'password': 0}))
    return jsonify({
        'status': 'success',
        'count': len(customers),
        'data': serialize_docs(customers)
    }), 200

def get_pending_orders(current_user):
    orders = list(db.orders.find({'status': 'Pending'}).sort('created_at', -1))
    return jsonify({
        'status': 'success',
        'count': len(orders),
        'data': serialize_docs(orders)
    }), 200

def add_staff(current_user):
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    staff_id = data.get('staff_id')
    password = data.get('password')
    
    if not all([name, email, phone, staff_id, password]):
        return jsonify({'error': 'All fields are required'}), 400
        
    if db.staff.find_one({'staff_id': staff_id}):
        return jsonify({'error': 'Staff ID already exists'}), 400
        
    if db.staff.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 400
        
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    staff = {
        'name': name,
        'email': email,
        'phone': phone,
        'staff_id': staff_id,
        'password': hashed_password.decode('utf-8'),
        'created_at': datetime.datetime.utcnow()
    }
    
    result = db.staff.insert_one(staff)
    staff['_id'] = result.inserted_id
    del staff['password']
    
    return jsonify({
        'message': 'Staff added successfully',
        'data': serialize_doc(staff)
    }), 201

def update_staff(current_user, staff_id):
    data = request.get_json()
    
    if 'password' in data:
        data['password'] = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
    try:
        result = db.staff.update_one(
            {'_id': ObjectId(staff_id)},
            {'$set': data}
        )
        if result.matched_count == 0:
            return jsonify({'error': 'Staff not found'}), 404
            
        return jsonify({'message': 'Staff updated successfully'}), 200
    except:
        return jsonify({'error': 'Invalid ID format'}), 400

def delete_staff(current_user, staff_id):
    try:
        result = db.staff.delete_one({'_id': ObjectId(staff_id)})
        if result.deleted_count == 0:
            return jsonify({'error': 'Staff not found'}), 404
            
        return jsonify({'message': 'Staff deleted successfully'}), 200
    except:
        return jsonify({'error': 'Invalid ID format'}), 400

def get_staff_list(current_user):
    staff = list(db.staff.find({}, {'password': 0}))
    return jsonify({
        'status': 'success',
        'count': len(staff),
        'data': serialize_docs(staff)
    }), 200
