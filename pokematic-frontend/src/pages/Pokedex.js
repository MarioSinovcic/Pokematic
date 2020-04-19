import React from 'react';
import PokedexList from './pokedex-components/PokedexList'
import Header from '../shared-components/Header'
import TeamCard from '../shared-components/TeamCard';
import './Pokedex.css';
import { connect } from 'react-redux';
import { togglePokemonLoad, addPokemonData, addPokemonNames, addPokemonTypes } from '../actions/actions';

class Pokedex extends React.Component {

  state = {
    pokemonCollection: [],
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
    this.props.addPokemonData(this.populatePokemon(this.props.pokemonMap));

    // TEMP
    this.setState({
      /* Uncomment below to switch between team collection to ALL pokemon
      */
      pokemonCollection: this.props.pokemonData,
      // pokemonCollection: [this.props.pokemonData[54], this.props.pokemonData[103]],
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

  populatePokemon(pokemonCollection) {
    var populatedPokemon = []
    pokemonCollection.map((pokemonData, i) => {
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
    console.log(this.state.pokemonCollection);

    return (
      <div className="Pokedex">

        <div>
          <Header />
        </div>
        <div className="TeamCard">
          <TeamCard />
        </div>
        <div>
          {this.state.pokemonCollection[0] ? <PokedexList pokemonCollection={this.state.pokemonCollection} /> : ""}
        </div>
        <div>
          {/* Team Status */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);