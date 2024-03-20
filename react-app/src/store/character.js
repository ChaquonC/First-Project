// constants
const GET_USER_CHARACTERS = "character/GET_USER_CHARACTERS"

// actions
const actionGetUserCharacters = (characters) => ({
    type: GET_USER_CHARACTERS,
    payload: characters
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

const initialState = {userCharacters: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_CHARACTERS:
            return {...state, userCharacters: {
                ...state.userCharacters,
                ...action.payload,
            }};
        default:
            return state;
    }
}
