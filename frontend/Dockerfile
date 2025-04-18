# frontend/Dockerfile

FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

# Inject VITE_API_BASE from the environment
ENV NODE_ENV=production
ENV VITE_API_BASE=https://cpp-hackathon-2025-production.up.railway.app

RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

