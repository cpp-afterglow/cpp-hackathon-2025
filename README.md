# CPP Hackathon 2025 – Full Stack Project

This project is a Dockerized full-stack app using a **React frontend** and a **Flask backend**, designed for clean team collaboration and fast development.

---

## 🔧 Requirements (for Docker users)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- No need to install Python, Node, or use virtual environments locally!

---

## 🗂️ Project Structure

```
cpp-hackathon-2025/
│
├── backend/         # Flask API
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/        # React (Vite) App
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── .env.example     # Root .env for Docker Compose (optional)
```

---

## 🚀 Running the Project

From the root directory:

```bash
docker compose up --build
```

- Flask backend: [http://localhost:5003](http://localhost:5003)
- React frontend: [http://localhost:3000](http://localhost:3000)

✅ Backend auto-reloads on code changes  
⚠️ Frontend is served via Nginx (built version, not dev mode)

---

## ⚙️ Environment Variables

1. Copy the example file:

   ```bash
   cp backend/.env.example backend/.env
   ```

2. (Optional) If using root-level `.env` with Docker Compose:

   ```bash
   cp .env.example .env
   ```

---

## 🧪 Example: Test the Backend

```bash
curl http://localhost:5003/
```

Expected output:

```json
{ "message": "Hello from Flask backend!" }
```

---

## 🧱 Adding Python Packages

```bash
docker exec -it cpp-backend pip install <package>
docker exec cpp-backend pip freeze > backend/requirements.txt
```

Then:

```bash
git add backend/requirements.txt
git commit -m "Added <package>"
git push
```

---

## 🔁 Rebuilding the App

If you or a teammate updates dependencies:

```bash
docker compose down
docker compose up --build
```

---

## 🤝 Team Workflow: Pull Requests

> All code should be merged into `main` through pull requests!

1. Checkout a feature branch (e.g., `backend`, `frontend`)
2. Commit and push your changes
3. Open a **Pull Request (PR)** from your branch into `main`
4. Another teammate should review and approve before merging
5. After merge, pull the latest `main` into your branch

Pull Request template is located at:

```plaintext
.github/PULL_REQUEST_TEMPLATE.md
```

---

## 🔥 Frontend Dev Mode with Hot Reload

To run just the frontend with **Vite hot reload**:

```bash
cd frontend
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

> ⚠️ If the frontend makes API calls to the backend, make sure it targets:
> `http://localhost:5003` or set `VITE_API_URL=http://localhost:5003` in `frontend/.env`

---

## 💡 Dev Tips

- Use `docker compose down` to stop containers
- Use `docker ps` or `docker compose ps` to see what’s running
- Use `docker exec -it cpp-backend bash` to enter the backend container
- You can skip building frontend Docker during dev and just use `npm run dev`

---