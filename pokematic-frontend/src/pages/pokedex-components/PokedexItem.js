import React from 'react';
import './PokedexItem.css'

const PokedexItem = props => {
  return (
    <div className="PokedexItem">
      <div className="pokeball-background"></div>
      <div className="background-enabler">
        <div className="pokemon-number">
            #{props.pokemonNumber}
          </div>
          <div className="pokemon-name">
            {props.pokemonName}
          </div>
          <div className="pokemon-image-wrapper">
            <img className="pokemon-image" src={props.pokemonImage} alt=""></img>
          </div>
          <div className="pokemon-type">
            WATER
          </div>
        </div>
    </div>
  );
}

export default PokedexItem;
