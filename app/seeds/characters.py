from app.models import db, Character, environment, SCHEMA
from sqlalchemy.sql import text

def seed_characters():
    character1 = Character(
        name="Kirby",
        sprite="https://www.google.com/url?sa=i&url=https%3A%2F%2Faminoapps.com%2Fc%2Fkirby%2Fpage%2Fblog%2Fshiny-kirby-sprite-tm%2FbNz0_gPLHou04Xmw66qdwYPRm0zM5m5v7RM&psig=AOvVaw3TCCd3E0wnXxVrUvHtw-Ej&ust=1709255268299000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDZhZyuz4QDFQAAAAAdAAAAABAE",
        owner_id=3,
        public=True
    )
    character2 = Character(
        name="Fortnite Guy",
        sprite="https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.pinterest.com%2Fpin%2Fjonesy--816347869966032992%2F&psig=AOvVaw1NqAkpRsfi6yacSJaNf3hb&ust=1709256102699000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPCtraixz4QDFQAAAAAdAAAAABAE",
        owner_id=1,
        public=True
    )
    character3 = Character(
        name="Grinch",
        sprite="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.spriters-resource.com%2Fds_dsi%2Fgrinchstolechristmas%2F&psig=AOvVaw3Tk8SSQXwp-zMSXb8ooCQC&ust=1709256184274000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNiGmNCxz4QDFQAAAAAdAAAAABAE",
        owner_id=2,
        public=False
    )
    character4 = Character(
        name="Hollow Knight",
        sprite="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2FHollowKnight%2Fcomments%2Fu5szyc%2Fthe_knight_pixel_art_sprite%2F&psig=AOvVaw0s5eLL3UYrzADtf7kNdR95&ust=1709256371426000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMCv_Kiyz4QDFQAAAAAdAAAAABAE",
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
