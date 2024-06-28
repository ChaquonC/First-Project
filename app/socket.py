from flask_socketio import SocketIO, emit, join_room, send
from .models import Character
from flask_login import current_user
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [os.environ.get("REACT_APP_BASE_URL")]
else:
    origins = "*"

    socketio = SocketIO(cors_allowed_origins=origins)

connected_players = {}


@socketio.on("connect")
def handle_connect():
    connected_players[current_user.id] = {
        "username": current_user.username,
        "looking_for_opponent": True,
        "character": None
    }

    opponent_id = find_opponent(connected_players)
    if opponent_id:

        room_name = "battle_" + current_user.username

        connected_players[current_user.id]["room"] = room_name
        connected_players[opponent_id]["room"] = room_name
        join_room(room_name)
        emit("opponent_found", {"opponent_id": opponent_id}, room=room_name)
        emit("opponent_found", {"opponent_id": current_user.id}, room=room_name)
        connected_players[current_user.id]["looking_for_opponent"] = False
        connected_players[opponent_id]["looking_for_opponent"] = False


def find_opponent(players):
    """
    Finds another player who is also looking for an opponent.
    """
    for player_id, player_info in players.items():
        if player_id != current_user.id and player_info["looking_for_opponent"]:
            return player_id
    return None


@socketio.on("disconnect")
def handle_disconnect():
    player_id = current_user.id
    if player_id in connected_players:
        opponent_id = connected_players.get(player_id, {}).get("room")
        if opponent_id:
            emit("opponent_disconnected", room=opponent_id)
            connected_players[opponent_id]["looking_for_opponent"] = True
        del connected_players[player_id]


@socketio.on("character_selected")
def handle_character_selected(data):
    character_data = data['character']
    connected_players[current_user.id]["character"] = character_data

    room_name = connected_players.get(current_user.id, {}).get("room")
    opponent_id = connected_players.get(room_name, {}).get("opponent_id")
    if opponent_id and connected_players[opponent_id].get("character"):
        opponent_character = connected_players[opponent_id]["character"]
        emit("battle_start", {"opponent_character": opponent_character}, room=room_name)
        emit("battle_start", {"opponent_character": character_data}, room=room_name)


@socketio.on("battle")
def handle_battle(data):
    room_name = connected_players.get(current_user.id, {}).get("room")
    action = data.get("action")

    opponent_id = connected_players.get(room_name, {}).get(
        "opponent_id"
    )
    response_data = {
        "player": current_user.id,
        "action": action,
    }

    emit("battle_action", response_data, room=room_name, skip_sid=socketio.sid)
