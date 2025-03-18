# app/database.py
import motor.motor_asyncio
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path="env/.env.dev")

# Connect to MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URI"))
db = client.professor_dog  # Database name from your MongoDB URI
