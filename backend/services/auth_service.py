import os
import datetime
import jwt
from flask_bcrypt import Bcrypt
from database.connection import db
from database.models.user import User, UserRole
from database.models.cart import Cart

bcrypt = Bcrypt()

class AuthService:
    @staticmethod
    def register_customer(name: str, email: str, password: str, phone: str = None):
        email_clean = email.strip().lower()
        
        # Check if email exists
        existing_user = db.session.query(User).filter_by(email=email_clean).first()
        if existing_user:
            return None, "Email is already registered. Please login."
            
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        
        new_user = User(
            email=email_clean,
            password_hash=hashed_password,
            full_name=name.strip(),
            phone=phone.strip() if phone else None,
            role=UserRole.CUSTOMER
        )
        
        db.session.add(new_user)
        db.session.flush() # Obtain new_user.id
        
        # Initialize empty cart for customer
        user_cart = Cart(user_id=new_user.id)
        db.session.add(user_cart)
        
        db.session.commit()
        return new_user, None

    @staticmethod
    def login_user(email: str, password: str):
        email_clean = email.strip().lower()
        user = db.session.query(User).filter_by(email=email_clean).first()
        
        if not user or not user.is_active:
            return None, "Invalid email or password."
            
        if not bcrypt.check_password_hash(user.password_hash, password):
            return None, "Invalid email or password."
            
        secret = os.getenv("JWT_SECRET_KEY", "fallback_secret_key_change_in_prod")
        
        role_str = user.role.value if isinstance(user.role, UserRole) else str(user.role)
        
        token_payload = {
            "sub": str(user.id),
            "email": user.email,
            "role": role_str,
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=1)
        }
        
        token = jwt.encode(token_payload, secret, algorithm="HS256")
        
        return {
            "token": token,
            "user": user.to_dict()
        }, None
