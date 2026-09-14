import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.getenv("PORT", 5000))
    SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_secret_key_change_in_prod")
    
    # PostgreSQL Connection URL (formatted for psycopg 3)
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", 
        "postgresql+psycopg://postgres:postgres@localhost:5432/cafe90s"
    )
    # Fix potential Heroku/Render legacy postgres:// URLs
    if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql+psycopg://", 1)
    elif SQLALCHEMY_DATABASE_URI.startswith("postgresql://") and not SQLALCHEMY_DATABASE_URI.startswith("postgresql+psycopg://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgresql://", "postgresql+psycopg://", 1)

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_size": 3,
        "max_overflow": 2,
        "pool_pre_ping": True,
        "pool_recycle": 300,
    }
    
    CORS_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "https://cafe90.vercel.app,http://localhost:5173,http://localhost:3000").split(",")]
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    DELIVERY_RADIUS_KM = float(os.getenv("DELIVERY_RADIUS_KM", 8.0))

