#!/bin/bash
# Navigate to backend directory from repo root
cd "$(dirname "$0")/../backend"
echo "Building backend Docker image..."
docker build -t web-app-backend -f docker/Dockerfile.dev .
echo "Starting FastAPI backend with debugger..."
docker run -p 5000:5000 -p 5678:5678 \
  -v "$(pwd)":/app \
  -v /app/__pycache__/ \
  --env-file env/.env.dev \
  -e PYTHONUNBUFFERED=1 \
  -e PYTHONDONTWRITEBYTECODE=1 \
  -e PYDEVD_DISABLE_FILE_VALIDATION=1 \
  --name web-app-backend \
  --rm \
  web-app-backend python -m debugpy --listen 0.0.0.0:5678 --wait-for-client -m uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
