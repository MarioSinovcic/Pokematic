/*
    To run the system in production mdoe, swap the the HOST url to:
        https://pokematicapi.azurewebsites.net/api/

    To run the system without any interation to the API checkout the apiHandler file
*/
// API CALLS 
export const HOST = "https://localhost:5001/api/";

// MODEL ENUM FEILDS 
export const STATUSLIST = ["TODO", "In Progress", "In Review", "Done"];

export const POKEMONTYPES = {
    FIRE: "fire",
    WATER: "water",
    GRASS: "grass",
    POISON: "poison",
    FLYING: "flying",
    BUG: "bug",
    NORMAL: "normal",
    ELECTRIC: "electric",
    GROUND: "ground",
    FAIRY: "fairy",
    FIGHTING: "fighting",
    PSYCHIC: "psychic",
    ROCK: "rock",
    STEEL: "steel",
    ICE: "ice",
    GHOST: "ghost",
    DRAGON: "dragon",
}

