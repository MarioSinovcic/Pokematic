import React from 'react';
import './PokedexItem.css'
import Label from '../board-components/Label';
import * as colors from '../../colors'
import { POKEMONTYPES } from '../../constants';

class PokedexItem extends React.Component{

  constructor(props) {
    super(props);
  }


  mapTypeToColors(pokemonType) {

    switch(pokemonType) {
      case POKEMONTYPES.FIRE:
        return colors.fire;

      case POKEMONTYPES.WATER:
        return colors.water;

      case POKEMONTYPES.ICE:
      return colors.ice;

      case POKEMONTYPES.GRASS:
      return colors.grass;

      case POKEMONTYPES.POISON:
      return colors.poison;

      case POKEMONTYPES.GROUND:
      return colors.ground;

      case POKEMONTYPES.NORMAL:
      return colors.normal;

      case POKEMONTYPES.ELECTRIC:
      return colors.electric;

      case POKEMONTYPES.DRAGON:
      return colors.dragon;

      case POKEMONTYPES.STEEL:
      return colors.steel;

      case POKEMONTYPES.GHOST:
      return colors.ghost;

      case POKEMONTYPES.PSYCHIC:
      return colors.psychic;

      case POKEMONTYPES.FAIRY:
      return colors.fairy;

      case POKEMONTYPES.ROCK:
      return colors.rock;

      case POKEMONTYPES.FLYING:
      return colors.flying;

      case POKEMONTYPES.BUG:
      return colors.bug;

        default:
        return null;
    }
  }

  render() {

    const firstType = this.props.pokemonType[this.props.pokemonNumber] && this.props.pokemonType[this.props.pokemonNumber][1][1];
    const secondType = this.props.pokemonType[this.props.pokemonNumber] && this.props.pokemonType[this.props.pokemonNumber][1][0];
  return (
    <div className="PokedexItem">
      <div className="pokeball-background"></div>
      <div className="background-enabler">
        <div className="pokemon-number">
          #{this.props.pokemonNumber}
        </div>
        <div className="pokemon-name">
          {this.props.pokemonName}
        </div>
        <div className="pokemon-image-wrapper">
          <img className="pokemon-image" src={this.props.pokemonImage} alt=""></img>
        </div>
        <div className="pokemon-type">
          {/* TODO: change these into separate labels rather than text */}
          {firstType ?
            <Label labelText={firstType} color={this.mapTypeToColors(firstType)}/>
            : null}
          <Label labelText={secondType} color={this.mapTypeToColors(secondType)}/>
        </div>
      </div>
    </div>
  );
}
}

export default PokedexItem;
