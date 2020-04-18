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
        console.log(data.results);
      })

    await this.props.pokemonMap.map((pokemon, i) => {
      return (
        this.fetchPokemonTypes(pokemon.url)
      )
    })

    this.props.addPokemonData(this.populatePokemon());
    console.log(this.props.pokemonData);


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



  render() {
    return (
      <div className="PokedexList">
        <div className="grid-container">
          {this.state.pokemon.map((pokemonData, i) => {

            return (


              <div key={i} className="grid-item" style={{
                backgroundColor: PokedexMappingUtil.mapTypeToBackgroundColors(
                  this.props.pokemonTypes[pokemonData[0]] ?
                    this.props.pokemonTypes[pokemonData[0]][1][1] ?
                      this.props.pokemonTypes[pokemonData[0]][1][1]
                      : this.props.pokemonTypes[pokemonData[0]][1][0]
                    : ""

                )
              }}>
                <PokedexItem
                  pokemonNumber={pokemonData[0]}
                  pokemonName={pokemonData[1]}
                  pokemonImage={pokemonData[2]}
                  pokemonType={this.props.pokemonTypes} />
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
