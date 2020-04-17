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
          {/* TODO: change these into separate labels rather than text */}
          {props.pokemonType[props.pokemonNumber] && props.pokemonType[props.pokemonNumber][1][0]}
          {props.pokemonType[props.pokemonNumber] && props.pokemonType[props.pokemonNumber][1][1]}
          </div>
        </div>
    </div>
  );
}

export default PokedexItem;
