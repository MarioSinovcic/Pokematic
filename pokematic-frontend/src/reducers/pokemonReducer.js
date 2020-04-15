import { ADD_POKEMON_NAMES, ADD_POKEMON_TYPES } from "../actions/actionTypes";

// default reducer
// Note: You can remove this reducer and create your own reducer

const initialState = {
  pokemonInfo: [],
  pokemonTypes: []
};

export default function pokemonReducer(state = initialState, action) {

  switch (action.type) {

    // Stores pokemon with [name, URL of their details (for further API call)]
    case ADD_POKEMON_NAMES:
      return {
        ...state,
        pokemonInfo: action.pokemonData
      };

      // Stores pokemon types as [pokemonName, array of pokemonTypes]
      // To get the name of a pokemon's type , use pokemonTypes[pokemonNum][1][0] and pokemonTypes[pokemonNum][1][1] 
      // TODO: remove the name of pokemon from the pokemon types but only if we can map names to pokemon numbers.
    case ADD_POKEMON_TYPES:
      return {
        ...state,
        pokemonTypes: [...state.pokemonTypes, [action.pokemonName, action.pokemonType]]
      };

    default:
      return state;
  }
}