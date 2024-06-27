import "./CharacterSelectCard.css";

export default function CharacterSelectCard({ character, setPlayerCharacter, setAiCharacter }) {
  return (
    <li className="csc__li">
      <img className="csc__img" src={character.sprite} alt="" />
      <h1 className="csc__name">{character.name}</h1>
      <div className="csc__buttons">
        <button className="buttons__player-select" onClick={() => setPlayerCharacter(character)}>
            Player
        </button>
        <button className="buttons__ai-select" onClick={() => setAiCharacter(character)}>
            AI
        </button>
      </div>
    </li>
  );
}
