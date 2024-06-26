// constants
const GET_USER_CHARACTERS = "character/GET_USER_CHARACTERS";
const CLEAR_USER_CHARACTERS = "character/CLEAR_USER_CHARACTERS";
const CREATE_USER_CHARACTER = "character/CREATE_USER_CHARACTER";
const DELETE_USER_CHARACTER = "character/DELETE_USER_CHARACTER";
const EDIT_USER_CHARACTER = "character/EDIT_USER_CHARACTER";
const GET_BATTLE_CHARACTERS = "character/GET_BATTLE_CHARACTERS";
const BATTLING = "character/BATTLING";

// actions
const actionGetUserCharacters = (characters) => ({
  type: GET_USER_CHARACTERS,
  payload: characters,
});

export const actionClearUserCharacters = () => ({
  type: CLEAR_USER_CHARACTERS,
});

const actionCreateUserCharacter = (character) => ({
  type: CREATE_USER_CHARACTER,
  payload: character,
});

const actionDeleteUserCharacter = (characterID) => ({
  type: DELETE_USER_CHARACTER,
  payload: characterID,
});

const actionEditUserCharacter = (character) => ({
  type: EDIT_USER_CHARACTER,
  payload: character,
});

const actionGetBattleCharacters = (characters) => ({
  type: GET_BATTLE_CHARACTERS,
  payload: characters,
});

export const actionBattling = (characters) => ({
  type: BATTLING,
  payload: characters
});

// thunks

export const thunkGetUserCharacters = () => async (dispatch) => {
  const response = await fetch("/api/characters/getUserCharacters", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();

    let normalized = {};

    for (let character of data.characters) {
      normalized[character.id] = character;
    }
    dispatch(actionGetUserCharacters(normalized));
  }
};

export const thunkCreateUserCharacters = (formData) => async (dispatch) => {
  const response = await fetch("/api/characters/createUserCharacter", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const character = await response.json();
    dispatch(actionCreateUserCharacter(character));
  } else {
    const error = await response.json();
    return error;
  }
};

export const thunkDeleteUserCharacters = (characterID) => async (dispatch) => {
  const response = await fetch(`/api/characters/delete/${characterID}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(actionDeleteUserCharacter(characterID));
    return response;
  } else {
    const error = await response.json();
    return error;
  }
};

export const thunkEditUserCharacters = (formData) => async (dispatch) => {
  const response = await fetch(
    `/api/characters/edit/${formData.get("characterID")}`,
    {
      method: "PATCH",
      body: formData,
    }
  );

  if (response.ok) {
    let updatedCharacter = await response.json();
    dispatch(actionEditUserCharacter(updatedCharacter));
    return response;
  } else {
    const error = await response.json();
    return error;
  }
};

export const thunkGetBattleCharacters = () => async (dispatch) => {
  const response = await fetch("/api/characters/battle");

  if (response.ok) {
    const data = await response.json();

    let normalized = {};

    for (let character of data.battleCharacters) {
      normalized[character.id] = character;
    }
    dispatch(actionGetBattleCharacters(normalized));
  }
};

const initialState = { userCharacters: {}, battleCharacters: {}, battling: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_CHARACTERS:
      return {
        ...state,
        userCharacters: {
          ...state.userCharacters,
          ...action.payload,
        },
      };

    case CLEAR_USER_CHARACTERS:
      return { ...state, userCharacters: {} };

    case CREATE_USER_CHARACTER:
      return {
        ...state,
        userCharacters: {
          ...state.userCharacters,
          [action.payload.id]: action.payload,
        },
      };

    case DELETE_USER_CHARACTER:
      console.log(state);
      console.log("payload", action.payload);
      let newObj = {};
      let oldObj = state.userCharacters;
      for (let characterID in oldObj) {
        if (oldObj[characterID].id !== action.payload) {
          console.log(characterID);
          newObj[characterID] = oldObj[characterID];
        }
      }
      console.log(newObj);
      return { ...state, userCharacters: newObj };

    case EDIT_USER_CHARACTER:
      return {
        ...state,
        userCharacters: {
          ...state.userCharacters,
          [action.payload.id]: action.payload,
        },
      };

    case GET_BATTLE_CHARACTERS:
      return {
        ...state,
        battleCharacters: {
          ...action.payload,
        },
      };
    case BATTLING:
      return {
        ...state,
        battling: action.payload


      }
    default:
      return state;
  }
}
