# app/middleware/case_converter.py
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import humps
import json
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)


class CaseConverterMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Process the request before it reaches your endpoint
        if request.method in ["POST", "PUT", "PATCH"]:
            try:
                # Get the original request content
                body_bytes = await request.body()

                # If the body is empty, just proceed
                if not body_bytes:
                    return await call_next(request)

                # Parse the original JSON
                request_body = json.loads(body_bytes)
                logger.info(f"Request body: {request_body}")

                # Convert from camelCase to snake_case
                snake_case_body = humps.decamelize(request_body)
                logger.info(f"Snake case body: {snake_case_body}")

                # Create a modified request with snake_case data
                body_bytes = json.dumps(snake_case_body).encode()

                # Store the modified body so it can be read again
                async def receive():
                    return {"type": "http.request", "body": body_bytes}

                # Replace the receive method to return our modified body
                request._receive = receive

                # Also store the modified body directly
                request._body = body_bytes
            except Exception as e:
                logger.error(f"Error processing request in case converter: {e}")
                # Continue with original request if there's an error

        # Get response from endpoint
        response = await call_next(request)

        # Only process JSON responses
        content_type = response.headers.get("content-type", "")
        if "application/json" not in content_type:
            return response

        try:
            # Create a new response with transformed body
            response_body = b""
            async for chunk in response.body_iterator:
                response_body += chunk

            # Decode and convert from snake_case to camelCase
            body_dict = json.loads(response_body)
            logger.info(f"Response before camelCase conversion: {body_dict}")
            camel_case_body = humps.camelize(body_dict)
            logger.info(f"Response after camelCase conversion: {camel_case_body}")

            # Create new JSON-formatted body
            new_body = json.dumps(camel_case_body).encode()

            # Create a new response with the same status and headers, but updated body
            new_response = Response(
                content=new_body,
                status_code=response.status_code,
                headers=dict(response.headers),
                media_type="application/json",
            )

            return new_response

        except Exception as e:
            logger.error(f"Error converting response case: {e}")
            # If there's an error, return the original response
            return response
