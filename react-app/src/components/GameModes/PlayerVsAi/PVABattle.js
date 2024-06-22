import "./PVABattle.css";
import { useSelector } from "react-redux";
import "./CharacterSelect.css";
import { useEffect, useState } from "react";
import { damageTaken, heal, turnDelay } from "../../../Utlities";
import VictoryCard from "../InfoCard/VictoryCard";
export default function PVABattle() {
  const characters = useSelector((state) => state.character.battling);

  const [player, setPlayer] = useState();
  const [playerHealthbarColor, setPlayerHealthbarColor] = useState("blue");
  const [playerHealthPercentage, setPlayerHealthPercentage] = useState();
  const [playerCurrentHealth, setPlayerCurrentHealth] = useState();
  const [playerHealsLeft, setPlayerHealsLeft] = useState(2);
  const [playerTotalHp, setPlayerTotalHp] = useState();
  const [playerTurn, setPlayerTurn] = useState(true);

  const [ai, setAi] = useState();
  const [aiHealthPercentage, setAIHealthPercentage] = useState();
  const [aiCurrentHealth, setAiCurrentHealth] = useState();
  const [aiHealthbarColor, setAIHealthbarColor] = useState("blue");
  const [aiHealsleft, setAIHealsLeft] = useState(2);
  const [aiTotalHp, setAiTotalHp] = useState();

  useEffect(() => {
    setPlayer(characters.player1);
    setAi(characters.player2);
    setPlayerCurrentHealth(characters.player1.stats.hp);
    setAiCurrentHealth(characters.player2.stats.hp);
    setPlayerTotalHp(characters.player1.stats.hp);
    setAiTotalHp(characters.player2.stats.hp);
  }, [characters]);

  useEffect(() => {
    if (playerHealthPercentage > 0.5) {
      setPlayerHealthbarColor("blue");
    } else if (playerHealthPercentage <= 0.5 && playerHealthPercentage > 0.25) {
      setPlayerHealthbarColor("yellow");
    } else if (playerHealthPercentage <= 0.25) {
      setPlayerHealthbarColor("red");
    }

    if (aiHealthPercentage > 0.5) {
      setAIHealthbarColor("blue");
    } else if (aiHealthPercentage <= 0.5 && aiHealthPercentage > 0.25) {
      setAIHealthbarColor("yellow");
    } else if (aiHealthPercentage <= 0.25) {
      setAIHealthbarColor("red");
    }
  }, [playerHealthPercentage, aiHealthPercentage]);

  useEffect(() => {
    setPlayerHealthPercentage(playerCurrentHealth / playerTotalHp);
    setAIHealthPercentage(aiCurrentHealth / aiTotalHp);
    if (aiCurrentHealth <= 0) {
        <VictoryCard character={player}/>
    }
    if (playerCurrentHealth <= 0) {
        <VictoryCard character={ai}/>
    }
  }, [playerCurrentHealth, playerTotalHp, aiCurrentHealth, aiTotalHp, ai, player]);

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
      <div className="player1-battlecard__div">
        <div className="player1-battlecard__sprite-healthbar">
          <img
            className="player1-battlecard__sprite"
            src={player.sprite}
            alt=""
          />
          <div className="player1-battlecard__healthbar-full">
            <div
              className="player1-battlecard__healthbar-variable"
              style={{
                color: "white",
                width: `${playerHealthPercentage * 100}%`,
                backgroundColor: `${playerHealthbarColor}`,
              }}
            >
              HEALTH
            </div>
          </div>
        </div>
        <div className="player1-battlecard__buttons">
          <button
            disabled={!playerTurn}
            onClick={() => {
              if (playerTurn) {
                setAiCurrentHealth(
                  aiCurrentHealth - damageTaken(player.move1, player, ai)
                );
                setPlayerTurn(false);
              }
            }}
          >
            {player.move1.name}
          </button>
          <button
            disabled={!playerTurn}
            onClick={() => {
              if (playerTurn) {
                setAiCurrentHealth(
                  aiCurrentHealth - damageTaken(player.move2, player, ai)
                );
                setPlayerTurn(false);
              }
            }}
          >
            {player.move2.name}
          </button>
          <button
            disabled={!playerTurn}
            onClick={() => {
              if (playerHealsLeft > 0 && playerTurn) {
                setPlayerCurrentHealth(playerCurrentHealth + heal(player));
                setPlayerHealsLeft(playerHealsLeft - 1);
                setPlayerTurn(false);
              }
            }}
          >
            HEAL ({playerHealsLeft} left)
          </button>
        </div>
      </div>
      <div className="player2-battlecard__div">
        <div className="player2-battlecard__sprite=healthbar">
          <img className="player2-battlecard__sprite" src={ai.sprite} alt="" />
          <div className="player2-battlecard__healthbar-full">
            <div
              className="player2-battlecard__healthbar-variable"
              style={{
                color: "white",
                width: `${aiHealthPercentage * 100}%`,
                backgroundColor: `${aiHealthbarColor}`,
              }}
            >
              HEALTH
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
