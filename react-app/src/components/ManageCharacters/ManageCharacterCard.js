import "./ManageCharacterCard.css";
import OpenModalButton from "../OpenModalButton";

export default function ManageCharacterCard({ character }) {
  console.log(character);
  return (
    <li key={character.id} className="mcc__li">
      {/* test image until we get aws s3 buckets setup */}
      <img className="mcc__img" src={character.sprite} alt=""/>
      <h1 className="mcc__name">{character.name}</h1>

      <div className="mcc__buttons">
        <OpenModalButton
          // modalComponent={}
          buttonClass={"manageCharacterCard__delete"}
          buttonText={"EDIT"}
        />

        <OpenModalButton
          // modalComponent={}
          buttonText={"DELETE"}
          buttonClass={"manageCharacterCard__delete"}
        />
      </div>
    </li>
  );
}
