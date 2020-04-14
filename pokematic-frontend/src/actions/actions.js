import { GET_POKEMON_NAMES, ADD_POKEMON_NAMES }  from "./actionTypes";


// default function to display redux action format
export function getPokemonNames() {

    // action object format being return to a reducer
    return {
        type: GET_POKEMON_NAMES
      }
}

export function addPokemonNames(pokemonData) {

    // action object format being return to a reducer
    return {
        type: ADD_POKEMON_NAMES,
        pokemonData
      }
}

