"""
MongoDB is a NoSQL database and PyMongo is schemaless by default.
However, for structural reference and documentation, here are the expected document schemas for each collection.
"""

collections = {
    "customers": {
        "name": "String",
        "email": "String (Unique)",
        "password": "String (Hashed)",
        "phone": "String",
        "created_at": "Datetime"
    },
    
    "admins": {
        "name": "String",
        "email": "String (Unique)",
        "password": "String (Hashed)",
        "created_at": "Datetime"
    },
    
    "staff": {
        "name": "String",
        "email": "String (Unique)",
        "phone": "String",
        "staff_id": "String (Unique)",
        "password": "String (Hashed)",
        "created_at": "Datetime"
    },
    
    "food_items": {
        "name": "String",
        "price": "Float",
        "category": "String",
        "description": "String",
        "image_url": "String",
        "is_available": "Boolean",
        "created_at": "Datetime"
    },
    
    "carts": {
        "user_id": "ObjectId (ref: customers)",
        "item_id": "ObjectId (ref: food_items)",
        "quantity": "Integer",
        "created_at": "Datetime"
    },
    
    "orders": {
        "customer_id": "ObjectId (ref: customers)",
        "customer_name": "String",
        "customer_phone": "String",
        "items": [
            {
                "item_id": "ObjectId",
                "name": "String",
                "quantity": "Integer",
                "price": "Float"
            }
        ],
        "total_amount": "Float",
        "delivery_address": "String",
        "payment_method": "String (COD/Card)",
        "payment_status": "String (Pending/Completed)",
        "status": "String (Pending/Assigned/Picked Up/Out for Delivery/Delivered/Cancelled)",
        "delivery_partner_id": "ObjectId (ref: staff) or Null",
        "timeline": [
            {
                "status": "String",
                "timestamp": "Datetime"
            }
        ],
        "created_at": "Datetime"
    }
}
