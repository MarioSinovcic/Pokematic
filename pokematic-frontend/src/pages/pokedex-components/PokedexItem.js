import React from 'react';
import './PokedexItem.css'
import Label from '../../shared-components/Label';
import PokemonMappingUtil from './PokemonMappingUtil';

class PokedexItem extends React.Component {

  render() {
    
    const firstType = this.props.pokemonTypeList && this.props.pokemonTypeList[1];
    const secondType = this.props.pokemonTypeList && this.props.pokemonTypeList[0];

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


export default PokedexItem;
