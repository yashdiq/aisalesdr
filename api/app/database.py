import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Use environment variable for database URL, fallback to SQLite for local development
# For Vercel serverless, use in-memory SQLite if no DATABASE_URL is provided
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if SQLALCHEMY_DATABASE_URL:
    # Use provided database URL (PostgreSQL or SQLite)
    if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
        engine = create_engine(
            SQLALCHEMY_DATABASE_URL,
            connect_args={"check_same_thread": False}
        )
    else:
        # PostgreSQL configuration
        engine = create_engine(SQLALCHEMY_DATABASE_URL)
else:
    # Use in-memory SQLite for serverless environments (Vercel)
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        # Create tables on each session for in-memory database
        # This is a workaround for serverless environments
        Base.metadata.create_all(bind=engine)
        yield db
    finally:
        db.close()
