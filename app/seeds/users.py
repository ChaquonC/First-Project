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

def undo_users():
    if environment == "productions":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.comit()
