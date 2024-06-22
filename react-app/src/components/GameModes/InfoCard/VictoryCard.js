import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./VictoryCard.css";
import { useModal } from "../../../context/Modal";
export default function VictoryCard({ character }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const handleMain = () => {
    history.push("/main");
    closeModal()
  };
  const handlePlayAgain = () => {
    history.push("/main/gamemode1/select");
    closeModal()
  };

  return (
    <div className="victory-card__div">
      <h2 className="victory-card__winner">{character.name} WINS!!!!</h2>
      <img
        className="victory-card__character-image"
        src={character.sprite}
        alt=""
      />
      <div className="victory-card__buttons">
        <button className="victory-card__main-menu" onClick={handleMain}>
          MAIN MENU
        </button>
        <button
          className="victory-card__character-select"
          onClick={handlePlayAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
