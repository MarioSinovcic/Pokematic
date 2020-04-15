import { ADD_POKEMON_NAMES, ADD_POKEMON_TYPES }  from "./actionTypes";

export function addPokemonNames(pokemonData) {
    return {
        type: ADD_POKEMON_NAMES,
        pokemonData
      }
}

export function addPokemonTypes(pokemonName, pokemonType) {

    return {
        type: ADD_POKEMON_TYPES,
        pokemonName,
        pokemonType
      }
}

