import React from 'react';
import PokedexItem from './PokedexItem'
import './PokedexList.css'
import { connect } from 'react-redux';
import { addPokemonNames, addPokemonTypes, togglePokemonLoad, addPokemonData } from '../../actions/actions'
import PokedexMappingUtil from './PokemonMappingUtil';

class PokedexList extends React.Component {

  state = {
    pokemon: this.props.pokemonData || [],
  }

  componentWillMount() {
    if (!this.props.isLoaded) {
      this.fetchPokemonData();
      this.props.togglePokemonHasLoaded();
    }
  }


  async fetchPokemonData() {

    // Get a list of pokemon Names and their URLs
    await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
      .then(response => response.json())
      .then(data => {
        this.props.addPokemon(data.results);
      })

    await this.props.pokemonMap.map((pokemon, i) => {
      return (
        this.fetchPokemonTypes(pokemon.url)
      )
    })

    // Add data to Redux Store
    this.props.addPokemonData(this.populatePokemon());


    this.setState({
      pokemon: this.populatePokemon()
    })
  }

  async fetchPokemonTypes(pokemonURL) {
    await fetch(pokemonURL)
      .then(response => response.json())
      .then(data => {
        const name = data.name;
        const types = [data.types[0].type.name, (data.types[1] && data.types[1].type.name)];
        this.props.addPokemonTypes(name, types);
      })
  }

  populatePokemon() {

    var populatedPokemon = []

    this.props.pokemonMap.map((pokemonData, i) => {
      return (
        populatedPokemon.push(
          [i,
            pokemonData && pokemonData.name,
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (i + 1) + ".png",
          ])
      );
    })
    return populatedPokemon;
  }
  

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
          {this.state.pokemon.map((pokemonData, i) => {

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
