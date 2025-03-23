# app/routes/__init__.py
from fastapi import APIRouter

from app.routes.user_routes import router as user_routes
from app.routes.credit_routes import router as credit_routes
from app.routes.prices_routes import router as prices_routes
from app.routes.settings_routes import router as settings_routes

# Main router that combines all route modules
router = APIRouter()
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add middleware to log all requests - moved to main.py since APIRouter doesn't support middleware
# Keeping logging configuration for route-specific logging
logger.info("Initializing routes")

# Include all route modules
router.include_router(user_routes, prefix="/users", tags=["users"])
router.include_router(credit_routes, prefix="/credit", tags=["credit"])
router.include_router(prices_routes, prefix="/prices", tags=["prices"])
router.include_router(settings_routes, prefix="/settings", tags=["settings"])
