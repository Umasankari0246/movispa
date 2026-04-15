from pymongo import MongoClient
from .config import settings


_client = MongoClient(settings.mongo_uri)
_db = _client[settings.mongo_db]


def get_db():
    return _db
