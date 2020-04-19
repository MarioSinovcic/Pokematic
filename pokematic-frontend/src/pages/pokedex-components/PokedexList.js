import React from 'react';
import PokedexItem from './PokedexItem'
import './PokedexList.css'
import { connect } from 'react-redux';
import { addPokemonNames, addPokemonTypes, togglePokemonLoad, addPokemonData } from '../../actions/actions'
import PokedexMappingUtil from './PokemonMappingUtil';

class PokedexList extends React.Component {

  getPokemonTypes(pokemonTypesList, pokemonName) {
    const typesArray = pokemonTypesList.find(pokemon =>
      pokemonName === pokemon[0]
    )

    if (typesArray) {
      // Return an array of just the types without the pokemon name
      return typesArray[1];
    }
  }



  render() {
    return (
      <div className="PokedexList">
        <div className="grid-container">
          {this.props.pokemonCollection.map((pokemonData, i) => {

            const pokemonName = pokemonData[1];
            const pokemonTypeList = this.getPokemonTypes(this.props.pokemonTypes, pokemonName);
            
            return (


              <div key={i} className="grid-item" style={{
                backgroundColor: PokedexMappingUtil.mapTypeToBackgroundColors(
                  pokemonTypeList ?
                  // Take the color of second type if it exists because it seems to usually be the main type of the pokemon
                    pokemonTypeList[1] ?
                      pokemonTypeList[1]
                      : pokemonTypeList[0]
                    : ""

                )
              }}>
                <PokedexItem
                  pokemonNumber={pokemonData[0]}
                  pokemonName={pokemonName}
                  pokemonImage={pokemonData[2]}
                  pokemonTypeList={pokemonTypeList} />
              </div>)
          })}

        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    pokemonMap: state.pokemonInfo,
    pokemonTypes: state.pokemonTypes,
    pokemonData: state.pokemonData,
    isLoaded: state.isLoaded,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePokemonHasLoaded: () => {
      dispatch(togglePokemonLoad())
    },
    addPokemonData: (pokemon) => {
      dispatch(addPokemonData(pokemon))
    },
    addPokemon: (pokemon) => {
      dispatch(addPokemonNames(pokemon))
    },
    addPokemonTypes: (pokemonName, pokemonType) => {
      dispatch(addPokemonTypes(pokemonName, pokemonType))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokedexList);
