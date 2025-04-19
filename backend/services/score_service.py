# backend/services/score_service.py
from openai import OpenAI
import re
from datetime import date
from models import db, Score

# Score weights based on selected mood color
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

# Score weights based on selected image
image_weights = {
    'happy.png': -10,
    'sad.png': 10,
    'angry.png': 15,
    'relaxed.png': -5,
    'nervous.png': 10,
    'excited.png': -3,
}

# OpenAI client for sentiment analysis
client = OpenAI()  # read API key


# Analyze text sentiment using GPT-4 and return score from -1 to 1
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

# Calculate and store the final mental health score in the database
def calculate_and_store_score(student_id, mood_submission, image_name, form_submission=None, ):
    # Base score = slider value + color weight + image weight
    base_score = mood_submission.slider_value + color_weights.get(mood_submission.color.lower(), 0) + image_weights.get(image_name.lower(), 0)

    # If a journal text is submitted, include sentiment analysis in score
    if form_submission:
        sentiment = get_sentiment_score(form_submission.text)
        text_score = int((sentiment + 1) * 50)  # -1〜1 → 0〜100
        final_score = int(text_score * 0.7 + base_score * 0.3)
    else:
        final_score = base_score

    # Clamp score between 0 and 100
    final_score = max(0, min(100, final_score))

    # Save or update the score (1 entry per student per day)
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

