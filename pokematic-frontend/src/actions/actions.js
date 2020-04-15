import { ADD_POKEMON_NAMES, ADD_POKEMON_TYPES }  from "./actionTypes";

export function addPokemonNames(pokemonData) {

    // action object format being return to a reducer
    return {
        type: ADD_POKEMON_NAMES,
        pokemonData
      }
}

export function addPokemonTypes(pokemonName, pokemonType) {

    // action object format being return to a reducer
    return {
        type: ADD_POKEMON_TYPES,
        pokemonName,
        pokemonType
      }
}

