import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./GameSelector.css";

export default function GameSelector() {
    const history = useHistory();
    const handleGame1 = () => {history.push("/main/game1")}
    const handleGame2 = () => {history.push("/main/game2")}
    const handleGame3 = () => {history.push("/main/game3")}
    const handleManageCharacters = () => {history.push("/main/manage-characters")}
  return (
    <div className="game-selector">
      <div className="game-selector__header">
        <h2>Pick Game Mode</h2>
      </div>
      <div className="game-selector__options">
        <div className="game-selector__game1 game-selector__card">
          <button className="game1" onClick={handleGame1}>Player vs AI</button>
        </div>
        <div className="game-selector__game2 game-selector__card">
          <button className="game2" onClick={handleGame2}>Player vs Player</button>
        </div>
        <div className="game-selector__game3 game-selector__card">
          <button className="game3" onClick={handleGame3}>Online Battle</button>
        </div>
        <div className="game-selector__manage-characters game-selector__card">
          <button className="manage-characters" onClick={handleManageCharacters}>Manage Characters</button>
        </div>
      </div>
    </div>
  );
}
