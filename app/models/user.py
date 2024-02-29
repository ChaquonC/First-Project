from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class User(db.Model):
    __tabelname__ = "users"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    characters = db.relationship("Character", back_populates="owner", cascade='all, delete')

    def to_dict(self, timestamps=False):
        dictionary = {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "password": self.password
        }

        if timestamps:
            dictionary["createdAt"] = self.created_at
            dictionary["updatedAt"] = self.updated_at

        return dictionary
