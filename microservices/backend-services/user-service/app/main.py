from contextlib import asynccontextmanager
import logging
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.db.mongodb import connect_to_db, disconnect_from_db
from app.routes import users, health
from app.config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: \033[1m%(message)s\033[0m",
)
logger = logging.getLogger("user-service")


@asynccontextmanager
async def lifespan(app: FastAPI):
    connect_to_db()
    yield
    disconnect_from_db()


app = FastAPI(
    title="User Service API",
    description="User management microservice",
    version="1.0.0",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(users.router, prefix="/users", tags=["Users"])


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=settings.DEBUG)
