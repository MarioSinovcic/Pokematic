import { getTeamInfo } from './teams';
import { updateTeam } from './teams';

export async function fetchPokemonData() {

  var results;

  // Get a list of pokemon Names and their URLs
  await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(response => response.json())
    .then(data => {
      results = data.results;
    })

  return results;
}

export async function fetchPokemonTypes(pokemonURL) {

  var apiData;

  await fetch(pokemonURL)
    .then(response => response.json())
    .then(data => {
      apiData = {
        name: data.name,
        types: [data.types[0].type.name, (data.types[1] && data.types[1].type.name)],
      }
    })

    return apiData;
}

export async function saveTeamCollection(newPokemon, teamName) {
      var apiData = await getTeamInfo(teamName);
      const updatedTeam = {
          pokemon: apiData.pokemon.unshift(newPokemon),
          ...apiData,
      };
      await updateTeam(updatedTeam, teamName);
  }
