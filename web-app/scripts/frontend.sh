#!/bin/bash

# Navigate to frontend directory from repo root
cd "$(dirname "$0")/../frontend"

echo "Building frontend Docker image..."
docker build -t web-app-frontend -f docker/Dockerfile.dev .

echo "Starting React frontend with debugger..."
docker run -p 3000:3000 -p 9230:9229 \
  -v "$(pwd)":/app \
  -v web-app-frontend-node-modules:/app/node_modules \
  --env-file env/.env.dev \
  -e CI=true \
  -e ESLINT_NO_DEV_ERRORS=true \
  -e NODE_ENV=development \
  -e CHOKIDAR_USEPOLLING=true \
  -e FAST_REFRESH=true \
  -e WDS_SOCKET_PORT=3000 \
  --name web-app-frontend \
  --rm \
  -it web-app-frontend npm run debug
