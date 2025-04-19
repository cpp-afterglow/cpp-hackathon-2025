from app import create_app

app = create_app()

@app.route("/")
def hello():
    return {"message": "Hello Flask is Running and Connected !!"}
