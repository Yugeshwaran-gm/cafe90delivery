from flask_pymongo import PyMongo
from flask import Flask
import os
from dotenv import load_dotenv

load_dotenv()

# PyMongo instance (initialized in app.py via init_app)
mongo = PyMongo()

def get_db():
    """Returns the MongoDB database instance."""
    return mongo.db