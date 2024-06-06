from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from enum import Enum

move_types = Enum(
    "move_types",
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


class Move(db.Model):
    __tablename__ = "moves"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    character_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False
    )
    move_type = db.Column(db.Enum(move_types), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    character = db.relationship("Character", back_populates="moves")

    def to_dict(self, timestamps=False):
        dictionary = {
            "id": self.id,
            "characterID": self.character_id,
            "moveType": self.move_type.name,
            "name": self.name,
        }

        if timestamps:
            dictionary["createdAt"] = self.created_at
            dictionary["updatedAt"] = self.updated_at

        return dictionary
