import "./PVABattle.css"
import { useSelector } from "react-redux";
import "./CharacterSelect.css";
import { useEffect, useState } from "react";
import { damageTaken, heal } from "../../../Utlities";
export default function PVABattle() {
  const characters = useSelector((state) => state.character.battling);

  const [player, setPlayer] = useState();
  const [playerHealthbarColor, setPlayerHealthbarColor] = useState("blue");
  const [playerHealthPercentage, setPlayerHealthPercentage] = useState();
  const [playerCurrentHealth, setPlayerCurrentHealth] = useState();
  const [playerHealsLeft, setPlayerHealsLeft] = useState(2);
  const [playerTotalHp, setPlayerTotalHp] = useState();

  const [ai, setAi] = useState();
  const [aiHealthPercentage, setAIHealthPercentage] = useState();
  const [aiCurrentHealth, setAiCurrentHealth] = useState();
  const [aiHealthbarColor, setAIHealthbarColor] = useState("blue");
  const [aiHealsleft, setAIHealsLeft] = useState(2);
  const [aiTotalHp, setAiTotalHp] = useState();

  console.log(player);
  console.log(ai);

  useEffect(() => {
    setPlayer(characters.player1);
    setAi(characters.player2);
    setPlayerCurrentHealth(characters.player1.stats.hp);
    setAiCurrentHealth(characters.player2.stats.hp);
    setPlayerTotalHp(characters.player1.stats.hp);
    setAiTotalHp(characters.player2.stats.hp);
  }, [characters]);

  useEffect(() => {
    if (playerHealthPercentage > 0.50) {
        setPlayerHealthbarColor("blue");
    } else if (playerHealthPercentage <= 0.50 && playerHealthPercentage > 0.25) {
        setPlayerHealthbarColor("yellow");
    }else if (playerHealthPercentage <= 0.25) {
        setPlayerHealthbarColor("red");
    }

    if (aiHealthPercentage > 0.50) {
        setAIHealthbarColor("blue");
    } else if (aiHealthPercentage <= 0.50 && aiHealthPercentage > 0.25) {
        setAIHealthbarColor("yellow");
    } else if (aiHealthPercentage <= 0.25) {
        setAIHealthbarColor("red");
    }
  }, [playerHealthPercentage, aiHealthPercentage])

  useEffect(() => {
    setPlayerHealthPercentage(playerCurrentHealth/playerTotalHp)
    setAIHealthPercentage(aiCurrentHealth/aiTotalHp)
    if (aiCurrentHealth <= 0) {

    }
    if (playerCurrentHealth <= 0) {

    }
  }, [playerCurrentHealth, aiCurrentHealth])

  const aiBehavior = () => {
    if (player.stats.weakness === ai.move1.moveType) {

    } else if (player.stats.weakness == ai.move2.movetype) {

    } else {

    }
  }





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
            >HEALTH</div>
          </div>
        </div>
        <div className="player1-battlecard__buttons">
            <button onClick={() => {
                setAiCurrentHealth(aiCurrentHealth - damageTaken(player.move1, player, ai))
            }}>
                {player.move1.name}
            </button>
            <button onClick={() => {
                setAiCurrentHealth(aiCurrentHealth - damageTaken(player.move2, player, ai))
            }}>
                {player.move2.name}
            </button>
            <button onClick={() => {
                if (playerHealsLeft > 0) {
                    setPlayerCurrentHealth(playerCurrentHealth + heal(player));
                    setPlayerHealsLeft(playerHealsLeft - 1);
                }
            }}>
                HEAL ({playerHealsLeft} left)
            </button>
        </div>
      </div>
      <div className="player2-battlecard__div">
        <div className="player2-battlecard__sprite=healthbar">
            <img
                className="player2-battlecard__sprite"
                src={ai.sprite}
                alt=""
            />
            <div className="player2-battlecard__healthbar-full">
                <div className="player2-battlecard__healthbar-variable"
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
