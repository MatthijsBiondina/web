from fastapi import HTTPException, status
import httpx
import logging

logger = logging.getLogger("public-gateway")


async def handle_service_error(operation_name, service_call):
    try:
        return await service_call
    except httpx.RequestError as e:
        logger.error(f"Error connecting to service during {operation_name}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service unavailable",
        )
    except Exception as e:
        logger.error(f"Unexpected error during {operation_name}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during {operation_name}",
        )
