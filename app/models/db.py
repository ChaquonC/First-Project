from flask_sqlalchemy import SQLAlchemy
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()

#function to reference other tables
def add_prefix_for_prod(attribute):
    if environment == "production":
        return f"{SCHEMA}.{attribute}"
    else:
        return attribute
