import "./CharacterSelectCard.css";

export default function CharacterSelectCard({ character }) {
  return (
    <li key={character.id} className="csc__li">
      <img className="csc__img" src={character.sprite} alt="" />
      <h1 className="csc__name">{character.name}</h1>
      <div className="csc__buttons">
        <button>
            Player
        </button>
        <button>
            AI
        </button>
      </div>
    </li>
  );
}
