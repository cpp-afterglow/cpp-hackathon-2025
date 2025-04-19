# auth.py
from flask import Blueprint, request, jsonify
from models import db, Student, Advisor, MoodSubmission
from datetime import date

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    user_id = data.get("id")
    password = data.get("password")
    role = data.get("role")

    if role == "student":
        user = Student.query.filter_by(id=user_id, password=password).first()
        if user:
            # Check if mood already submitted today
            today = date.today()
            already_submitted = MoodSubmission.query.filter_by(
                student_id=user_id,
                date=today
            ).first()
            if already_submitted:
                return jsonify({
                    "error": "Mood already submitted for today. You can’t log in again today."
                }), 403

    elif role == "advisor":
        user = Advisor.query.filter_by(id=user_id, password=password).first()
    else:
        return jsonify({"error": "Invalid role"}), 400

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "id": user.id,
        "name": user.name,
        "role": role
    }), 200

#Create a student
@auth_bp.route("/auth/create-student", methods=["POST"])
def create_student():
    from random import choice
    data = request.get_json()

    name = data.get("name")
    password = data.get("password")

    if not name or not password:
        return jsonify({"error": "Name and password are required"}), 400

    #Get all advisors from the DB
    advisors = Advisor.query.all()
    #Pick one at random
    advisor = choice(advisors)

    new_student = Student(name=name, password=password, advisor_id=advisor.id)
    db.session.add(new_student)
    db.session.commit()

    return jsonify({
        "message": "Student created",
        "id": new_student.id,
        "assigned_advisor_id": advisor.id,
        "assigned_advisor_name": advisor.name
    }), 201

# Create Advisor Account
@auth_bp.route("/auth/create-advisor", methods=["POST"])
def create_advisor():
    data = request.get_json()
    name = data.get("name")
    password = data.get("password")

    if not name or not password:
        return jsonify({"error": "Name and password are required"}), 400

    new_advisor = Advisor(name=name, password=password)
    db.session.add(new_advisor)
    db.session.commit()

    return jsonify({"message": "Advisor created", "id": new_advisor.id}), 201