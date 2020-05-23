import * as actionTypes  from "./actionTypes";

export function addPokemonData(pokemonData) {
    return {
        type: actionTypes.ADD_POKEMON_DATA,
        pokemonData
      }
}

export function addPokemonNames(pokemonData) {
    return {
        type: actionTypes.ADD_POKEMON_NAMES,
        pokemonData
      }
}

export function addPokemonTypes(pokemonName, pokemonType) {

    return {
        type: actionTypes.ADD_POKEMON_TYPES,
        pokemonName,
        pokemonType
      }
}

export function togglePokemonLoad() {

    return {
        type: actionTypes.TOGGLE_POKEMON_LOAD,
      }
}

export function toggleCollection(pokemonCollection) {
    
    return {
        type: actionTypes.TOGGLE_COLLECTION,
        pokemonCollection,
    }
}

export function addToCollection(pokemonData) {
    
    return {
        type: actionTypes.ADD_TO_COLLECTION,
        pokemonData,
    }
}

export function setCollection(pokemonData) {
    
    return {
        type: actionTypes.SET_COLLECTION,
        pokemonData,
    }
}

