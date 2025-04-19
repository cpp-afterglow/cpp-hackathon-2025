from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # <- This allows all origins by default

@app.route("/")
def hello():
    return jsonify(message="Hello Flask is Running and Connected !!")
