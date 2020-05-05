import React from 'react';
import PokedexItem from './PokedexItem'
import './PokedexList.css'
import { connect } from 'react-redux';
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

            const pokemonTypeList = this.getPokemonTypes(this.props.pokemonTypes, pokemonData.name);
            
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
                  pokemonNumber={pokemonData.number}
                  pokemonName={pokemonData.name}
                  pokemonImage={pokemonData.sprite}
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
    pokemonTypes: state.pokemonTypes,
  };
}

export default connect(mapStateToProps)(PokedexList);
