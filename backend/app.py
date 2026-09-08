import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from database.db import mongo
from routes.auth_routes import auth_bp

load_dotenv()

app = Flask(__name__)

# ── Config ──────────────────────────────────
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'secret')

# ── Extensions ──────────────────────────────
CORS(app)
mongo.init_app(app)

from routes.auth_routes import bcrypt as auth_bcrypt
auth_bcrypt.init_app(app)

# ── Blueprints ───────────────────────────────
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# ── Health Check ─────────────────────────────
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'message': "Cafe 90s API is running",
        'status':  'success'
    })

# ── Error Handlers ───────────────────────────
@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    print(f"\nCafe 90s backend running on http://localhost:{port}\n")
    app.run(host='0.0.0.0', port=port, debug=True)