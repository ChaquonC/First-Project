import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./GameSelector.css";

export default function GameSelector() {
    const history = useHistory();
    const handleGame1 = () => {history.push("/main/gamemode1/select")}
    const handleGame2 = () => {history.push("/main/gamemode2/select")}
    const handleGame3 = () => {history.push("/main/gamemode3/select")}
    const handleManageCharacters = () => {history.push("/main/manage-characters")}
  return (
    <div className="game-selector">
      <div className="game-selector__header">
        <h2>Pick Game Mode</h2>
      </div>
      <div className="game-selector__options">
        <div className="game1">
          <button className="game-selector__button" onClick={handleGame1}>Player vs AI</button>
        </div>
        <div className="game2">
          <button className="game-selector__button" onClick={handleGame2}>Player vs Player</button>
        </div>
        <div className="game3">
          <button className="game-selector__button" onClick={handleGame3}>Online Battle</button>
        </div>
        <div className="game4">
          <button className="game-selector__button" onClick={handleManageCharacters}>Manage Characters</button>
        </div>
      </div>
    </div>
  );
}
