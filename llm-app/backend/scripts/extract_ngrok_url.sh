#!/bin/bash
# scripts/extract_ngrok_url.sh

# Wait for ngrok to be up
echo "Waiting for ngrok to start..."
while ! wget --spider --quiet http://ngrok:4040/api/tunnels; do
  sleep 1
done

# Extract the public URL
NGROK_URL=$(curl -s http://ngrok:4040/api/tunnels | jq -r '.tunnels[0].public_url')
echo "NGROK_URL=${NGROK_URL}" > /app/env/.env.ngrok
echo "ngrok tunnel established at: ${NGROK_URL}"

# Keep the script running to allow Docker healthcheck to work
tail -f /dev/null