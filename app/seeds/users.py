from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users():
    demo = User(
        username="Jane Doe",
        email="nooneimportant@gmail.com",
        password="123321"
    )
    demo2 = User(
        username="John Marston",
        email="johncowboy@gmail.com",
        password="reddead"
    )
    demo3 = User(
        username="Black Man",
        email="blackman@gmail.com",
        password="kirbyTheEater!"
    )
    demo4 = User(
        username="Draconify the Great",
        email="notafurry@gmail.com",
        password="greatestofalltime47"
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)

    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
