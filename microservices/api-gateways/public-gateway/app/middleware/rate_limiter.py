from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
import time
from collections import defaultdict
import asyncio

from app.config import settings


class RateLimiter(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.rate_limit = settings.RATE_LIMIT_DEFAULT  # requests per minute
        self.window = 60  # seconds (1 minute)
        self.requests = defaultdict(list)  # IP -> list of request timestamps
        self.lock = asyncio.Lock()

    async def dispatch(self, request: Request, call_next):
        if not settings.RATE_LIMIT_ENABLED:
            return await call_next(request)

        # Get client IP
        client_ip = request.client.host

        # Get current time
        current_time = time.time()

        # Clean up old requests
        async with self.lock:
            self.requests[client_ip] = [
                timestamp
                for timestamp in self.requests[client_ip]
                if current_time - timestamp < self.window
            ]

            # Check if rate limit is exceeded
            if len(self.requests[client_ip]) >= self.rate_limit:

                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Rate limit exceeded",
                )

            # Add current request
            self.requests[client_ip].append(current_time)

        # Process the request
        return await call_next(request)
