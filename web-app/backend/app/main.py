# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv

from app.middleware.authentication import AuthenticationMiddleware
from app.routes import router


# Load environment variables
load_dotenv(dotenv_path="env/.env.dev")

# Create FastAPI app
app = FastAPI()



# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Must explicitly list all origins when using credentials
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type"],  # Explicitly list required headers
)   

# Configure Authentication
app.add_middleware(
    AuthenticationMiddleware
)
# Initialize Firebase Admin
cred = credentials.Certificate("firebase-service-account.json")
firebase_admin.initialize_app(cred)

# Include the combined router
app.include_router(router, prefix="/api")

@app.get("/")
async def root():
    """Return a simple status message indicating the backend API is running."""
    return {"message": "Backend API running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=5000, reload=True)
