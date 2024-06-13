import "./CharacterInfoCard.css"
export default function CharacterInfoCard({ character }) {
  console.log(character);
  const name = character ? character.name : "Please select a character";
  const sprite = character ? character.sprite : "https://fake-mon.s3.us-east-2.amazonaws.com/question+mark.png";
  const hp = character ? character.stats.hp : "?";
  const armor = character
    ? character.stats.armorValue
    : "?";
  const damage = character
    ? character.stats.baseDamage
    : "?";
  const weakness = character
    ? character.stats.weakness
    : "?";
  const resistance = character
    ? character.stats.resistance
    : "?";
  const move1 = character ? character.move1.name : "?";
  const move2 = character ? character.move2.name : "?";
  return (
    <div className="character-info-card__div">
      <h1 className="character-info-card__name">{name}</h1>
      <img className="character-info-card__image" src={sprite} alt="" />
        <h2>HP: {hp}</h2>
      <div className="character-info-card__info">
        <h3>Armor: {armor}</h3>
        <h3>Damage: {damage}</h3>
        <h3>Weakness: {weakness}</h3>
        <h3>Resistance: {resistance}</h3>
      </div>
        <h3 className="character-info-card__moves">
          Moves: {move1} & {move2}
        </h3>
    </div>
  );
}
