from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Character, Stats, Move
from ..forms import CreateCharacterForm
from .aws_helpers import get_unique_filename, upload_file_to_s3

character_routes = Blueprint('characters', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


def validation_errors_to_dict(validation_errors):
    return {k: v for k in validation_errors for v in validation_errors[k]}

@character_routes.route('/getUserCharacters')
@login_required
def get_user_characters():
    all_user_characters = [character.to_dict() for character in current_user.characters]
    # character_query = Character.query.filter(Character.owner_id == current_user.id).all()
    # all_user_characters = [character.to_dict() for character in character_query]
    return {"characters":all_user_characters}

@character_routes.route('/createUserCharacter', methods=["POST"])
@login_required
def create_user_character():

    form = CreateCharacterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    form.data["user_id"] = current_user.id

    # print("__________________________________________________")
    # print(form["name"])
    # print(form["hp"])
    # print(form["armor"])
    # print(form["damage"])
    # print(form["image"])
    # print(form["weakness"])
    # print(form["resistance"])
    # print(form["first_move"])
    # print(form["second_move"])
    # print(form["first_move_type"])
    # print(form["second_move_type"])
    # print("__________________________________________________")

    if form.validate_on_submit():
        print("__________________________________________________")
        print("Successfully validated")
        print("__________________________________________________")
        image = form.data["sprite"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {ERROR: "FAILD TO UPLOAD CHARACTER SPRITE TO AWS"}

        new_character = Character(
            name = form.data["name"],
            sprite = upload["url"],
            owner_id = current_user.id,
            public = False,
        )
        print(new_character)
        db.session.add(new_character)
        db.session.commit()

        new_stats = Stats(
            character_id = new_character.id,
            hp = form.data["hp"],
            armor_value = form.data["armor"],
            base_damage = form.data["damage"],
            weakness = form.data["weakness"],
            resistance = form.data["resistance"],
        )

        new_move1 = Move(
            character_id = new_character.id,
            name = form.data["firstMoveName"],
            move_type = form.data["firstMoveType"],
        )

        new_move2 = Move(
            character_id = new_character.id,
            name = form.data["secondMoveName"],
            move_type = form.data["secondMoveType"],
        )

        db.session.add(new_stats)
        db.session.add(new_move1)
        db.session.add(new_move2)
        db.session.commit()

        return new_character.to_dict()
        return { "KEKW" : 52}

    return {"errors": validation_errors_to_dict(form.errors)}, 400
