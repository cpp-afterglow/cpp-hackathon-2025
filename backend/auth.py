# auth.py
from flask import Blueprint, request, jsonify
from models import Student, Advisor, MoodSubmission
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