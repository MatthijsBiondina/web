#!/bin/bash
# scripts/test_ngrok.sh

# Check if ngrok is running
if ! curl -s http://localhost:4040 > /dev/null; then
  echo "Error: ngrok is not running. Please start it first with 'docker compose up -d ngrok'"
  exit 1
fi

# Get the ngrok URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

if [[ -z "$NGROK_URL" || "$NGROK_URL" == "null" ]]; then
  echo "Error: No active tunnels found in ngrok"
  exit 1
fi

echo "ngrok tunnel established at: ${NGROK_URL}"
echo "Webhook URL for Mollie would be: ${NGROK_URL}/api/webhooks/mollie"

# Check if .env.ngrok exists
if [ -f env/.env.ngrok ]; then
  echo "env/.env.ngrok file exists with content:"
  cat env/.env.ngrok
else
  echo "env/.env.ngrok file does not exist"
  echo "Creating it now..."
  echo "NGROK_URL=${NGROK_URL}" > env/.env.ngrok
  echo "Created env/.env.ngrok with NGROK_URL=${NGROK_URL}"
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "Warning: jq is not installed. Install it with 'sudo apt install jq'"
fi

echo "Everything looks good! You can use this ngrok URL in your Mollie webhooks."
