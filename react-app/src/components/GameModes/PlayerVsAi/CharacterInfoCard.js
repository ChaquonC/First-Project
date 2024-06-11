export default function CharacterInfoCard(character) {
    console.log(character)
  const name = character ? character.name : "select character";
  const sprite = character.sprite;
  const hp = character.stats.hp;
  const armor = character.stats.armorValue;
  const damage = character.stats.baseDamae;
  const weakness = character.stats.weakness;
  const resistance = character.stats.resistance;
  const move1 = character.move1;
  const move2 = character.move2;
  if (character) {
    return (
        <h1>Keep Yourself Safe</h1>
    );
  } else {

      return (
        <div className="character-info-card__div">
          <h3>{name}</h3>
          <img className="character-info-card__image" src={sprite} alt="" />
          <div className="character-info-card__info">
            <h3>Armor: {armor}</h3>
            <h3>Damage: {damage}</h3>
            <h3></h3>
          </div>

        </div>
      );
  }
}
