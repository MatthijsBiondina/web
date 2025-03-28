#!/bin/bash
# scripts/start_with_ngrok.sh

# Start the ngrok service
docker compose up -d ngrok

# Wait a moment for ngrok to start
echo "Waiting for ngrok to initialize..."
sleep 5

# Use curl instead of wget to check API
echo "Checking ngrok tunnels..."
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

# Check if we got a valid URL
if [[ -z "$NGROK_URL" || "$NGROK_URL" == "null" ]]; then
  echo "Failed to get ngrok URL. Retrying in 5 seconds..."
  sleep 5
  NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')
fi

if [[ -z "$NGROK_URL" || "$NGROK_URL" == "null" ]]; then
  echo "Error: Could not obtain ngrok URL. Check if ngrok is running properly."
  echo "You can check the ngrok admin interface at http://localhost:4040"
  exit 1
fi

echo "ngrok tunnel established at: ${NGROK_URL}"

# Export the URL to be used by the backend
export NGROK_URL="${NGROK_URL}"
echo "NGROK_URL=${NGROK_URL}" > env/.env.ngrok

# Start the backend with the ngrok URL available
echo "Starting backend with NGROK_URL=${NGROK_URL}"
docker compose up backend --build
