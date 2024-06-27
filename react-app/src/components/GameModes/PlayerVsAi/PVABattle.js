import "./PVABattle.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { damageTaken, heal, turnDelay } from "../../../Utlities";
import VictoryCard from "../InfoCard/VictoryCard";
import StandAloneModal from "../../StandAloneModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function PVABattle() {
  const characters = useSelector((state) => state.character.battling);

  const history = useHistory();
  const [player, setPlayer] = useState();
  const [playerHealthbarColor, setPlayerHealthbarColor] = useState("#8aff9e");
  const [playerHealthPercentage, setPlayerHealthPercentage] = useState();
  const [playerCurrentHealth, setPlayerCurrentHealth] = useState();
  const [playerHealsLeft, setPlayerHealsLeft] = useState(2);
  const [playerTotalHp, setPlayerTotalHp] = useState();
  const [playerTurn, setPlayerTurn] = useState(true);

  const [ai, setAi] = useState();
  const [aiHealthPercentage, setAIHealthPercentage] = useState();
  const [aiCurrentHealth, setAiCurrentHealth] = useState();
  const [aiHealthbarColor, setAIHealthbarColor] = useState("#8aff9e");
  const [aiHealsleft, setAIHealsLeft] = useState(2);
  const [aiTotalHp, setAiTotalHp] = useState();

  const [gameIsOver, setGameIsOver] = useState(false);
  const [winner, setWinner] = useState();

  useEffect(() => {
    if (Object.values(characters).length === 0) {
      history.push("/main/gamemode1/select");
    } else {
      setPlayer(characters.player1);
      setAi(characters.player2);
      setPlayerCurrentHealth(characters.player1.stats.hp);
      setAiCurrentHealth(characters.player2.stats.hp);
      setPlayerTotalHp(characters.player1.stats.hp);
      setAiTotalHp(characters.player2.stats.hp);
    }
  }, [characters]);

  useEffect(() => {
    if (playerHealthPercentage > 0.8) {
      setPlayerHealthbarColor("#8aff9e");
    } else if (playerHealthPercentage > 0.5) {
      setPlayerHealthbarColor("#43a047");
    } else if (playerHealthPercentage > 0.2) {
      setPlayerHealthbarColor("#fbc02d");
    } else {
      setPlayerHealthbarColor("#df0030");
    }

    if (aiHealthPercentage > 0.8) {
      setAIHealthbarColor("#8aff9e");
    } else if (aiHealthPercentage > 0.5) {
      setAIHealthbarColor("#43a047");
    } else if (aiHealthPercentage > 0.2) {
      setAIHealthbarColor("#fbc02d");
    } else {
      setAIHealthbarColor("#df0030");
    }
  }, [playerHealthPercentage, aiHealthPercentage]);

  useEffect(() => {
    setPlayerHealthPercentage(playerCurrentHealth / playerTotalHp);
    setAIHealthPercentage(aiCurrentHealth / aiTotalHp);
    if (aiCurrentHealth <= 0) {
      console.log("ai loses");
      setWinner(player);
      setGameIsOver(true);
    } else if (playerCurrentHealth <= 0) {
      console.log("player loses");
      setWinner(ai);
      setGameIsOver(true);
    }
  }, [
    playerCurrentHealth,
    playerTotalHp,
    aiCurrentHealth,
    aiTotalHp,
    ai,
    player,
    winner,
    gameIsOver,
  ]);

  const aiBehavior = async () => {
    if (aiHealthPercentage < 0.5 && aiHealsleft > 0) {
      await turnDelay();
      setAiCurrentHealth(aiCurrentHealth + heal(ai));
      setAIHealsLeft(aiHealsleft - 1);
      setPlayerTurn(true);
      return;
    }
    if (player.stats.weakness === ai.move1.moveType) {
      await turnDelay();
      setPlayerCurrentHealth(
        playerCurrentHealth - damageTaken(ai.move1, ai, player)
      );
      setPlayerTurn(true);
      return;
    } else if (player.stats.weakness === ai.move2.movetype) {
      await turnDelay();
      setPlayerCurrentHealth(
        playerCurrentHealth - damageTaken(ai.move2, ai, player)
      );
      setPlayerTurn(true);
      return;
    } else {
      await turnDelay();
      const randomNumber = Math.random();
      if (randomNumber === 1) {
        setPlayerCurrentHealth(
          playerCurrentHealth - damageTaken(ai.move1, ai, player)
        );
        setPlayerTurn(true);
        return;
      } else {
        setPlayerCurrentHealth(
          playerCurrentHealth - damageTaken(ai.move2, ai, player)
        );
        setPlayerTurn(true);
        return;
      }
    }
  };

  useEffect(() => {
    if (!playerTurn) {
      aiBehavior();
    }
  }, [playerTurn]);

  if (!player || !ai) {
    return <h1>LOADING</h1>;
  }

  return (
    <div className="PVA__div">
      <div className="PVA__health-display">
        <div className="PVA__enemy-div">
          <div className="PVA__enemy-hp-div">
            <span className="PVA__character-name">{ai.name}</span>
            <div className="PVA__enemy-hp-parent">
              <div
                className="PVA__enemy-hp-son"
                style={{
                  color: "white",
                  width: `${aiHealthPercentage * 100}%`,
                  height: "100%",
                  backgroundColor: `${aiHealthbarColor}`,
                }}></div>
            </div>
          </div>

          <img className="PVA__enemy-sprite" src={ai.sprite} alt="" />
        </div>

        <div className="PVA__player-div">
          <img className="PVA__player-sprite" src={player.sprite} alt="" />

          <div className="PVA__player-hp-div">
            <span className="PVA__character-name">{player.name}</span>
            <div className="PVA__player-hp-parent">
              <div
                className="PVA__player-hp-son"
                style={{
                  color: "white",
                  width: `${playerHealthPercentage * 100}%`,
                  height: "100%",
                  backgroundColor: `${playerHealthbarColor}`,
                }}></div>
            </div>
            <span className="PVA__player-hp-display">
            {Math.floor(playerCurrentHealth)} / {player.stats.hp}
            </span>
          </div>
        </div>
      </div>

      <StandAloneModal
        openOnLoad={gameIsOver}
        modalComponent={<VictoryCard character={winner} />}
      />

      <div className="PVA__player-options">
        <div className="PVA__what-will">What will {player.name} do?</div>
        <div className="PVA__player-buttons">
          <button
            className="PVA__player-move1"
            disabled={!playerTurn}
            onClick={() => {
              if (playerTurn) {
                setAiCurrentHealth(
                  aiCurrentHealth - damageTaken(player.move1, player, ai)
                );
                setPlayerTurn(false);
              }
            }}>
            {player.move1.name}
          </button>
          <button
            className="PVA__player-move2"
            disabled={!playerTurn}
            onClick={() => {
              if (playerTurn) {
                setAiCurrentHealth(
                  aiCurrentHealth - damageTaken(player.move2, player, ai)
                );
                setPlayerTurn(false);
              }
            }}>
            {player.move2.name}
          </button>
          <button
            className="PVA__player-heal"
            disabled={!playerTurn}
            onClick={() => {
              if (playerHealsLeft > 0 && playerTurn) {
                setPlayerCurrentHealth(playerCurrentHealth + heal(player));
                setPlayerHealsLeft(playerHealsLeft - 1);
                setPlayerTurn(false);
              }
            }}>
            HEAL ({playerHealsLeft} left)
          </button>
        </div>
      </div>
    </div>
  );
}
