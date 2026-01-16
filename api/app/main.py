from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.config import settings
from app.database import Base, engine

# Create database tables (with error handling for serverless environments)
try:
    Base.metadata.create_all(bind=engine)
except Exception:
    # SQLite cannot write to Vercel's serverless filesystem
    # This is expected - database operations will work but won't persist
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


@app.get("/")
def read_root():
    return {
        "message": "Welcome to AI Sales Doctor API",
        "version": settings.APP_VERSION,
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
