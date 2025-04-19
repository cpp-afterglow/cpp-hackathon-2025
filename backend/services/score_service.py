# backend/services/score_service.py
from openai import OpenAI
import re
from datetime import date
from models import db, Score

# Temp color weight for scoreing
color_weights = {
    'red': 10,
    'blue': 15,
    'green': -10,
    'yellow': 0,
    'orange': -15,
    'black': 20,
    'pink': -5,
    'brown': 15,
}

client = OpenAI()  # read API key

def get_sentiment_score(text):
    prompt = f"Please evaluate the emotional or mental state expressed in the following text on a scale from -1 to 1:\n{text}"

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    message = response.choices[0].message.content
    match = re.search(r'-?\d+\.\d+', message)
    return float(match.group()) if match else 0.0

def calculate_and_store_score(student_id, mood_submission, form_submission=None):
    base_score = mood_submission.slider_value + color_weights.get(mood_submission.color.lower(), 0)

    if form_submission:
        sentiment = get_sentiment_score(form_submission.text)
        text_score = int((sentiment + 1) * 50)  # -1〜1 → 0〜100
        final_score = int(text_score * 0.7 + base_score * 0.3)
    else:
        final_score = base_score

    final_score = max(0, min(100, final_score))

    # Save score or update
    today = mood_submission.date
    existing = Score.query.filter_by(student_id=student_id, date=today).first()

    if existing:
        existing.daily_score = final_score
    else:
        new_score = Score(
            student_id=student_id,
            date=today,
            daily_score=final_score
        )
        db.session.add(new_score)

    db.session.commit()
    return final_score
