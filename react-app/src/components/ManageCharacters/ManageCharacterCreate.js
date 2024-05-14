import { useDispatch, useSelector } from "react-redux";
import "./ManageCharacterCreate.css";
import { useEffect, useState } from "react";

export default function ManageCharacterCreate() {
  const dispatch = useDispatch();
  const [characterSprite, setCharacterSprite] = useState("");
  const [characterSpriteUrl, setCharacterSpriteUrl] = useState(null);
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
  const [pointDetractor, setPointDetractor] = useState(0);
  const [tracker, setTracker] = useState(0);


  useEffect(() => {
    if (hp == 200) {
      setPointDetractor(0);
      setAvailablePoints(totalPoints - pointDetractor);
      setTracker(availablePoints - armor - damage)
    } else if (hp > 200 && hp < 250) {
      setPointDetractor(5);
      setAvailablePoints(totalPoints - pointDetractor);
      setTracker(availablePoints - armor - damage)
    } else if (hp >= 250 && hp < 300) {
      setPointDetractor(10);
      setAvailablePoints(totalPoints - pointDetractor);
      setTracker(availablePoints - armor - damage)
    } else if (hp >= 300 && hp < 350) {
      setPointDetractor(15);
      setAvailablePoints(totalPoints - pointDetractor);
      setTracker(availablePoints - armor - damage)
    } else if (hp >= 350 && hp < 400) {
      setPointDetractor(20);
      setAvailablePoints(totalPoints - pointDetractor);
      setTracker(availablePoints - armor - damage)
    } else if (hp >= 400 && hp < 450) {
      setPointDetractor(25);
      setAvailablePoints(totalPoints - pointDetractor);
      setTracker(availablePoints - armor - damage)
    } else if (hp >= 450 && hp < 500) {
      setPointDetractor(30);
      setAvailablePoints(totalPoints - pointDetractor);
      setTracker(availablePoints - armor - damage)
    } else if (hp >= 500 && hp < 550) {
      setPointDetractor(35);
      setAvailablePoints(totalPoints - pointDetractor);
      setTracker(availablePoints - armor - damage)
    } else if (hp == 600) {
      setPointDetractor(40);
      setAvailablePoints(totalPoints - pointDetractor);
      setTracker(availablePoints - armor - damage)
    }
  }, [hp]);

  useEffect(() => {
    setTracker(availablePoints - armor - damage)
    if (armor + damage > availablePoints) {
      setArmor(0);
      setDamage(0);
    }
  }, [armor, damage]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", characterName);
    formData.append("characterImage", characterSprite);
    formData.append("hp", hp);
    formData.append("armor", armor);
    formData.append("damage", damage);
    formData.append("weakness", weakness);
    formData.append("resistance", resistance);
    formData.append("firstMove", move1Name);
    formData.append("secondMove", move2Name);
    formData.append("firstMoveType", move1Type);
    formData.append("secondMoveType", move2Type);
  };

  const handleNewImage = (e) => {
    let image = e.target.files[0];
    setCharacterSprite(image);
    setCharacterSpriteUrl(URL.createObjectURL(image));
  };

  return (
    <div className="create-character__div">
      <h1 className="create-character__title">Create a Character</h1>
        <form
            className="create-character__form"
            onSubmit={(e) => handleCreateSubmit(e)}
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
                onChange={(e) => handleNewImage}
            />
            </label>

            <div className="create-character__info">
                <div className="create-character__section1">
                 <input
                    required
                    type="text"
                    placeholder="Enter a name"
                    value={characterName}
                    className="create-character__characterName-input"
                    onChange={(e) => setCharacterName(e.target.value)}
                    maxLength={100}
                    />
                    {characterName.length >= 100 && (
                        <span className="create-character__error">
                            maximum characters reached
                        </span>
                    )}
                    <input
                    required
                    type="number"
                    placeholder="Enter HP(between 200-600)"
                    value={hp}
                    className="create-character__characterhp-input"
                    onChange={(e) => setHp(e.target.value)}
                    max={600}
                    min={200}
                    />
                    {hp.length > 3 && (
                        <span className="create-character__error">
                            woah partner, can't have that much HP
                        </span>
                    )}
                </div>

                <div className="create-character__availablepoints">
                    availablePoints: {tracker}
                </div>

                <div className="create-character__section2">

                    <input
                    required
                    type="number"
                    placeholder="Enter armor"
                    value={armor}
                    className="create-character__characterArmor-input"
                    onChange={(e) => setArmor(e.target.value)}
                    maxLength={2}
                    />
                    {armor.length > 2 && (
                        <span className="create-character__error">
                            are you serious right neow?
                        </span>
                    )}

                    <input
                    required
                    type="number"
                    placeholder="Enter damage"
                    value={damage}
                    className="create-character__characterDamage-input"
                    onChange={(e) => setDamage(e.target.value)}
                    maxLength={2}
                    />
                    {damage.length > 2 && (
                        <span className="create-character__error">
                            are you serious right neow?
                        </span>
                    )}
                </div>

                <div className="create-character__section3">
                    <label for="weakness-select">Choose a Weakness</label>
                    <select name="types" id="type-select" value={weakness} onChange={(e) => setWeakness}>
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

                    <label for="resistance-select">Choose a Resistance</label>
                    <select name="types" id="type-select" value={resistance} onChange={(e) => setResistance}>
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
                    <input
                    required
                    type="text"
                    placeholder="Enter Move Name"
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
                    <label for="move1type-select">Choose a Type for your First Move</label>
                    <select name="types" id="type-select" value={move1Type} onChange={(e) => setMove1Type}>
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
                    placeholder="Enter Move Name"
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
                    <label for="move1type-select">Choose a Type for your Second Move</label>
                    <select name="types" id="type-select" value={move2Type} onChange={(e) => setMove2Type}>
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
            </div>
      </form>
    </div>
  );
}
