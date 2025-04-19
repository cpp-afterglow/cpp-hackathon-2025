from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Advisor(db.Model):
    __tablename__ = 'advisors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    # Establishes 1:N relationship with students
    students = db.relationship("Student", backref="advisor", lazy=True)


class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    advisor_id = db.Column(db.Integer, db.ForeignKey('advisors.id'), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
