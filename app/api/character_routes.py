from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

character_routes = Blueprint('characters', __name__)

@character_routes.route('/getUserCharacters')
@login_required
def get_user_characters():
    all_user_characters = [character.to_dict() for character in current_user.characters]
    # character_query = Character.query.filter(Character.owner_id == current_user.id).all()
    # all_user_characters = [character.to_dict() for character in character_query]
    return {"characters":all_user_characters}
