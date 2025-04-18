# backend/Dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Add Flask CLI to PATH (optional if using python -m flask)
ENV PATH="/root/.local/bin:$PATH"

COPY . .

EXPOSE 5000

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000"]
