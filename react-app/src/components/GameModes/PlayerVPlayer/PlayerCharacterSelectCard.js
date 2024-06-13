import "./PlayerCharacterSelectCard.css";

export default function CharacterSelectCard({ character, setPlayerCharacter, setPlayerCharacter2 }) {
  return (
    <li key={character.id} className="csc__li">
      <img className="csc__img" src={character.sprite} alt="" />
      <h1 className="csc__name">{character.name}</h1>
      <div className="csc__buttons">
        <button className="buttons__player-select" onClick={() => setPlayerCharacter(character)}>
            Player 1
        </button>
        <button className="buttons__player2-select" onClick={() => setPlayerCharacter2(character)}>
            Player 2
        </button>
      </div>
    </li>
  );
}
