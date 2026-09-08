from functools import wraps
from flask import request, jsonify
import jwt
import os
from bson.objectid import ObjectId
from database.db import db

def token_required(roles=None):
    """
    JWT Middleware to protect routes.
    roles: list of allowed roles (e.g., ['admin', 'customer'])
    """
    if roles is None:
        roles = []
        
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            
            # Check for token in headers
            if 'Authorization' in request.headers:
                parts = request.headers['Authorization'].split()
                if len(parts) == 2 and parts[0] == 'Bearer':
                    token = parts[1]
            
            if not token:
                return jsonify({'error': 'Authentication Token is missing!'}), 401
            
            try:
                # Decode token
                data = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
                current_user = None
                
                # Role-based user fetching
                if data['role'] == 'customer':
                    current_user = db.customers.find_one({'_id': ObjectId(data['user_id'])})
                elif data['role'] == 'admin':
                    current_user = db.admins.find_one({'_id': ObjectId(data['user_id'])})
                elif data['role'] == 'delivery_partner':
                    current_user = db.staff.find_one({'_id': ObjectId(data['user_id'])})
                    
                if not current_user:
                    return jsonify({'error': 'User associated with token not found!'}), 401
                
                # Check role authorization
                if roles and data['role'] not in roles:
                    return jsonify({'error': 'Unauthorized access! Your role cannot perform this action.'}), 403
                    
                # Attach role to current_user for route handlers
                current_user['role'] = data['role']
                
            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token has expired! Please login again.'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': 'Invalid token!'}), 401
            except Exception as e:
                return jsonify({'error': str(e)}), 500
                
            # Pass current user to the route
            return f(current_user, *args, **kwargs)
        return decorated
    return decorator
