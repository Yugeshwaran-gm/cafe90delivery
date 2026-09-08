import datetime
import jwt
import os
from flask import Blueprint, request, jsonify
from database.db import mongo
from flask_bcrypt import Bcrypt

auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()

JWT_SECRET = os.getenv("JWT_SECRET_KEY", "secret")

# Customer Registration
@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON data"}), 400

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not all([name, email, password]):
            return jsonify({"error": "Name, email and password are required"}), 400

        # Check if email already exists
        if mongo.db.customers.find_one({"email": email}):
            return jsonify({"error": "Email already exists"}), 409

        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # Save to MongoDB
        customer = {
            "name": name,
            "email": email,
            "password": hashed_password,
            "role": "customer",
            "created_at": datetime.datetime.utcnow()
        }

        mongo.db.customers.insert_one(customer)

        return jsonify({"message": "Customer registered successfully"}), 201
    except Exception as e:
        print(f"Error in register: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

# Admin Login
@auth_bp.route("/login/admin", methods=["POST"])
def login_admin():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON data"}), 400

        email = data.get("email", "").strip().lower()
        password = data.get("password", "")

        if not all([email, password]):
            return jsonify({"error": "Email and password are required"}), 400

        user = mongo.db.admins.find_one({"email": email})

        if not user:
            return jsonify({"error": "Admin not found"}), 404

        if not bcrypt.check_password_hash(user["password"], password):
            return jsonify({"error": "Invalid password"}), 401

        token = jwt.encode({
            "email": user["email"],
            "role": "admin",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, JWT_SECRET, algorithm="HS256")

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "name": user.get("name", "Admin"),
                "email": user["email"],
                "role": "admin"
            }
        }), 200
    except Exception as e:
        print(f"Error in admin login: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

# Customer Login
@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON data"}), 400

        email = data.get("email")
        password = data.get("password")

        if not all([email, password]):
            return jsonify({"error": "Email and password are required"}), 400

        user = mongo.db.customers.find_one({"email": email})

        if not user:
            return jsonify({"error": "User not found"}), 404

        if not bcrypt.check_password_hash(user["password"], password):
            return jsonify({"error": "Invalid password"}), 401

        # Generate JWT Token
        token = jwt.encode({
            "email": user["email"],
            "role": user["role"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, JWT_SECRET, algorithm="HS256")

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "name": user["name"],
                "email": user["email"],
                "role": user["role"]
            }
        }), 200
    except Exception as e:
        print(f"Error in login: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500