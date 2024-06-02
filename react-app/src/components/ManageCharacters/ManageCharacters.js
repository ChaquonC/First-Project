import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./ManageCharacters.css";
import { useEffect } from "react";
import { thunkGetUserCharacters } from "../../store/character";
import ManageCharacterCard from "./ManageCharacterCard";
import OpenModalButton from "../OpenModalButton";
import ManageCharacterCreate from "./ManageCharacterCreate";

export default function ManageCharacters() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const characters = useSelector((state) =>
    Object.values(state.character.userCharacters)
  );

  useEffect(() => {
    dispatch(thunkGetUserCharacters());
  }, [dispatch]);

  if (!user) return <Redirect to="/LandingPage" />;

  return (
    <div className="manage-characters__div">
      <ul className="manage-characters__list">
        {characters.map((character) => {
          return <ManageCharacterCard character={character} />;
        })}

        <li>
          <OpenModalButton
            modalComponent={<ManageCharacterCreate />}
            buttonText={<i className="fa-regular fa-plus" />}
            buttonClass="manage-character__plus-button"
          />
        </li>

      </ul>
    </div>
  );
}
