from app.models import db, Move, environment, SCHEMA
from sqlalchemy.sql import text

def seed_moves():
    kirby_move1 = Move(
        character_id=1,
        move_type="consume",
        name="Inhale"
    )
    kirby_move2 = Move(
        character_id=1,
        move_type="bash",
        name="Squishy Palm"
    )
    fortnite_move1 = Move(
        character_id=2,
        move_type="gun",
        name="Legendary Scar"
    )
    fortnite_move2 = Move(
        character_id=2,
        move_type="ice",
        name="Chiller Grenade"
    )
    grinch_move1 = Move(
        character_id=3,
        move_type="slash",
        name="Sharp Candy Cane"
    )
    grinch_move2 = Move(
        character_id=3,
        move_type="fire",
        name="Christmas Tree Contingency Plan"
    )
    hollow_knight_move1 = Move(
        character_id=4,
        move_type="slash",
        name="Chanelled Nail"
    )
    hollow_knight_move2 = Move(
        character_id=4,
        move_type="wind",
        name="Abyss Shriek"
    )

    db.session.add(kirby_move1)
    db.session.add(kirby_move2)
    db.session.add(fortnite_move1)
    db.session.add(fortnite_move2)
    db.session.add(grinch_move1)
    db.session.add(grinch_move2)
    db.session.add(hollow_knight_move1)
    db.session.add(hollow_knight_move2)

    db.session.commit()

def undo_moves():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.moves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM moves"))

    db.session.commit()
