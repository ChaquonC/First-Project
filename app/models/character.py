from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

class Character(db.Model):
    __tabelname__ = "characters"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    sprite = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey())
