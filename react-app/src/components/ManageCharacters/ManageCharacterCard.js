import "./ManageCharacterCard.css";
import OpenModalButton from "../OpenModalButton";
import ManageCharacterDelete from "./ManageCharacterDelete";
import ManageCharacterEdit from "./ManageCharacterEdit";

export default function ManageCharacterCard({ character }) {
  return (
    <li key={character.id} className="mcc__li">
      {/* test image until we get aws s3 buckets setup */}
      <img className="mcc__img" src={character.sprite} alt=""/>
      <h1 className="mcc__name">{character.name}</h1>

      <div className="mcc__buttons">
        <OpenModalButton
          modalComponent={<ManageCharacterEdit character={character}/>}
          buttonClass={"manageCharacterCard__delete"}
          buttonText={"EDIT"}
        />

        <OpenModalButton
          modalComponent={<ManageCharacterDelete character={character}/>}
          buttonText={"DELETE"}
          buttonClass={"manageCharacterCard__delete"}
        />
      </div>
    </li>
  );
}
