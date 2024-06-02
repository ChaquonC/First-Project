import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./ManageCharacterDelete.css";
import { thunkDeleteUserCharacters } from "../../store/character";

export default function ManageCharacterDelete({ character }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const deleteCharacter = async () => {
      let res = await dispatch(thunkDeleteUserCharacters(character.id));

    if (res && res.ok) {
      closeModal();
    }
  };

  return (
    <div className="ManageCharacterDelete__maindiv">
      <h1>ARE YOU SURE YOU WANT TO DELETE {character.name}?</h1>
      <div className="ManageCharacterDelete__buttons">
        <button onClick={closeModal}>NO</button>
        <button onClick={deleteCharacter}>YES</button>
      </div>
    </div>
  );
}
