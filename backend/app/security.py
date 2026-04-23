from datetime import datetime, timedelta
from jose import jwt
import bcrypt
from .config import settings


def hash_secret(value: str) -> str:
    return bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_secret(value: str, hashed_value: str) -> bool:
    try:
        return bcrypt.checkpw(value.encode('utf-8'), hashed_value.encode('utf-8'))
    except Exception:
        return False


def create_access_token(subject: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.jwt_exp_minutes)
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(
        payload,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm,
    )
