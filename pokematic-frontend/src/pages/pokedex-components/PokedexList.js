import React from 'react';
import PokedexItem from './PokedexItem'
import './PokedexList.css'
import { connect } from 'react-redux';
import { addPokemonNames, addPokemonTypes, togglePokemonLoad } from '../../actions/actions'
import * as colors from '../../colors';

class PokedexList extends React.Component {

  state = {
    pokemon: []
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
      this.fetchPokemonTypes(pokemon.url)
    })


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
          {this.state.pokemon.map((pokemonData) => {
            return (
              <div className="grid-item" style={{backgroundColor: colors.fire}}>
                <PokedexItem pokemonNumber={pokemonData[0]} pokemonName={pokemonData[1]} pokemonImage={pokemonData[2]} pokemonType={this.props.pokemonTypes} />
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
    isLoaded: state.isLoaded,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePokemonHasLoaded: () => {
      dispatch(togglePokemonLoad())
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
