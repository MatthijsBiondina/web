import certifi
from logging import getLogger
from mongoengine import connect, disconnect
from pymongo.errors import ServerSelectionTimeoutError
from app.config import MONGODB_HOST, MONGODB_DB
import urllib.request


logger = getLogger("user-service")


def connect_to_db():
    """Connect to MongoDB Atlas database"""
    try:
        # Check our external IP first for debugging
        try:
            external_ip = (
                urllib.request.urlopen("https://api.ipify.org").read().decode("utf8")
            )
            logger.info(f"External IP address: {external_ip}")
            logger.info(
                "⚠️ Make sure this IP is whitelisted in MongoDB Atlas IP Access List"
            )
        except Exception as ip_error:
            logger.warning(f"Could not determine external IP: {ip_error}")

        # Clean the connection string to remove any trailing characters
        if MONGODB_HOST and MONGODB_HOST.endswith(" -n"):
            clean_host = MONGODB_HOST.replace(" -n", "")
            logger.info("Removed trailing characters from connection string")
        else:
            clean_host = MONGODB_HOST

        # Using simpler connection parameters
        connection = connect(
            host=clean_host, tlsCAFile=certifi.where(), serverSelectionTimeoutMS=30000
        )

        # Try to get database
        db = connection.get_database()
        server_info = db.command("ping")

        if server_info.get("ok") == 1:
            logger.info(f"Successfully connected to MongoDB: {db.name}")
            # Output server info for debugging
            logger.info(
                f"MongoDB server version: {db.command('buildInfo').get('version')}"
            )
            return True
        else:
            logger.error("MongoDB connection test failed")
            return False

    except ServerSelectionTimeoutError as e:
        logger.error(f"MongoDB connection timeout: {e}")
        logger.error(
            "This typically indicates network connectivity issues or firewall restrictions"
        )
        logger.error(
            "Please check that your current IP is whitelisted in MongoDB Atlas"
        )
        raise
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise


def disconnect_from_db():
    """Disconnect from MongoDB database"""
    disconnect()
    logger.info("Disconnected from MongoDB database")
