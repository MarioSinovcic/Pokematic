import React from 'react';
import './PokedexItem.css'

function PokedexItem() {
  return (
    <div className="PokedexItem">
      <div className="pokeball-background"></div>
      {/* <img src={require('../../images/background_pokeball.png')} alt="pokeball" /> */}
      <div className="background-enabler">
        <div className="pokemon-number">
            #007
          </div>
          <div className="pokemon-name">
            Wartortle
          </div>
          <div className="pokemon-image-wrapper">
            <img className="pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png" alt="Wartortle"></img>
          </div>
          <div className="pokemon-type">
            WATER
          </div>
        </div>
    </div>
  );
}

export default PokedexItem;
