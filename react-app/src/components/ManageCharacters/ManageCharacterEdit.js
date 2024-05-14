export default function ManageCharacterEdit({ character }) {

    const dispatch = useDispatch()
    const [characterSprite, setCharacterSprite] = useState(character.sprite)
    const [characterSpriteUrl, setCharacterSpriteUrl] = useState(null)
    const [characterName, setCharacterName] = useState(character.name)


    const handleNewImage = async (e) => {
        let image = e.target.files[0];
        setCharacterSprite(image)
        set
    }


  const handleEditSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="manage-character-edit__div">
      <h1 className="manage-character-edit__title">Edit Character Details</h1>
      <form
        className="manage-character-edit__form"
        onSubmit={(e) => handleEditSubmit(e)}
        encType="multipart/form-data">
            <label className="manage-character-edit__img-label">
                <img className="manage-character-edit__image" src={characterSprite} alt="character image" />
                <input
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e) => handleNewImage(e)}
                />
            </label>
        </form>
    </div>
  );
}
