import { useEffect, useState } from "react";
import "./Player1BattleInfoCard.css";

export default function Player1BattleInfoCard({ character }) {
    const [healthbarColor, setHealthbarColor] = useState();
    const [healthPercentage, setHealthPercentage] = useState();

    useEffect(() => {

    })


  return (
    <div className="player1-battlecard__div">
      <div className="player1-battlecard__sprite-healthbar">
        <img
          className="player1-battlecard__sprite"
          src={character.sprite}
          alt=""
        />
        <div className="player1-battlecard_healthbar-full">
            <div className="player1-battlecard_healthbar-variable" style={{

            }}>

            </div>
        </div>
      </div>
    </div>
  );
}
