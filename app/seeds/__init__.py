from flask.cli import AppGroup
from .characters import seed_characters, undo_characters
from .items import seed_items, undo_items
from .moves import seed_moves, undo_moves
from .stats import seed_stats, undo_stats
from .users import seed_users, undo_users

from app.models.db import db, environment, SCHEMA

#Creates a seed groupt to hold commands
#allows 'flask seed --help' command to function
seed_commands = AppGroup("seed")

#Creates 'flask seed all' command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with the schema name
        undo_items()
        undo_moves()
        undo_stats()
        undo_characters()
        undo_users()
    seed_users()
    seed_characters()
    seed_stats()
    seed_moves()
    seed_items()

@seed_commands.command("undo")
def undo():
    undo_items()
    undo_moves()
    undo_stats()
    undo_characters()
    undo_users()
