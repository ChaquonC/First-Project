import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./ManageCharacters.css";
import { useEffect } from "react";
import { thunkGetUserCharacters } from "../../store/character";

export default function ManageCharacters() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const characters = useSelector((state) => Object.values(state.character.userCharacters))

    useEffect(() => {
        dispatch(thunkGetUserCharacters())
    }, [dispatch])

    if (!user) return <Redirect to="/LandingPage" />;

    return (
        <div className="managecharacters__div">
            <ul>
                {characters.map(character => {
                    return (<li>
                        <h1>{character.name}</h1>
                        <h2>{character.ownerID}</h2>
                        <img src={character.sprite}></img>
                    </li>)
                })}
            </ul>
        </div>
    )
}
