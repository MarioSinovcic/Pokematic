import { ADD_POKEMON_NAMES }  from "./actionTypes";

export function addPokemonNames(pokemonData) {

    // action object format being return to a reducer
    return {
        type: ADD_POKEMON_NAMES,
        pokemonData
      }
}

