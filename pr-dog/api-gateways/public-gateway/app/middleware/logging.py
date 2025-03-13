import time
import uuid
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("public-gateway")


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())

        # Add request ID to request state for potential use in endpoint handlers
        request.state.request_id = request_id

        # Log request details
        start_time = time.time()

        logger.info(
            f"Request started | ID: {request_id} | "
            f"Method: {request.method} | "
            f"Path: {request.url.path} | "
            f"Client: {request.client.host}"
        )

        # Process the request
        try:
            response = await call_next(request)

            # Calculate processing time
            process_time = time.time() - start_time

            # Add request ID to response headers
            response.headers["X-Request-ID"] = request_id

            # Log response details
            logger.info(
                f"Request completed | ID: {request_id} | "
                f"Status: {response.status_code} | "
                f"Duration: {process_time:.3f}s"
            )

            return response
        except Exception as e:
            # Log the error
            logger.error(f"Request failed | ID: {request_id} | " f"Error: {str(e)}")
            raise
