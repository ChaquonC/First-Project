import "./PVPBattle.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { damageTaken, getRandomIntInclusive, heal } from "../../../Utlities";
import VictoryCard from "../InfoCard/VictoryCard";
import StandAloneModal from "../../StandAloneModal";

export default function PVPBattle() {
    const characters = useSelector((state) => state.character.battling);

    const [player1, setPlayer1] = useState();
    const [player1HealthbarColor, setPlayer1HealthbarColor] = useState("blue");
    const [player1HealthPercentage, setPlayer1HealthPercentage] = useState();
    const [player1CurrentHealth, setPlayer1CurrentHealth] = useState();
    const [player1HealsLeft, setPlayer1HealsLeft] = useState(2);
    const [player1TotalHp, setPlayer1TotalHp] = useState();
    const [player1Turn, setPlayer1Turn] = useState();

    const [player2, setPlayer2] = useState();
    const [player2HealthbarColor, setPlayer2HealthbarColor] = useState("blue");
    const [player2HealthPercentage, setPlayer2HealthPercentage] = useState();
    const [player2CurrentHealth, setPlayer2CurrentHealth] = useState();
    const [player2HealsLeft, setPlayer2HealsLeft] = useState(2);
    const [player2TotalHp, setPlayer2TotalHp] = useState();
    const [player2Turn, setPlayer2Turn] = useState();

    const [gameIsOver, setGameIsOver] = useState(false);
    const [winner, setWinner] = useState();

    const turnDecider = () => {
        const randomNumber = getRandomIntInclusive(0,1);
        console.log(randomNumber)
        if (randomNumber === 1) {
            setPlayer1Turn(true);
            setPlayer2Turn(false)
        } else if (randomNumber === 0) {
            setPlayer2Turn(true);
            setPlayer1Turn(false);
        }
    }

    useEffect(() => {
        setPlayer1(characters.player1);
        setPlayer2(characters.player2);
        setPlayer1CurrentHealth(characters.player1.stats.hp);
        setPlayer2CurrentHealth(characters.player2.stats.hp);
        setPlayer1TotalHp(characters.player1.stats.hp);
        setPlayer2TotalHp(characters.player2.stats.hp);
        turnDecider()
    }, [characters]);

    useEffect(() => {
        if (player1HealthPercentage > 0.5) {
            setPlayer1HealthbarColor("blue");
        } else if (player1HealthPercentage <= 0.5 && player1HealthPercentage > 0.25) {
            setPlayer1HealthbarColor("yellow");
        } else if (player1HealthPercentage <= 0.25) {
            setPlayer1HealthPercentage("red");
        }

        if (player2HealthPercentage > 0.5) {
            setPlayer2HealthbarColor("blue");
        } else if (player2HealthPercentage <= 0.5 && player2HealthPercentage > 0.25) {
            setPlayer2HealthbarColor("yellow");
        } else if (player2HealthPercentage <= 0.25) {
            setPlayer2HealthbarColor("red");
        }
    }, [player1HealthPercentage, player2HealthPercentage]);

    useEffect(() => {
        setPlayer1HealthPercentage(player1CurrentHealth / player1TotalHp);
        setPlayer2HealthPercentage(player2CurrentHealth / player2TotalHp);
        if (player1CurrentHealth <= 0) {
            setWinner(player2);
            setGameIsOver(true);
        } else if (player2CurrentHealth <= 0) {
            setWinner(player1);
            setGameIsOver(true);
        }
    }, [player1CurrentHealth, player1TotalHp, player1, player2CurrentHealth, player2TotalHp, player2, winner, gameIsOver]);

    if (!player1 || !player2) {
        return <h1>LOADING</h1>
    }

return (
    <div className="PVP__div">
        <div className="player1-battlecard__div">
            <div className="player1-battlecard__sprite-healthbar">
                <img
                    className="player1-battlecard__sprite"
                    src={player1.sprite}
                    alt=""
                />
                <div className="player1-battlecard__healthbar-full">
                    <div className="player1-battlecard__healthbar-variable"
                    style={{
                        color: "white",
                        width: `${player1HealthPercentage * 100}`,
                        backgroundColor: `${player1HealthbarColor}`,
                    }}
                    >
                        HEALTH: {player1CurrentHealth};
                    </div>
                </div>
            </div>
            <div className="player1-battlecard__buttons">
                <button
                    disabled={!player1Turn}
                    onClick={() => {
                        if (player1Turn) {
                            setPlayer2CurrentHealth(player2CurrentHealth - damageTaken(player1.move1, player1, player2));
                            setPlayer1Turn(false);
                            setPlayer2Turn(true);
                        }
                    }}
                    >
                        {player1.move1.name}
                </button>
                <button
                    disabled={!player1Turn}
                    onClick={() => {
                        if (player1Turn) {
                            setPlayer2CurrentHealth(player2CurrentHealth - damageTaken(player1.move2, player1, player2));
                            setPlayer1Turn(false);
                            setPlayer2Turn(true);
                        }
                    }}
                >
                    {player1.move2.name}
                </button>
                <button
                    disabled={!player1Turn}
                    onClick={() => {
                        if (player1HealsLeft > 0 && player1Turn) {
                            setPlayer1CurrentHealth(player1CurrentHealth + heal(player1));
                            setPlayer1HealsLeft(player1HealsLeft - 1);
                            setPlayer1Turn(false);
                            setPlayer2Turn(true);
                        }
                    }}
                >
                    HEAL ({player1HealsLeft} left)
                </button>
            </div>
        </div>
        <StandAloneModal
            openOnLoad={gameIsOver}
            modalComponent={<VictoryCard character={winner}/>}
        />

        <div className="player2-battlecard__div">
            <div className="player2-battlecard__sprite-healthbar">
                <img
                    className="player2-battlecard__sprite"
                    src={player2.sprite}
                    alt=""
                />
                <div className="player2-battlecard__healthbar-full">
                    <div className="player2-battlecard__healthbar-variable"
                    style={{
                        color: "white",
                        width: `${player2HealthPercentage * 100}`,
                        backgroundColor: `${player2HealthbarColor}`,
                    }}
                    >
                        HEALTH: {player2CurrentHealth}
                    </div>
                </div>
            </div>
            <div className="player2-battlecard__buttons">
                <button
                    disabled={!player2Turn}
                    onClick={() => {
                        if (player2Turn) {
                            setPlayer1CurrentHealth(player1CurrentHealth - damageTaken(player2.move1, player2, player1));
                            setPlayer2Turn(false);
                            setPlayer1Turn(true);
                        }
                    }}
                    >
                        {player2.move1.name}
                </button>
                <button
                    disabled={!player2Turn}
                    onClick={() => {
                        if (player2Turn) {
                            setPlayer1CurrentHealth(player1CurrentHealth - damageTaken(player2.move2, player2, player1));
                            setPlayer2Turn(false);
                            setPlayer1Turn(true);
                        }
                    }}
                >
                    {player2.move2.name}
                </button>
                <button
                    disabled={!player2Turn}
                    onClick={() => {
                        if (player2HealsLeft > 0 && player2Turn) {
                            setPlayer2CurrentHealth(player2CurrentHealth + heal(player2));
                            setPlayer2HealsLeft(player2HealsLeft - 1);
                            setPlayer2Turn(false);
                            setPlayer1Turn(true);
                        }
                    }}
                >
                    HEAL ({player2HealsLeft} left)
                </button>
            </div>
        </div>
    </div>
);
}
