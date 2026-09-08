# Smart Food Delivery System - Backend

This is the Flask REST API backend for the Smart Food Delivery System.

## Tech Stack
- Python Flask
- MongoDB (PyMongo)
- JWT Authentication (PyJWT)
- bcrypt for password hashing

## Project Structure
```
backend/
├── app.py                  # Main entry point
├── config/                 # Configurations
├── models/                 # Database schemas reference
├── routes/                 # API Routes mapped to blueprints
├── controllers/            # Business logic and request handlers
├── middleware/             # Custom middlewares (e.g., JWT Auth)
├── database/               # Database connection and seeding
├── utils/                  # Helper functions
├── static/                 # Static files
├── templates/              # HTML templates (if any)
├── .env                    # Environment variables
├── requirements.txt        # Python dependencies
└── README.md               # Setup instructions
```

## Setup Instructions Step-by-Step

### 1. Prerequisites
- Python 3.8+
- MongoDB running locally or a MongoDB Atlas URI
- Postman (for testing APIs)

### 2. Clone/Setup Directory
Navigate to the backend directory.
```bash
cd backend
```

### 3. Create Virtual Environment
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On Mac/Linux
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Setup Environment Variables
Copy the example env file:
```bash
cp .env.example .env
```
Edit `.env` to match your local setup:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart_food_delivery
JWT_SECRET_KEY=your_super_secret_jwt_key
```

### 6. Seed Database (Create Admin)
Run the seed script to create the first admin account:
```bash
python database/seed.py
```
This will create an admin with:
- Email: `admin@smartfood.com`
- Password: `adminpassword123`

### 7. Run the Server
```bash
python app.py
```
The server should start on `http://localhost:5000`

## Roles
- `customer`: General users who can order food.
- `admin`: Can manage food, view orders, and manage delivery staff.
- `delivery_partner`: Staff created by admin who can view and update assigned orders.

## API Documentation / Postman
A Postman collection structure is available in `postman_collection.json`. You can import this into Postman to test all available endpoints.
