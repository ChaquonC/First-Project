from app.models import db, Stats, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stats():
    kirby_stats = Stats(
        character_id=1,
        hp=300,
        armor_value=8,
        base_damage=32,
        weakness="ice",
        resistance="slash"
    )
    fortnite_stats = Stats(
        character_id=2,
        hp=150,
        armor_value=20,
        base_damage=40,
        weakness="fire",
        resistance="gun"
    )
    grinch_stats = Stats(
        character_id=3,
        hp=210,
        armor_value=10,
        base_damage=45,
        weakness="consume",
        resistance="ice"
    )
    hollow_stats = Stats(
        character_id=4,
        hp=100,
        armor_value=0,
        base_damage=80,
        weakness="bash",
        resistance="slash"
    )

    db.session.add(kirby_stats)
    db.session.add(fortnite_stats)
    db.session.add(grinch_stats)
    db.session.add(hollow_stats)

    db.session.commit()

def undo_stats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stats"))

    db.session.commit()
