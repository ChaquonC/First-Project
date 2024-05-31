

// pass in character from charactercard to delete function
// prompt user to make sure they wanna delete ("are you sure you wanna delete {specific character name}")
//

import { useModal } from "../../context/Modal";

export default function ManageCharacterDelete({ character }) {
    const { closeModal } = useModal()

    const deleteCharacter =  async () => {

    let res = await dispatch(thunkDeleteUserCharacters(character.id));

    if (res.ok) {
        closeModal()
    }

    }


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
