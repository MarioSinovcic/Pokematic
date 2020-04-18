import React from 'react';
import './PokedexItem.css'
import Label from '../board-components/Label';
import PokemonMappingUtil from './PokemonMappingUtil';

class PokedexItem extends React.Component {

  getPokemonTypes(pokemonTypesList) {
    const typesArray = pokemonTypesList.find(pokemon => 
      this.props.pokemonName === pokemon[0]
    )

    if (typesArray) {
      return typesArray[1];
    } 

  }

  render() {
    
    const firstType = this.getPokemonTypes(this.props.pokemonType) && this.getPokemonTypes(this.props.pokemonType)[1];
    const secondType = this.getPokemonTypes(this.props.pokemonType) && this.getPokemonTypes(this.props.pokemonType)[0]

    return (
      <div className="PokedexItem">
        <div className="pokeball-background"></div>
        <div className="background-enabler">
          <div className="pokemon-number">
            #{this.props.pokemonNumber + 1}
          </div>
          <div className="pokemon-name">
            {this.props.pokemonName}
          </div>
          <div className="pokemon-image-wrapper">
            <img className="pokemon-image" src={this.props.pokemonImage} alt=""></img>
          </div>
          <div className="pokemon-type">
         {firstType ?
            <Label labelText={firstType} color={PokemonMappingUtil.mapTypeToLabelColors(firstType)}/>
            : null}
          <Label labelText={secondType} color={PokemonMappingUtil.mapTypeToLabelColors(secondType)}/>
          </div>
        </div>
      </div>
    );
  }

}
}

export default PokedexItem;
