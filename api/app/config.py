import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "AI Sales Doctor API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

    @property
    def CORS_ORIGINS(self) -> list[str]:
        # Parse CORS origins from environment variable or use defaults
        cors_origins_env = os.getenv("CORS_ORIGINS")
        if cors_origins_env:
            return [origin.strip() for origin in cors_origins_env.split(",")]
        return ["http://localhost:5173", "http://localhost:3000"]

    class Config:
        env_file = ".env"


settings = Settings()
