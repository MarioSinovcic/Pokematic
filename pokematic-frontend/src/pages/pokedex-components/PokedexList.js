import React from 'react';
import PokedexItem from './PokedexItem'
import './PokedexList.css'

function PokedexList() {

  //request.open('GET', "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151");
  

  var fakePokemon = [];
  for (var i = 1; i < 152; i++) {

    fakePokemon.push(
      [i,
       "Pokemon "+i, 
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+i+".png",
      ])
  }

  var pokemonToRender = fakePokemon.map((pokemonData) => 
    <div class="grid-item">
      <PokedexItem pokemonNumber={pokemonData[0]} pokemonName={pokemonData[1]} pokemonImage={pokemonData[2]}/>
    </div>)

  return (
    <div className="PokedexList">
        <div class="grid-container">
          {pokemonToRender}
        </div>
    </div>
  );
}

export default PokedexList;
