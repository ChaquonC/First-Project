import { useDispatch } from "react-redux";
import "./ManageCharacterEdit.css";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { thunkEditUserCharacters } from "../../store/character";

export default function ManageCharacterEdit({ character }) {
  const dispatch = useDispatch();
  const [localErrors, setLocalErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});
  const { closeModal } = useModal();
  const [attempted, setAttempted] = useState(false);

  const [characterSprite, setCharacterSprite] = useState(null);
  const [characterSpriteUrl, setCharacterSpriteUrl] = useState(character.sprite);
  const [name, setName] = useState(character.name);
  const [hp, setHP] = useState(character.stats.hp);
  const [armor, setArmor] = useState(character.stats.armorValue);
  const [damage, setDamage] = useState(character.stats.baseDamage);
  const [weakness, setWeakness] = useState(character.stats.weakness);
  const [resistance, setResistance] = useState(character.stats.resistance);
  const [move1Name, setMove1Name] = useState(character.move1.name);
  const [move1Type, setMove1Type] = useState(character.move1.moveType);
  const [move2Name, setMove2Name] = useState(character.move2.name);
  const [move2Type, setMove2Type] = useState(character.move2.moveType);

  const TOTALPOINTS = 60;
  const [availablePoints, setAvailablePoints] = useState(TOTALPOINTS);

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

  useEffect(() => {
    if (armor + damage > availablePoints) {
      setArmor(0);
      setDamage(0);
    }
  }, [armor, damage, availablePoints]);

  useEffect(() => {
    let temp = {};

    if (name.length < 5) {
      temp.name = "Please Make Name Atleast 5 characters";
    }
    if (name.length >= 100) {
      temp.name = "Maximum Name size Reached";
    }
    if (resistance === null) {
      temp.resistance = "Please Select a Resistance";
    }
    if (weakness === null) {
      temp.weakness = "Please Select a Weakness";
    }
    if (move1Name.length < 5) {
      temp.move1Name = "Please make name atleast 5 characters";
    }
    if (move1Type === null) {
      temp.move1Type = "Please Select FIrst Move Type";
    }
    if (move1Name.length >= 100) {
      temp.move1Name = "Maximum name size reached";
    }
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(localErrors).length === 0) {
      const formData = new FormData();

      formData.append("move1ID", character.move1.id)
      formData.append("move2ID", character.move2.id)
      formData.append("characterID", character.id)

      if (name !== character.name) {
        formData.append("name", name);
      }
      if (hp !== character.hp) {
        formData.append("hp", hp);
      }
      if (characterSpriteUrl !== character.sprite) {
        formData.append("sprite", characterSprite)
      }
      if (armor !== character.stats.armorValue) {
        formData.append("armor", armor);
      }
      if (damage !== character.stats.baseDamage) {
        formData.append("damage", damage);
      }
      if (weakness !== character.stats.weakness) {
        formData.append("weakness", weakness);
      }
      if (resistance !== character.stats.resistance) {
        formData.append("resistance", resistance);
      }
      if (move1Name !== character.move1.name) {
        formData.append("firstMoveName", move1Name);
      }
      if (move1Type !== character.move1.moveType) {
        formData.append("firstMoveType", move1Type);
      }
      if (move2Name !== character.move2.name) {
        formData.append("secondMoveName", move2Name);
      }
      if (move2Type !== character.move2.moveType) {
        formData.append("secondMoveType", move2Type);
      }

      let res = await dispatch(thunkEditUserCharacters(formData));

      if (res && res.errors) {
        let temp = {};
        for (let error in res.erros) {
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
    <div className="edit-character__div">
      <h1 className="edit-character__title">Edit Character Details</h1>

      <form
        className="edit-character__form"
        encType="multipart/form-data"
        onSubmit={(e) => handleEditSubmit(e)}
        >
        <label className="edit-character__img-label">
          <img
            className="edit-character__image"
            src={characterSpriteUrl}
            alt=""
          />
          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => handleNewImage(e)}
          />
        </label>

        <div className="edit-character__info">
          <div className="edit-character__section1">
            <label>
              Character Name:
              <input
                required
                type="text"
                placeholder="Enter a name"
                value={name}
                className="edit-character__characterName-input"
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
              {attempted && localErrors.name && (
                <span className="edit-character__errors">
                  {localErrors.name}
                </span>
              )}
              {attempted && apiErrors.name && (
                <span className="edit-character__errors">
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
                className="edit-character__characterhp-input"
                onChange={(e) => setHP(Number(e.target.value))}
                step={50}
                max={600}
                min={200}
              />
              {attempted && localErrors.hp && (
                <span className="edit-character__errors">
                  {localErrors.hp}
                </span>
              )}
              {attempted && apiErrors.hp && (
                <span className="edit-character__errors">{apiErrors.hp}</span>
              )}
            </label>
          </div>

          <div className="edit-character__availablepoints">
            availablePoints: {availablePoints - armor - damage}
          </div>

          <div className="edit-character__section2">
            <label>
              Armor:
              <input
                required
                type="number"
                placeholder="Enter armor"
                value={armor}
                className="edit-character__characterArmor-input"
                onChange={(e) => setArmor(Number(e.target.value))}
                max={60}
                min={5}
              />
              {attempted && localErrors.armor && (
                <span className="edit-character__errors">
                  {localErrors.armor}
                </span>
              )}
              {attempted && apiErrors.armor && (
                <span className="edit-character__errors">
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
                className="edit-character__characterDamage-input"
                onChange={(e) => setDamage(Number(e.target.value))}
                max={60}
                min={5}
              />
              {attempted && localErrors.damage && (
                <span className="edit-character__errors">
                  {localErrors.damage}
                </span>
              )}
              {attempted && apiErrors.damage && (
                <span className="edit-character__errors">
                  {apiErrors.damage}
                </span>
              )}
            </label>
          </div>

          <div className="edit-character__section3">
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
                <span className="edit-character__errors">
                  {localErrors.weakness}
                </span>
              )}
              {attempted && apiErrors.weakness && (
                <span className="edit-character__errors">
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
                <span className="edit-character__errors">
                  {localErrors.resistance}
                </span>
              )}
              {attempted && apiErrors.resistance && (
                <span className="edit-character__errors">
                  {apiErrors.resistance}
                </span>
              )}
            </label>
          </div>

          <div className="edit-character__section4">
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
                <span className="edit-character__errors">
                  {localErrors.move1Type}
                </span>
              )}
              {attempted && apiErrors.move1Type && (
                <span className="edit-character__errors">
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
                className="edit-character__move1name-input"
                onChange={(e) => setMove1Name(e.target.value)}
                maxLength={100}
              />
              {attempted && localErrors.move1Name && (
                <span className="edit-character__errors">
                  {localErrors.move1Name}
                </span>
              )}
              {attempted && apiErrors.move1Name && (
                <span className="edit-character__errors">
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
                <span className="edit-character__errors">
                  {localErrors.move2Type}
                </span>
              )}
              {attempted && apiErrors.move2Type && (
                <span className="edit-character__errors">
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
                className="edit-character__move1name-input"
                onChange={(e) => setMove2Name(e.target.value)}
                maxLength={100}
              />
              {attempted && localErrors.move2Name && (
                <span className="edit-character__errors">
                  {localErrors.move2Name}
                </span>
              )}
              {attempted && apiErrors.move2Name && (
                <span className="edit-character__errors">
                  {apiErrors.move2Name}
                </span>
              )}
            </label>
          </div>

          <button
            className="edit-character__submit-button"
            type="submit"
            onClick={() => setAttempted(true)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
