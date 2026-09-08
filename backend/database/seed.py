import bcrypt
import datetime
import os
import sys

# Add parent directory to path to import db
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/cafe90s')
client = MongoClient(mongo_uri)
db = client.get_default_database()


def seed_admin():
    admin_email = "admin@cafe90.com"
    admin_password = "admincafe90"
    
    existing_admin = db.admins.find_one({'email': admin_email})
    if existing_admin:
        print("Admin user already exists.")
        return
        
    hashed_password = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt())
    
    admin = {
        'name': 'Super Admin',
        'email': admin_email,
        'password': hashed_password.decode('utf-8'),
        'created_at': datetime.datetime.utcnow()
    }
    
    db.admins.insert_one(admin)
    print(f"Admin user seeded successfully!")
    print(f"Email: {admin_email}")
    print(f"Password: {admin_password}")

if __name__ == "__main__":
    print("Seeding database...")
    seed_admin()
