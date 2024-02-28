from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Character(db.Model):
    __tabelname__ = "characters"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    sprite = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def to_dict(self, timestamps=False):
        dictionary = {
            "id": self.id,
            "name": self.name,
            "sprite": self.sprite,
            "ownerID": self.owner_id
        }

        if timestamps:
            dictionary["createdAt"] = self.created_at
            dictionary["updatedAt"] = self.updated_at

        return dictionary
