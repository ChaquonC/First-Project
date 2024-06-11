import "./CharacterSelect.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBattleCharacters } from "../../../store/character";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import CharacterSelectCard from "./CharacterSelectCard";

export default function CharacterSelect() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const characters = useSelector((state) =>
    Object.values(state.character.battleCharacters)
  );
  const [playerCharacter, setPlayerCharacter] = useState(null);
  const [aiCharacter, setAiCharacter] = useState(null);

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
            {/* <CharacterInfoCard
                character={playerCharacter}
            /> */}
        </div>
        <div className="selected-characters__player2">

        </div>
      </div>
    </div>
  );
}
