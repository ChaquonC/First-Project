import "./PlayerCharacterSelectCard.css";

export default function CharacterSelectCard({ character, setPlayer1Character, setPlayer2Character }) {
  return (
    <li key={character.id} className="csc__li">
      <img className="csc__img" src={character.sprite} alt="" />
      <h1 className="csc__name">{character.name}</h1>
      <div className="csc__buttons">
        <button className="buttons__player-select" onClick={() => setPlayer1Character(character)}>
            Player 1
        </button>
        <button className="buttons__player2-select" onClick={() => setPlayer2Character(character)}>
            Player 2
        </button>
      </div>
    </li>
  );
}
