from mollie.api.client import Client
import os
import logging
from app.services.service_container import mollie_client as container_mollie_client

logger = logging.getLogger(__name__)


class MollieService:
    @staticmethod
    def init_mollie():
        mollie_api_key = os.getenv("MOLLIE_API_KEY")
        if not mollie_api_key:
            raise ValueError("MOLLIE_API_KEY is not set")

        client = Client()
        client.set_api_key(mollie_api_key)

        # Update the container's reference
        global container_mollie_client
        container_mollie_client = client

        logger.info("Connected to Mollie")
        return client

    @staticmethod
    def get_client():
        global container_mollie_client
        if container_mollie_client is None:
            return MollieService.init_mollie()
        return container_mollie_client
