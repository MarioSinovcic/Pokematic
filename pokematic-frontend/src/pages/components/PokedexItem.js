import React from 'react';
import './PokedexItem.css'

const PokedexItem = props => {
  return (
    <div className="PokedexItem">
      <div className="pokeball-background"></div>
      {/* <img src={require('../../images/background_pokeball.png')} alt="pokeball" /> */}
      <div className="background-enabler">
        <div className="pokemon-number">
            #{props.pokemonNumber}
          </div>
          <div className="pokemon-name">
            Wartortle
          </div>
          <div className="pokemon-image-wrapper">
            <img className="pokemon-image" src={props.pokemonImage} alt="pokemon-picture"></img>
          </div>
          <div className="pokemon-type">
            WATER
          </div>
        </div>
    </div>
  );
}

export default PokedexItem;
