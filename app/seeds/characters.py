from app.models import db, Character, environment, SCHEMA
from sqlalchemy.sql import text

def seed_characters():
    character1 = Character(
        name="Kirby",
        sprite="https://fake-mon.s3.us-east-2.amazonaws.com/SEEDER/kirby.png",
        owner_id=3,
        public=True
    )
    character2 = Character(
        name="Fortnite Guy",
        sprite="https://fake-mon.s3.us-east-2.amazonaws.com/SEEDER/fortniteGuy.jpeg",
        owner_id=1,
        public=True
    )
    character3 = Character(
        name="Grinch",
        sprite="https://fake-mon.s3.us-east-2.amazonaws.com/SEEDER/thigGrinch.jpeg",
        owner_id=2,
        public=True
    )
    character4 = Character(
        name="Hollow Knight",
        sprite="https://fake-mon.s3.us-east-2.amazonaws.com/SEEDER/hollowKnight.jpeg",
        owner_id=4,
        public=True
    )

    db.session.add(character1)
    db.session.add(character2)
    db.session.add(character3)
    db.session.add(character4)

    db.session.commit()


def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM characters"))

    db.session.commit()
