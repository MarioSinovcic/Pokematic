import React from 'react';
import PokedexItem from './PokedexItem'
import './PokedexList.css'

function PokedexList() {

  // This a temporary solution for rendering all of the pokemon cards
  var fakePokemon = [];
  for (var i = 0; i < 150; i++) {
    fakePokemon.push(i)
  }

  var pokemonToRender = fakePokemon.map(item => <div class="grid-item"><PokedexItem pokemonNumber={item}/></div>)

  return (
    <div className="PokedexList">
        <div class="grid-container">
          {pokemonToRender}
        </div>
    </div>
  );
}

export default PokedexList;
