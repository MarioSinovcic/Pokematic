import { ADD_POKEMON_NAMES } from "../actions/actionTypes";

// default reducer
// Note: You can remove this reducer and create your own reducer

const initialState = {
    pokemon: []
};
  
export default function pokemonReducer(state = initialState, action) {

    switch(action.type) {

      case ADD_POKEMON_NAMES:
      console.log('This was ' + state.pokemon);
        return {
            ...state,
          pokemon: action.pokemonData
        };
      default:
      console.log('Yes');

        return state;
    }
  }