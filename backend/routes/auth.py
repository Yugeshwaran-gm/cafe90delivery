from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
import jwt
import datetime
import os

from database.db import get_db

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()


# ─────────────────────────────────────────────
#  POST /api/auth/register
#  Register a new customer
# ─────────────────────────────────────────────
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    name     = data.get('name', '').strip()
    email    = data.get('email', '').strip().lower()
    phone    = data.get('phone', '').strip()
    password = data.get('password', '')

    # Validation
    if not name or not email or not password:
        return jsonify({'error': 'Name, email, and password are required'}), 400

    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400

    db = get_db()

    # Check if email already exists
    if db.customers.find_one({'mailid': email}):
        return jsonify({'error': 'Email already registered. Please login.'}), 409

    # Hash password
    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')

    # Build MongoDB document
    customer = {
        'name':       name,
        'mailid':     email,
        'role':       'customer',
        'password':   hashed_pw,
        'phone':      phone,
        'address':    '',
        'orders':     [],
        'created_at': datetime.datetime.utcnow(),
        'updated_at': datetime.datetime.utcnow(),
        'is_active':  True,
    }

    result = db.customers.insert_one(customer)

    return jsonify({
        'message': 'Account created successfully!',
        'customer': {
            'id':    str(result.inserted_id),
            'name':  name,
            'mailid': email,
            'role':  'customer',
            'phone': phone,
        }
    }), 201


# ─────────────────────────────────────────────
#  POST /api/auth/login/customer
#  Customer login
# ─────────────────────────────────────────────
@auth_bp.route('/login/customer', methods=['POST'])
def login_customer():
    data     = request.get_json()
    email    = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    db = get_db()

    # Find by mailid
    user = db.customers.find_one({'mailid': email})
    if not user:
        return jsonify({'error': 'No account found. Please create an account.'}), 404

    # Verify password
    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'error': 'Incorrect password. Please try again.'}), 401

    # Generate JWT
    token = jwt.encode({
        'user_id': str(user['_id']),
        'role':    'customer',
        'exp':     datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, os.getenv('JWT_SECRET_KEY', 'secret'), algorithm='HS256')

    return jsonify({
        'message': 'Login successful',
        'token':   token,
        'user': {
            'id':    str(user['_id']),
            'name':  user.get('name'),
            'mailid': user.get('mailid'),
            'role':  user.get('role', 'customer'),
            'phone': user.get('phone', ''),
        }
    }), 200


# ─────────────────────────────────────────────
#  POST /api/auth/login/admin
# ─────────────────────────────────────────────
@auth_bp.route('/login/admin', methods=['POST'])
def login_admin():
    data     = request.get_json()
    email    = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    db   = get_db()
    user = db.admins.find_one({'email': email})

    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = jwt.encode({
        'user_id': str(user['_id']),
        'role':    'admin',
        'exp':     datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, os.getenv('JWT_SECRET_KEY', 'secret'), algorithm='HS256')

    return jsonify({'message': 'Login successful', 'token': token}), 200


# ─────────────────────────────────────────────
#  POST /api/auth/logout
# ─────────────────────────────────────────────
@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logged out successfully'}), 200
