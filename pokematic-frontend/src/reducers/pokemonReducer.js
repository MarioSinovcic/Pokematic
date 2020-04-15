import { ADD_POKEMON_NAMES, ADD_POKEMON_TYPES } from "../actions/actionTypes";

// default reducer
// Note: You can remove this reducer and create your own reducer

const initialState = {
  pokemonInfo: [],
  pokemonTypes: []
};

export default function pokemonReducer(state = initialState, action) {

  switch (action.type) {

    case ADD_POKEMON_NAMES:
      return {
        ...state,
        pokemonInfo: action.pokemonData
      };

      // Stores pokemon types as [pokemonName, array of pokemonTypes]
    case ADD_POKEMON_TYPES:
      return {
        ...state,
        pokemonTypes: [...state.pokemonTypes, [action.pokemonName, action.pokemonType]]
      };

    default:
      return state;
  }
}