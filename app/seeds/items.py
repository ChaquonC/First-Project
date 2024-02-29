from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    heal1 = Item(
        character_id=2,
        item_type="heal",
        item_effect= 20
    )
    heal2 = Item(
        character_id=3,
        item_type="heal",
        item_effect=20
    )
    armor = Item(
        character_id=1,
        item_type="armor_up",
        item_effect=20
    )
    attack = Item(
        character_id=4,
        item_type="attack_up",
        item_effect=20
    )

    db.session.add(heal1)
    db.session.add(heal2)
    db.session.add(armor)
    db.session.add(attack)

    db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
