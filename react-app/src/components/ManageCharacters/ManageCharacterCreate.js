import { useDispatch } from "react-redux";
import "./ManageCharacterCreate.css";
import { useEffect, useState } from "react";
import { thunkCreateUserCharacters } from "../../store/character";
import { useModal } from "../../context/Modal";

export default function ManageCharacterCreate() {
  const TOTALPOINTS = 60;

  const dispatch = useDispatch();

  const [characterSprite, setCharacterSprite] = useState(null);
  const [characterSpriteUrl, setCharacterSpriteUrl] = useState("");
  const [name, setName] = useState("");
  const [hp, setHp] = useState(200);
  const [armor, setArmor] = useState(5);
  const [damage, setDamage] = useState(5);

  const [weakness, setWeakness] = useState(null);
  const [resistance, setResistance] = useState(null);

  const [move1Name, setMove1Name] = useState("");
  const [move1Type, setMove1Type] = useState(null);
  const [move2Name, setMove2Name] = useState("");
  const [move2Type, setMove2Type] = useState(null);

  const [availablePoints, setAvailablePoints] = useState(TOTALPOINTS);
  const { closeModal } = useModal();
  const [localErrors, setLocalErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (hp === 200) {
      setAvailablePoints(TOTALPOINTS);
    } else if (hp === 250) {
      setAvailablePoints(TOTALPOINTS - 5);
    } else if (hp === 300) {
      setAvailablePoints(TOTALPOINTS - 10);
    } else if (hp === 350) {
      setAvailablePoints(TOTALPOINTS - 15);
    } else if (hp === 400) {
      setAvailablePoints(TOTALPOINTS - 20);
    } else if (hp === 450) {
      setAvailablePoints(TOTALPOINTS - 25);
    } else if (hp === 500) {
      setAvailablePoints(TOTALPOINTS - 30);
    } else if (hp === 550) {
      setAvailablePoints(TOTALPOINTS - 35);
    } else if (hp === 600) {
      setAvailablePoints(TOTALPOINTS - 40);
    }
  }, [hp]);

  useEffect(() => {
    if (armor + damage > availablePoints) {
      setArmor(0);
      setDamage(0);
    }
  }, [armor, damage, availablePoints]);

  //Big Validator useEffect make sure values are valid
  useEffect(() => {
    let temp = {};

    //Character
    if (name.length < 5) {
      temp.name = "Please Make Name Atleast 5 characters";
    }
    if (name.length >= 100) {
      temp.name = "Maximum Name size Reached";
    }

    //Stats
    if (resistance === null) {
      temp.resistance = "Please Select a Resistance";
    }
    if (weakness === null) {
      temp.weakness = "Please Select a Weakness";
    }

    //Move 1 Field
    if (move1Name.length < 5) {
      temp.move1Name = "Please make name atleast 5 characters";
    }
    if (move1Type === null) {
      temp.move1Type = "Please Select FIrst Move Type";
    }
    if (move1Name.length >= 100) {
      temp.move1Name = "Maximum name size reached";
    }

    //Move 2 Field
    if (move2Type === null) {
      temp.move2Type = "Please Select Second Move Type";
    }
    if (move2Name.length < 5) {
      temp.move2Name = "Please make name atleast 5 characters";
    }
    if (move2Name.length >= 100) {
      temp.move2Name = "Maximum name size reached";
    }

    console.log("TEMPPPPP", temp);
    setLocalErrors(temp);
  }, [
    name,
    hp,
    armor,
    damage,
    weakness,
    resistance,
    move1Name,
    move2Name,
    move1Type,
    move2Type,
  ]);
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    //only attempt to make an api request if the form has no errors
    if (Object.values(localErrors).length === 0) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("sprite", characterSprite);
      formData.append("hp", hp);
      formData.append("armor", armor);
      formData.append("damage", damage);
      formData.append("weakness", weakness);
      formData.append("resistance", resistance);
      formData.append("firstMoveName", move1Name);
      formData.append("firstMoveType", move1Type);
      formData.append("secondMoveName", move2Name);
      formData.append("secondMoveType", move2Type);

      let res = await dispatch(thunkCreateUserCharacters(formData));

      if (res && res.errors) {
        let temp = {};
        for (let error in res.errors) {
          temp[error] = res.errors[error];
        }

        setApiErrors(temp);
        console.log(apiErrors);
      } else {
        closeModal();
      }
    }
  };

  const handleNewImage = async (e) => {
    let image = e.target.files[0];
    setCharacterSprite(image);
    setCharacterSpriteUrl(URL.createObjectURL(image));
  };

  return (
    <div className="create-character__div">
      <h1 className="create-character__title">Create a Character</h1>

      <form
        className="create-character__form"
        encType="multipart/form-data"
        onSubmit={(e) => handleCreateSubmit(e)}>
        <label className="create-character__img-label">
          <img
            className="create-character__image"
            src={characterSpriteUrl}
            alt=""
          />
          <input
            required
            type="file"
            accept=".png, .jpeg, .jpg, .webp"
            onChange={(e) => handleNewImage(e)}
          />
          {attempted && localErrors.sprite && (
            <span className="create-character__errors">
              {localErrors.sprite}
            </span>
          )}
          {attempted && apiErrors.sprite && (
            <span className="create-character__errors">{apiErrors.sprite}</span>
          )}
        </label>

        <div className="create-character__info">
          <div className="create-character__section1">
            <label>
              Character Name:
              <input
                required
                type="text"
                placeholder="Enter a name"
                value={name}
                className="create-character__characterName-input"
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
              {attempted && localErrors.name && (
                <span className="create-character__errors">
                  {localErrors.name}
                </span>
              )}
              {attempted && apiErrors.name && (
                <span className="create-character__errors">
                  {apiErrors.name}
                </span>
              )}
            </label>

            <label>
              Enter HP(Between 200-600):
              <input
                required
                type="number"
                placeholder="Enter HP(between 200-600)"
                value={hp}
                className="create-character__characterhp-input"
                onChange={(e) => setHp(Number(e.target.value))}
                step={50}
                max={600}
                min={200}
              />
              {attempted && localErrors.hp && (
                <span className="create-character__errors">
                  {localErrors.hp}
                </span>
              )}
              {attempted && apiErrors.hp && (
                <span className="create-character__errors">{apiErrors.hp}</span>
              )}
            </label>
          </div>

          <div className="create-character__availablepoints">
            availablePoints: {availablePoints - armor - damage}
          </div>

          <div className="create-character__section2">
            <label>
              Armor:
              <input
                required
                type="number"
                placeholder="Enter armor"
                value={armor}
                className="create-character__characterArmor-input"
                onChange={(e) => setArmor(Number(e.target.value))}
                max={60}
                min={5}
              />
              {attempted && localErrors.armor && (
                <span className="create-character__errors">
                  {localErrors.armor}
                </span>
              )}
              {attempted && apiErrors.armor && (
                <span className="create-character__errors">
                  {apiErrors.armor}
                </span>
              )}
            </label>

            <label>
              Damage:
              <input
                required
                type="number"
                placeholder="Enter damage"
                value={damage}
                className="create-character__characterDamage-input"
                onChange={(e) => setDamage(Number(e.target.value))}
                max={60}
                min={5}
              />
              {attempted && localErrors.damage && (
                <span className="create-character__errors">
                  {localErrors.damage}
                </span>
              )}
              {attempted && apiErrors.damage && (
                <span className="create-character__errors">
                  {apiErrors.damage}
                </span>
              )}
            </label>
          </div>

          <div className="create-character__section3">
            <label for="weakness-select">
              Choose a Weakness:
              <select
                name="types"
                id="type-select"
                value={weakness}
                onChange={(e) => setWeakness(e.target.value)}>
                <option value={null}>Select a Type</option>
                <option value="fire">Fire</option>
                <option value="ice">Ice</option>
                <option value="water">Water</option>
                <option value="earth">Earth</option>
                <option value="wind">Wind</option>
                <option value="electric">Electric</option>
                <option value="slash">Slash</option>
                <option value="gun">Gun</option>
                <option value="bash">Bash</option>
                <option value="consume">Consume</option>
              </select>
              {attempted && localErrors.weakness && (
                <span className="create-character__errors">
                  {localErrors.weakness}
                </span>
              )}
              {attempted && apiErrors.weakness && (
                <span className="create-character__errors">
                  {apiErrors.weakness}
                </span>
              )}
            </label>

            <label for="resistance-select">
              Choose a Resistance:
              <select
                name="types"
                id="type-select"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}>
                <option value={null}>Select a Type</option>
                <option value="fire">Fire</option>
                <option value="ice">Ice</option>
                <option value="water">Water</option>
                <option value="earth">Earth</option>
                <option value="wind">Wind</option>
                <option value="electric">Electric</option>
                <option value="slash">Slash</option>
                <option value="gun">Gun</option>
                <option value="bash">Bash</option>
                <option value="consume">Consume</option>
              </select>
              {attempted && localErrors.resistance && (
                <span className="create-character__errors">
                  {localErrors.resistance}
                </span>
              )}
              {attempted && apiErrors.resistance && (
                <span className="create-character__errors">
                  {apiErrors.resistance}
                </span>
              )}
            </label>
          </div>

          <div className="create-character__section4">
            <label for="move1type-select">
              First Move Type:
              <select
                name="types"
                id="type-select"
                value={move1Type}
                onChange={(e) => setMove1Type(e.target.value)}>
                <option value={null}>Select a Type</option>
                <option value="fire">Fire</option>
                <option value="ice">Ice</option>
                <option value="water">Water</option>
                <option value="earth">Earth</option>
                <option value="wind">Wind</option>
                <option value="electric">Electric</option>
                <option value="slash">Slash</option>
                <option value="gun">Gun</option>
                <option value="bash">Bash</option>
                <option value="consume">Consume</option>
              </select>
              {attempted && localErrors.move1Type && (
                <span className="create-character__errors">
                  {localErrors.move1Type}
                </span>
              )}
              {attempted && apiErrors.move1Type && (
                <span className="create-character__errors">
                  {apiErrors.move1Type}
                </span>
              )}
            </label>

            <label>
              First Move Name:
              <input
                required
                type="text"
                placeholder="Move Name"
                value={move1Name}
                className="create-character__move1name-input"
                onChange={(e) => setMove1Name(e.target.value)}
                maxLength={100}
              />
              {attempted && localErrors.move1Name && (
                <span className="create-character__errors">
                  {localErrors.move1Name}
                </span>
              )}
              {attempted && apiErrors.move1Name && (
                <span className="create-character__errors">
                  {apiErrors.move1Name}
                </span>
              )}
            </label>

            <label for="move2type-select">
              Second Move Type:
              <select
                name="types"
                id="type-select"
                value={move2Type}
                onChange={(e) => setMove2Type(e.target.value)}>
                <option value={null}>Select a Type</option>
                <option value="fire">Fire</option>
                <option value="ice">Ice</option>
                <option value="water">Water</option>
                <option value="earth">Earth</option>
                <option value="wind">Wind</option>
                <option value="electric">Electric</option>
                <option value="slash">Slash</option>
                <option value="gun">Gun</option>
                <option value="bash">Bash</option>
                <option value="consume">Consume</option>
              </select>
              {attempted && localErrors.move2Type && (
                <span className="create-character__errors">
                  {localErrors.move2Type}
                </span>
              )}
              {attempted && apiErrors.move2Type && (
                <span className="create-character__errors">
                  {apiErrors.move2Type}
                </span>
              )}
            </label>

            <label>
              Second Move Name:
              <input
                required
                type="text"
                placeholder="Move Name"
                value={move2Name}
                className="create-character__move1name-input"
                onChange={(e) => setMove2Name(e.target.value)}
                maxLength={100}
              />
              {attempted && localErrors.move2Name && (
                <span className="create-character__errors">
                  {localErrors.move2Name}
                </span>
              )}
              {attempted && apiErrors.move2Name && (
                <span className="create-character__errors">
                  {apiErrors.move2Name}
                </span>
              )}
            </label>
          </div>

          <button
            className="create-character__submit-button"
            type="submit"
            onClick={() => setAttempted(true)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
