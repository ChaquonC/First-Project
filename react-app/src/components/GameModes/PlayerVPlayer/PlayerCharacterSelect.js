import "./PlayerCharacterSelect.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionBattling, thunkGetBattleCharacters } from "../../../store/character";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PlayerCharacterSelectCard from "../PlayerVPlayer/PlayerCharacterSelectCard"
import CharacterInfoCard from "../InfoCard/CharacterInfoCard";
import { randomFighters } from "../../../Utlities";

export default function CharacterSelect() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const characters = useSelector((state) =>
    Object.values(state.character.battleCharacters)
  );
  const [player1Character, setPlayer1Character] = useState(null);
  const [player2Character, setPlayer2Character] = useState(null);

  useEffect(() => {
    dispatch(thunkGetBattleCharacters());
  }, [dispatch]);

  const handleFight = () => {
    let char1 = player1Character;
    let char2 = player2Character;
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

    history.push("/main/gamemode2/battle")
  }

  if (!user) return <Redirect to="/LandingPage" />;

  return (
    <div className="character-select__div">
      <div className="character-select__characters">
        <ul className="character-select__character-list">
          {characters.map((character) => {
            return (
              <PlayerCharacterSelectCard
                character={character}
                setPlayer1Character={setPlayer1Character}
                setPlayer2Character={setPlayer2Character}
              />
            );
          })}
        </ul>
      </div>
      <div className="character-select__selected-characters">
        <div className="selected-characters__player1">
          <CharacterInfoCard character={player1Character} />
        </div>
        <img
          className="selected-character__versus"
          alt=""
          src="https://fake-mon.s3.us-east-2.amazonaws.com/versus+symbol.png"
        ></img>
        <div className="selected-characters__player2">
          <CharacterInfoCard character={player2Character} />
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
