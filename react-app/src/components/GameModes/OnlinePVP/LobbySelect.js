import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function LobbySelect() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const dispatch = useDispatch();
  // const characters = useSelector((state) => state.characters.availableCharacters); // Assuming characters are stored in redux state
  const characters = [
    {
      id: 1,
      move1: {
        characterID: 1,
        id: 1,
        moveType: "consume",
        name: "Inhale",
      },
      move2: {
        characterID: 1,
        id: 2,
        moveType: "bash",
        name: "Squishy Palm",
      },
      name: "Kirby",
      ownerID: 3,
      sprite: "https://fake-mon.s3.us-east-2.amazonaws.com/SEEDER/kirby.png",
      stats: {
        armorValue: 8,
        baseDamage: 32,
        characterID: 1,
        hp: 300,
        id: 1,
        resistance: "slash",
        weakness: "ice",
      },
    },
    {
      id: 2,
      move1: {
        characterID: 1,
        id: 1,
        moveType: "consume",
        name: "Inhale",
      },
      move2: {
        characterID: 1,
        id: 2,
        moveType: "bash",
        name: "Squishy Palm",
      },
      name: "KirbyEVIL",
      ownerID: 3,
      sprite: "https://fake-mon.s3.us-east-2.amazonaws.com/SEEDER/kirby.png",
      stats: {
        armorValue: 8,
        baseDamage: 32,
        characterID: 1,
        hp: 300,
        id: 1,
        resistance: "slash",
        weakness: "ice",
      },
    },
    {
      id: 3,
      move1: {
        characterID: 1,
        id: 1,
        moveType: "consume",
        name: "Inhale",
      },
      move2: {
        characterID: 1,
        id: 2,
        moveType: "bash",
        name: "Squishy Palm",
      },
      name: "KirbyGOOD",
      ownerID: 3,
      sprite: "https://fake-mon.s3.us-east-2.amazonaws.com/SEEDER/kirby.png",
      stats: {
        armorValue: 8,
        baseDamage: 32,
        characterID: 1,
        hp: 300,
        id: 1,
        resistance: "slash",
        weakness: "ice",
      },
    },
  ];

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    // Cleanup function to disconnect socket on unmount
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    console.log("CHARACTER SELECTED", selectedCharacter)
    if (selectedCharacter) {
      // Emit character selection event to server if socket is connected
      if (socket) {
        socket.emit("character_selected", { character: selectedCharacter });
      }
    }
  }, [selectedCharacter, socket]);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div>
      <h2>Choose your character:</h2>
      {characters.map((character) => (
        <button
          key={character.id}
          onClick={() => handleCharacterSelect(character)}>
          {character.name}
        </button>
      ))}
      {selectedCharacter && <p>Selected: {selectedCharacter.name}</p>}
    </div>
  );
}
