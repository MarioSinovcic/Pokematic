export const INCREMENT = "INCREMENT";

export const GET_POKEMON_NAMES = "GET_POKEMON_NAMES";
export const GET_POKEMON_TYPES = "GET_POKEMON_TYPES";

export function getPokemonNames(pokemonNames) {
    return {
    type: GET_POKEMON_NAMES,
    pokemonNames
    }
}

export function getPokemonTypes(pokemonNames) {
    return {
    type: GET_POKEMON_NAMES,
    pokemonNames
    }
}