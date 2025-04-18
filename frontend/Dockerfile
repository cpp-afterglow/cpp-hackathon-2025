# Stage 1: Build the React app with Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Inject backend API base directly for Railway
ENV VITE_API_BASE=https://cpp-hackathon-2025-production.up.railway.app

# 👇 Do NOT set NODE_ENV=production here — we need devDeps like vite
COPY . .
RUN npm install && npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
