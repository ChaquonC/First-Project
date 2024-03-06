from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Character(db.Model):
    __tablename__ = "characters"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    sprite = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    public = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    owner = db.relationship("User", back_populates="characters")
    moves = db.relationship("Move", back_populates="character", cascade="all, delete")
    stats = db.relationship("Stats", back_populates="character", cascade="all, delete")
    items = db.relationship("Item", back_populates="character", cascade="all, delete")

    def to_dict(self, timestamps=False):
        dictionary = {
            "id": self.id,
            "name": self.name,
            "sprite": self.sprite,
            "ownerID": self.owner_id,
        }

        if timestamps:
            dictionary["createdAt"] = self.created_at
            dictionary["updatedAt"] = self.updated_at

        return dictionary
