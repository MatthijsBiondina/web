from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.routes import user_routes, health
from app.middleware.logging import RequestLoggingMiddleware
from app.config import settings

app = FastAPI(
    title="Public API Gateway",
    description="Gateway for public-facing applications",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add logging middleware
app.add_middleware(RequestLoggingMiddleware)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(user_routes.router, prefix="/users", tags=["Users"])

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=settings.DEBUG)
