import "./CharacterSelect.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBattleCharacters } from "../../../store/character";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import CharacterSelectCard from "./CharacterSelectCard";
import CharacterInfoCard from "../InfoCard/CharacterInfoCard";
import { randomFighters } from "../../../Utlities";
import { actionBattling } from "../../../store/character";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function CharacterSelect() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const characters = useSelector((state) =>
    Object.values(state.character.battleCharacters)
  );
  const [playerCharacter, setPlayerCharacter] = useState(null);
  const [aiCharacter, setAiCharacter] = useState(null);

  useEffect(() => {
    dispatch(thunkGetBattleCharacters());
  }, [dispatch]);

  const handleFight = () => {
    let char1 = playerCharacter
    let char2 = aiCharacter
    if (!char1) {
      const characterId = randomFighters(characters.length);
      char1 = characters[characterId];
    }
    if (!char2) {
      const characterId = randomFighters(characters.length);
      char2 = characters[characterId];
    }
    dispatch(actionBattling({
      player1: char1,
      player2: char2,
    }))

    history.push("/main/gamemode1/battle")

  }
  if (!user) return <Redirect to="/LandingPage" />;

  return (
    <div className="character-select__div">
      <div className="character-select__characters">
        <ul className="character-select__character-list">
          {characters.map((character) => {
            return (
              <CharacterSelectCard
                character={character}
                setPlayerCharacter={setPlayerCharacter}
                setAiCharacter={setAiCharacter}
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
          <CharacterInfoCard character={aiCharacter} />
        </div>
      </div>
      <div className="character-select__play-button-container">
        <button className="character-select__play-button"
        onClick={() => handleFight()}>
          FIGHT
          </button>
      </div>
    </div>
  );
}
