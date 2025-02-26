#!/bin/bash

# This script performs a thorough cleanup of Docker resources
echo "Starting thorough Docker cleanup..."

# Stop all running containers first
echo "Stopping all running Docker containers..."
docker stop $(docker ps -aq) 2>/dev/null || echo "No running containers to stop."

# Remove containers with force
echo -e "\nRemoving all Docker containers..."
docker rm -f $(docker ps -aq) 2>/dev/null || echo "No containers to remove."

# Remove all containers in any state (created, exited, etc.)
echo -e "\nRemoving containers in all states..."
docker container prune -f

# Remove all build cache
echo -e "\nRemoving Docker build cache..."
docker builder prune -af

# Remove unused images (dangling images)
echo -e "\nRemoving dangling images..."
docker image prune -f

# Remove all images with force
echo -e "\nRemoving all Docker images..."
docker rmi -f $(docker images -aq) 2>/dev/null || echo "No images to remove."

# Remove unused volumes
echo -e "\nPruning unused volumes..."
docker volume prune -f

# Remove all volumes (if any remain)
echo -e "\nRemoving all Docker volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null || echo "No volumes to remove."

# Remove unused networks
echo -e "\nPruning unused networks..."
docker network prune -f

# Remove all custom networks (excluding default ones)
echo -e "\nRemoving all custom networks..."
docker network rm $(docker network ls --filter type=custom -q) 2>/dev/null || echo "No custom networks to remove."

# System prune as a final step (removes all unused containers, networks, images, and optionally volumes)
echo -e "\nPerforming final system prune..."
docker system prune -af

echo -e "\nDocker cleanup complete!"

# Optional: Display current state
echo -e "\nCurrent Docker state:"
echo "Containers:"
docker ps -a
echo -e "\nImages:"
docker images
echo -e "\nVolumes:"
docker volume ls
echo -e "\nNetworks:"
docker network ls
