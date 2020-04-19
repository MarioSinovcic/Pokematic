import React from 'react';
import PokedexList from './pokedex-components/PokedexList'
import Header from '../shared-components/Header'
import TeamCard from '../shared-components/TeamCard';
import './Pokedex.css';
import { connect } from 'react-redux';
import { togglePokemonLoad, addPokemonData, addPokemonNames, addPokemonTypes, changeCollection } from '../actions/actions';
import { Typography, Grid, Switch } from '@material-ui/core';

class Pokedex extends React.Component {

  state = {
    tempTeam: [],
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

    this.props.addPokemonData(this.populatePokemon(this.props.pokemonMap));

    // TEMP
    this.setState({
      tempTeam: [this.props.pokemonData[54], this.props.pokemonData[103]],
      /* Uncomment below to switch between team collection to ALL pokemon
      */
      // pokemonCollection: this.props.pokemonData,
      pokemonCollection: [this.props.pokemonData[54], this.props.pokemonData[103]],
    })

    this.props.changeCollection(this.state.pokemonCollection);

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

  switchPokemon(event) {

    if (!event.target.checked) {
      // TODO: change to 
      this.props.changeCollection([this.props.pokemonData[54], this.props.pokemonData[103]]);

      this.setState({
        pokemonCollection: [this.props.pokemonData[54], this.props.pokemonData[103]],
      })

    } else {
      this.props.changeCollection(this.props.pokemonData);

      this.setState({
        pokemonCollection: this.props.pokemonData,
      })
    }
  };



  render() {

    const handleSwitch = this.switchPokemon.bind(this)

    return (
      <div className="pokedex">

        <div>
          <div className="header">
            <Header />
          </div>
          <div className="filter-shape">
            <div className="left-cut" />
            <div className="filter">
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item className="switch-text">COLLECTION</Grid>
                  <Grid item>
                    <Switch  color="" name="checkedC" onChange={(event) => handleSwitch(event)}/>
                  </Grid>
                  <Grid item className="switch-text">ALL POKEMON</Grid>
                </Grid>
              </Typography>
          </div>
          <div className="right-cut" />
        </div>
      </div>
      <div className="team-card">
        <TeamCard />
      </div>
      <div>
        {this.props.pokemonCollection[0] ? <PokedexList pokemonCollection={this.props.pokemonCollection} /> : ""}
      </div>
      <div>
        {/* Team Status */}
      </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokemonMap: state.pokemonURL,
    pokemonTypes: state.pokemonTypes,
    pokemonData: state.pokemonData,
    isLoaded: state.isLoaded,
    pokemonCollection: state.pokemonCollection,
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
    },
    changeCollection: (collection) => {
      dispatch(changeCollection(collection))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);