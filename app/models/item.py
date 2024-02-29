from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from enum import Enum

item_type = Enum(
    "Type",
    ["heal", "armor_up", "attack_up"]
)

class Item(db.Model):
    __tabelname__ = "items"

    id =  db.Column(db.Integer, primary_key=True, nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False)
    item_type = db.Column(db.Enum(item_type), nullable=False)
    item_effect = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    character = db.relationship("Character", back_populates="stats")

    def to_dict(self, timestamps=False):
        dictionary = {
            "id": self.id,
            "characterID": self.character_id,
            "itemType": self.item_type,
            "itemEffect": self.item_effect
        }

        if timestamps:
            dictionary["createdAt"] = self.created_at
            dictionary["updatedAt"] = self.updated_at

        return dictionary
