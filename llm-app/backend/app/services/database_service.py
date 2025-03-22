# backend/app/database.py
from mongoengine import connect
import os
import logging
import time
from mongoengine.connection import get_db

logger = logging.getLogger(__name__)


class DatabaseService:
    @staticmethod
    def wait_for_connection(max_retries: int = 1, retry_delay: float = 1.0) -> bool:
        """
        Wait for MongoDB connection to be established
        """
        for attempt in range(max_retries):
            try:
                # Try to get the database connection
                db = get_db()
                # Test the connection
                db.command("ping")
                return True
            except Exception as e:
                if attempt < max_retries - 1:
                    logger.warning(
                        f"MongoDB connection attempt {attempt + 1} failed: {str(e)}"
                    )
                    time.sleep(retry_delay)
                else:
                    logger.error(
                        f"Failed to connect to MongoDB after {max_retries} attempts"
                    )
                    return False
        return False

    @staticmethod
    def init_mongodb():
        """
        Initialize the MongoDB connection
        """
        mongo_uri = os.getenv("MONGODB_URI")
        if not mongo_uri:
            raise ValueError("MONGODB_URI is not set")

        logger.info(f"Connecting to MongoDB at {mongo_uri}")
        connect(host=mongo_uri)

        # Wait for connection to be established
        if not DatabaseService.wait_for_connection():
            raise Exception("Could not establish MongoDB connection")

        logger.info("Connected to MongoDB")
