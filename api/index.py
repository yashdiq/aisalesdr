from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import your existing routes and configuration
from app.api.routes import router
from app.config import settings
from app.database import Base, engine

# Try to create database tables (will fail silently in serverless environments)
try:
    Base.metadata.create_all(bind=engine)
except Exception:
    pass

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "Welcome to AI Sales Doctor API",
        "version": settings.APP_VERSION,
    }

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}
