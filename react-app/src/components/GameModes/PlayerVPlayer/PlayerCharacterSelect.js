import "./PlayerCharacterSelect.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBattleCharacters } from "../../../store/character";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PlayerCharacterSelectCard from "../PlayerVPlayer/PlayerCharacterSelectCard"
import CharacterInfoCard from "../InfoCard/CharacterInfoCard";

export default function CharacterSelect() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const characters = useSelector((state) =>
    Object.values(state.character.battleCharacters)
  );
  const [playerCharacter, setPlayerCharacter] = useState(null);
  const [playerCharacter2, setPlayerCharacter2] = useState(null);

  useEffect(() => {
    dispatch(thunkGetBattleCharacters());
  }, [dispatch]);

  if (!user) return <Redirect to="/LandingPage" />;

  return (
    <div className="character-select__div">
      <div className="character-select__characters">
        <ul className="character-select__character-list">
          {characters.map((character) => {
            return (
              <PlayerCharacterSelectCard
                character={character}
                setPlayerCharacter={setPlayerCharacter}
                setPlayerCharacter2={setPlayerCharacter2}
              />
            );
          })}
        </ul>
      </div>
      <div className="character-select__selected-characters">
        <div className="selected-characters__player1">
          <CharacterInfoCard character={playerCharacter} />
        </div>
        <img
          className="selected-character__versus"
          alt=""
          src="https://fake-mon.s3.us-east-2.amazonaws.com/versus+symbol.png"
        ></img>
        <div className="selected-characters__player2">
          <CharacterInfoCard character={playerCharacter2} />
        </div>
      </div>
      <div className="character-select__play-button-container">
        <button className="character-select__play-button">FIGHT</button>
      </div>
    </div>
  );
}
