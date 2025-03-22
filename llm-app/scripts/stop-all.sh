#!/bin/bash

echo "Stopping all running containers..."
docker stop web-app-frontend web-app-backend 2>/dev/null || true

echo "Cleaning up exited containers..."
docker container prune -f

echo "All containers stopped and cleaned up."
