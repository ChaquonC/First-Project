from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from enum import Enum

# defining enum variable types
weak = Enum(
    "Weak",
    [
        "fire",
        "ice",
        "water",
        "earth",
        "wind",
        "electric",
        "slash",
        "gun",
        "bash",
        "consume",
    ],
)

resistance = Enum(
    "Resist",
    [
        "fire",
        "ice",
        "water",
        "earth",
        "wind",
        "electric",
        "slash",
        "gun",
        "bash",
        "consume",
    ],
)


class Stats(db.Model):
    __tablename__ = "stats"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    character_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False
    )
    hp = db.Column(db.Integer, nullable=False)
    armor_value = db.Column(db.Integer, nullable=False)
    base_damage = db.Column(db.Integer, nullable=False)
    weakness = db.Column(db.Enum(weak), nullable=False)
    resistance = db.Column(db.Enum(resistance), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    character = db.relationship("Character", back_populates="stats")

    def to_dict(self, timestamps=False):
        dictionary = {
            "id": self.id,
            "characterID": self.character_id,
            "hp": self.hp,
            "armorValue": self.armor_value,
            "baseDamage": self.base_damage,
            "weakness": self.weakness.name,
            "resistance": self.resistance.name,
        }

        if timestamps:
            dictionary["createdAt"] = self.created_at
            dictionary["updatedAt"] = self.updated_at

        return dictionary
