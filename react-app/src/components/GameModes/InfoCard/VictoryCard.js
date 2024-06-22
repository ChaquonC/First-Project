import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import "./VictoryCard.css"

export default function VictoryCard(character) {

    return (
        <div className="victory-card__div">
            <h2 className="victory-card__winner">
                {character.name} WINS!!!!
            </h2>
            <img className="victory-card__character-image" src={character.sprite} alt=""/>
            <div className="victory-card__buttons">
                <button className="victory-card__main-menu" onClick={<Redirect to="/main" />}>
                    MAIN MENU
                </button>
                <button className="victory-card__character-select" onClick={<Redirect to="/main/gamemode1/select"/>}>
                    PLAY AGAIN
                </button>
            </div>

        </div>
    )

}
