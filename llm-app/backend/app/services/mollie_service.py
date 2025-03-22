from mollie.api.client import Client
import os
import logging

logger = logging.getLogger(__name__)
mollie_client = None


class MollieService:
    @staticmethod
    def init_mollie():
        global mollie_client

        mollie_api_key = os.getenv("MOLLIE_API_KEY")
        if not mollie_api_key:
            raise ValueError("MOLLIE_API_KEY is not set")

        mollie_client = Client()
        mollie_client.set_api_key(mollie_api_key)

        logger.info("Connected to Mollie")

        return mollie_client
