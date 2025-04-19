from flask import Blueprint, request, jsonify
from models import db, Student, Score, MoodSubmission, FormSubmission
from sqlalchemy import func, desc
from datetime import date

advisor_bp = Blueprint("advisor", __name__)

@advisor_bp.route("/advisor/<int:advisor_id>/students", methods=["GET"])
def get_high_priority_students(advisor_id):
    page = int(request.args.get("page", 1))
    per_page = 5

    # Subquery to get each student's most recent score
    recent_score_subquery = (
        db.session.query(
            Score.student_id,
            func.max(Score.date).label("latest_date")
        )
        .group_by(Score.student_id)
        .subquery()
    )

    # Join students to their most recent scores
    results = (
        db.session.query(Student, Score)
        .join(Score, Student.id == Score.student_id)
        .join(recent_score_subquery,
              (Score.student_id == recent_score_subquery.c.student_id) &
              (Score.date == recent_score_subquery.c.latest_date))
        .filter(Student.advisor_id == advisor_id)
        .order_by(Score.daily_score.desc())   #highest first HIGH PRIORITY
        .limit(per_page)
        .offset((page - 1) * per_page)
        .all()
    )

    # Format data
    students_data = []
    for student, score in results:
        students_data.append({
            "id": student.id,
            "name": student.name,
            "score": score.daily_score,
            "date": score.date.isoformat()
        })

    return jsonify(students_data), 200


@advisor_bp.route("/advisor/<int:advisor_id>/search-students", methods=["GET"])
def search_students(advisor_id):
    query = request.args.get("q", "")
    matches = Student.query.filter(
        Student.advisor_id == advisor_id,
        Student.name.ilike(f"%{query}%")
    ).all()

    return jsonify([{"id": s.id, "name": s.name} for s in matches])

@advisor_bp.route("/student/<int:student_id>/submissions", methods=["GET"])
def get_student_submissions(student_id):
    moods = MoodSubmission.query.filter_by(student_id=student_id).order_by(MoodSubmission.date.desc()).all()
    forms = FormSubmission.query.filter_by(student_id=student_id).order_by(FormSubmission.date.desc()).all()
    scores = Score.query.filter_by(student_id=student_id).order_by(Score.date.desc()).all()

    student = Student.query.get_or_404(student_id)

    return jsonify({
        "name": student.name,
        "moods": [
            {
                "date": m.date.isoformat(),
                "slider_value": m.slider_value,
                "color": m.color,
                "image": m.image
            } for m in moods
        ],
        "forms": [
            {
                "date": f.date.isoformat(),
                "text": f.text,
                "category": f.category
            } for f in forms
        ],
        "scores": [
            {
                "date": s.date.isoformat(),
                "daily_score": s.daily_score
            } for s in scores
        ]
    }), 200


@advisor_bp.route("/advisor/date/<date_str>", methods=["GET"])
def get_data_by_date(date_str):
    selected_date = date.fromisoformat(date_str)

    moods = MoodSubmission.query.filter_by(date=selected_date).all()
    forms = FormSubmission.query.filter_by(date=selected_date).all()
    scores = Score.query.filter_by(date=selected_date).all()

    return jsonify({
        "moods": [{
            "student_id": m.student_id,
            "slider_value": m.slider_value,
            "image": m.image,
            "color": m.color,
            "date": m.date.isoformat()
        } for m in moods],
        "forms": [{
            "student_id": f.student_id,
            "category": f.category,
            "text": f.text,
            "date": f.date.isoformat()
        } for f in forms],
        "scores": [{
            "student_id": s.student_id,
            "daily_score": s.daily_score,
            "date": s.date.isoformat()
        } for s in scores]
    }), 200


@advisor_bp.route("/advisor/<int:advisor_id>/search-by-score", methods=["GET"])
def search_by_score(advisor_id):
    score_value = request.args.get("score")
    if score_value is None:
        return jsonify({"error": "Missing score"}), 400

    results = (
        db.session.query(Score, Student)
        .join(Student, Score.student_id == Student.id)
        .filter(Score.daily_score == int(score_value), Student.advisor_id == advisor_id)
        .order_by(Score.date.desc())
        .all()
    )

    return jsonify([
        {
            "id": student.id,
            "name": student.name,
            "score": score.daily_score,
            "date": score.date.isoformat()
        }
        for score, student in results
    ])

@advisor_bp.route("/advisor/<int:advisor_id>/graph-data", methods=["POST"])
def generate_graph_data(advisor_id):
    data = request.get_json()
    selected_options = data.get("selections", [])

    if not selected_options:
        return jsonify({"error": "No selections provided"}), 400

    response_data = []

    for index, selection in enumerate(selected_options):
        student_id = selection.get("studentId")
        date_range = selection.get("dateRange")
        data_type = selection.get("dataType")
        graph_label = f"Student {student_id}" if student_id != "all" else "All Students"

        # Base query
        query = db.session.query(Score)

        if student_id != "all":
            query = query.filter(Score.student_id == student_id)
        else:
            # Only include scores for students under the current advisor
            query = query.join(Student).filter(Student.advisor_id == advisor_id)

        # Date filtering
        if date_range == "past_month":
            from datetime import datetime, timedelta
            query = query.filter(Score.date >= datetime.utcnow() - timedelta(days=30))
        elif date_range == "past_week":
            from datetime import datetime, timedelta
            query = query.filter(Score.date >= datetime.utcnow() - timedelta(days=7))

        # Execute query
        scores = query.order_by(Score.date.asc()).all()

        # Prepare series data
        line_data = {
            "id": graph_label + f" - {data_type}",
            "data": []
        }

        for score in scores:
            if data_type == "score":
                line_data["data"].append({"x": score.date.isoformat(), "y": score.daily_score})

        if line_data["data"]:
            response_data.append(line_data)

    return jsonify(response_data), 200




