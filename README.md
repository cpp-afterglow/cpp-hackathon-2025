# CPP Hackathon 2025 – Full Stack Project

This project uses a **React frontend** and a **Flask backend**, separated into `frontend/` and `backend/`, and is fully containerized using Docker and Docker Compose.

---

## 🔧  Requirements (If you use docker)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- No need for Python, Node, or virtual environments locally!

---

## 🗂️ Project Structure

```
cpp-hackathon-2025/
│
├── backend/         # Flask API
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/        # React App (optional setup later)
│
└── docker-compose.yml
```

---

## 🚀 Running the Project (Dev Mode with Hot Reload)

From the root of the project:

```bash
docker compose up --build
```

- Flask backend: [http://localhost:5003](http://localhost:5003)
- React frontend: (TBD)

Flask runs with hot reload, so when you change `app.py`, it will auto-restart the server.

---

## 🧪 Example: Test the Backend

Open your browser or use curl:

```bash
curl http://localhost:5003/
```

Expected response:

```json
{ "message": "Hello from Flask backend!" }
```

---

## ➕ Adding Python Packages (Team Workflow)

1. **Install the package inside the running container**:

   ```bash
   docker exec -it cpp-hackathon-2025-backend-1 pip install <package-name>
   ```

   Example:
   ```bash
   docker exec -it cpp-hackathon-2025-backend-1 pip install pandas
   ```

2. **Update `requirements.txt`** so everyone stays in sync:

   ```bash
   docker exec cpp-hackathon-2025-backend-1 pip freeze > backend/requirements.txt
   ```

3. **Commit your changes**:

   ```bash
   git add backend/requirements.txt
   git commit -m "Added pandas to backend"
   git push
   ```

> ✅ Everyone else will get the same environment next time they run `docker compose up --build`.

---

## 🔁 Rebuilding After Changing `requirements.txt`

If you or a teammate updates the dependencies:

```bash
docker compose down
docker compose up --build
```

This ensures the container rebuilds with the latest packages.

---

## 💡 Tips

- Use `docker compose down` to stop the app
- Use `docker compose ps` to check status
- Use `docker exec -it cpp-hackathon-2025-backend-1 bash` to open a shell in the backend container

---

Let me know if you want help setting up the React `frontend/` too!
