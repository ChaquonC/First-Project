// constants
const GET_USER_CHARACTERS = "character/GET_USER_CHARACTERS"
const CLEAR_USER_CHARACTERS = "character/CLEAR_USER_CHARACTERS"
const CREATE_USER_CHARACTER = "character/CREATE_USER_CHARACTER"

// actions
const actionGetUserCharacters = (characters) => ({
    type: GET_USER_CHARACTERS,
    payload: characters
})

export const actionClearUserCharacters = () => ({
    type: CLEAR_USER_CHARACTERS
})

const actionCreateUserCharacter = (character) => ({
    type: CREATE_USER_CHARACTER,
    payload: character
})


// thunks

export const thunkGetUserCharacters = () => async (dispatch) => {
    const response = await fetch("/api/characters/getUserCharacters", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();

        let normalized = {}

        for (let character of data.characters) {
            normalized[character.id] = character
        }
        dispatch(actionGetUserCharacters(normalized))
    }
}

export const thunkCreateUserCharacters = (formData) => async (dispatch) => {
    const response = await fetch("/api/characters/createUserCharacter", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const data = await response.json();

        console.log(data)
    }
}


const initialState = {userCharacters: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_CHARACTERS:
            return {...state, userCharacters: {
                ...state.userCharacters,
                ...action.payload,
            }};
        case CLEAR_USER_CHARACTERS:
            return {userCharacters: {}}
        default:
            return state;
    }
}
