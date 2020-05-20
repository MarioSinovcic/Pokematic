import React from 'react';
import * as colors from '../../colors'
import { POKEMONTYPES } from '../../api/constants';

class PokedexMappingUtil extends React.Component{


  static mapTypeToLabelColors(pokemonType) {

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

      case POKEMONTYPES.FIGHTING:
      return colors.fighting;

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



  static mapTypeToBackgroundColors(pokemonType) {

    switch(pokemonType) {
      case POKEMONTYPES.FIRE:
        return colors.fireLight;

      case POKEMONTYPES.WATER:
        return colors.waterLight;

      case POKEMONTYPES.ICE:
      return colors.iceLight;

      case POKEMONTYPES.GRASS:
      return colors.grassLight;

      case POKEMONTYPES.POISON:
      return colors.poisonLight;

      case POKEMONTYPES.GROUND:
      return colors.groundLight;

      case POKEMONTYPES.FIGHTING:
      return colors.fightingLight;

      case POKEMONTYPES.NORMAL:
      return colors.normalLight;

      case POKEMONTYPES.ELECTRIC:
      return colors.electricLight;

      case POKEMONTYPES.DRAGON:
      return colors.dragonLight;

      case POKEMONTYPES.STEEL:
      return colors.steelLight;

      case POKEMONTYPES.GHOST:
      return colors.ghostLight;

      case POKEMONTYPES.PSYCHIC:
      return colors.psychicLight;

      case POKEMONTYPES.FAIRY:
      return colors.fairyLight;

      case POKEMONTYPES.ROCK:
      return colors.rockLight;

      case POKEMONTYPES.FLYING:
      return colors.flyingLight;

      case POKEMONTYPES.BUG:
      return colors.bugLight;

        default:
        return "#c4c4c4";
    }
  }

}

export default PokedexMappingUtil;
