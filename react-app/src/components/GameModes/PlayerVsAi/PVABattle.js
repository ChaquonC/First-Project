import { useSelector } from "react-redux";
import "./CharacterSelect.css";
import { useEffect, useState } from "react";
import Player1BattleInfoCard from "./../InfoCard/Player1BattleInfoCard"
export default function PVABattle() {
    const characters = useSelector((state) => state.character.battling);
    const [player, setPlayer] = useState()
    const [ai, setAi] = useState()
    useEffect(() => {
        setPlayer(characters.player1)
        setAi(characters.player2)
    }, [characters])


    if (!player || !ai) {
        return (<h1>LOADING</h1>)
    }
    return (
        <div className="PVA__div">
            <Player1BattleInfoCard
                character={player}/>
            <h1>{ai.name}</h1>
        </div>
    )
}
