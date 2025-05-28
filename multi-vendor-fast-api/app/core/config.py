from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "multi_vendor"

    class Config:
        env_file = ".env"

settings = Settings()

SECRET_KEY = "abcdefghijklmnopqrstuvwxzy"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days
