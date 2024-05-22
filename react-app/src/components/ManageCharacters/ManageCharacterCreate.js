import { useDispatch, useSelector } from "react-redux";
import "./ManageCharacterCreate.css";
import { useEffect, useState } from "react";
import { thunkCreateUserCharacters } from "../../store/character";

export default function ManageCharacterCreate() {
  const dispatch = useDispatch();
  const [characterSprite, setCharacterSprite] = useState(null);
  const [characterSpriteUrl, setCharacterSpriteUrl] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [hp, setHp] = useState(0);
  const [armor, setArmor] = useState(0);
  const [damage, setDamage] = useState(0);
  const [weakness, setWeakness] = useState("");
  const [resistance, setResistance] = useState("");
  const [move1Name, setMove1Name] = useState("");
  const [move1Type, setMove1Type] = useState("");
  const [move2Name, setMove2Name] = useState("");
  const [move2Type, setMove2Type] = useState("");
  const [totalPoints, setTotalPoints] = useState(60);
  const [availablePoints, setAvailablePoints] = useState(totalPoints);

  useEffect(() => {
    if (hp == 200) {
      setAvailablePoints(totalPoints);
    } else if (hp == 250) {
      setAvailablePoints(totalPoints - 5);
    } else if (hp == 300) {
      setAvailablePoints(totalPoints - 10);
    } else if (hp == 350) {
      setAvailablePoints(totalPoints - 15);
    } else if (hp == 400) {
      setAvailablePoints(totalPoints - 20);
    } else if (hp == 450) {
      setAvailablePoints(totalPoints - 25);
    } else if (hp == 500) {
      setAvailablePoints(totalPoints - 30);
    } else if (hp == 550) {
      setAvailablePoints(totalPoints - 35);
    } else if (hp == 600) {
      setAvailablePoints(totalPoints - 40);
    }
  }, [hp]);

  useEffect(() => {
    if (armor + damage > availablePoints) {
      setArmor(0);
      setDamage(0);
    }
  }, [armor, damage, availablePoints]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", characterName);
    formData.append("image", characterSprite);
    formData.append("hp", hp);
    formData.append("armor", armor);
    formData.append("damage", damage);
    formData.append("weakness", weakness);
    formData.append("resistance", resistance);
    formData.append("first_move", move1Name);
    formData.append("second_move", move2Name);
    formData.append("first_move_type", move1Type);
    formData.append("second_move_type", move2Type);
    console.log(characterName, characterSprite, hp, armor, damage, weakness, resistance, move1Name, move2Name, move2Type, move1Type)
    dispatch(thunkCreateUserCharacters(formData))
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
      >
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
        </label>

        <div className="create-character__info">
          <div className="create-character__section1">
            <label>
              Character Name:
              <input
                required
                type="text"
                placeholder="Enter a name"
                value={characterName}
                className="create-character__characterName-input"
                onChange={(e) => setCharacterName(e.target.value)}
                maxLength={100}
              />
            </label>
            {characterName.length >= 100 && (
              <span className="create-character__error">
                maximum characters reached
              </span>
            )}
            <label>
              Enter HP(Between 200-600):
              <input
                required

                type="number"
                placeholder="Enter HP(between 200-600)"
                value={hp}
                className="create-character__characterhp-input"
                onChange={(e) => setHp(e.target.value)}
                step={50}
                max={600}
                min={200}
              />
            </label>
            {hp.length > 3 && (
              <span className="create-character__error">
                woah partner, can't have that much HP
              </span>
            )}
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
                min={0}
              />
            </label>
            {armor.length > 2 && (
              <span className="create-character__error">
                are you serious right neow?
              </span>
            )}
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
                min={0}
              />
            </label>
            {damage.length > 2 && (
              <span className="create-character__error">
                are you serious right neow?
              </span>
            )}
          </div>

          <div className="create-character__section3">
            <label for="weakness-select">Choose a Weakness: </label>
            <select
              name="types"
              id="type-select"
              value={weakness}
              onChange={(e) => setWeakness(e.target.value)}
            >
              <option value="">Select a Type</option>
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

            <label for="resistance-select">Choose a Resistance: </label>
            <select
              name="types"
              id="type-select"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
            >
              <option value="">Select a Type</option>
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
          </div>

          <div className="create-character__section4">
            <label for="move1type-select">
              Choose a Type for your First Move:{" "}
            </label>
            <select
              name="types"
              id="type-select"
              value={move1Type}
              onChange={(e) => setMove1Type(e.target.value)}
            >
              <option value="">Select a Type</option>
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
            <input
              required
              type="text"
              placeholder="Enter Move Name for First Move"
              value={move1Name}
              className="create-character__move1name-input"
              onChange={(e) => setMove1Name(e.target.value)}
              maxLength={100}
            />
            {move1Name.length >= 100 && (
              <span className="create-character__error">
                maximum characters reached
              </span>
            )}
            <label for="move1type-select">
              Choose a Type for your Second Move
            </label>
            <select
              name="types"
              id="type-select"
              value={move2Type}
              onChange={(e) => setMove2Type(e.target.value)}
            >
              <option value="">Select a Type</option>
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
            <input
              required
              type="text"
              placeholder="Enter Move Name for Second Move"
              value={move2Name}
              className="create-character__move1name-input"
              onChange={(e) => setMove2Name(e.target.value)}
              maxLength={100}
            />
            {move2Name.length >= 100 && (
              <span className="create-character__error">
                maximum characters reached
              </span>
            )}
          </div>
        <button className="create-character__submit-button"
        type="submit"
        onClick={(e) => handleCreateSubmit(e)}>
            Submit
        </button>
        </div>
      </form>
    </div>
  );
}
