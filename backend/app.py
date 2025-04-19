from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

from models import db, Student

load_dotenv()  # Loads DATABASE_URL from .env

app = Flask(__name__)
CORS(app)

# ✅ DB Config
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Create tables on startup
with app.app_context():
    db.create_all()

@app.route("/")
def hello():
    return jsonify(message="Flask is Running and Connected to Railway DB!")

@app.route("/students")
def list_students():
    students = Student.query.all()
    return jsonify([{"id": s.id, "name": s.name} for s in students])
