import React from 'react';
import PokedexList from './pokedex-components/PokedexList'
import Header from '../shared-components/Header'
import TeamCard from '../shared-components/TeamCard';
import './Pokedex.css';
import { connect } from 'react-redux';
import { togglePokemonLoad, addPokemonData, addPokemonNames, addPokemonTypes, changeCollection } from '../actions/actions';
import { Typography, Grid, Switch } from '@material-ui/core';
import { fetchPokemonData, fetchPokemonTypes } from '../apiHandler';

class Pokedex extends React.Component {

  state = {
    tempTeam: [],
    pokemonCollection: [],
  }

  componentWillMount() {
    if (!this.props.isLoaded) {
      this.getPokemonData();
      this.props.togglePokemonHasLoaded();
    }
  }

  async getPokemonData() {

    // Get a list of pokemon Names and their URLs
    const results = await fetchPokemonData();
    this.props.addPokemon(results);

    await this.props.pokemonMap.map((pokemon, i) => {
        const getTypes = fetchPokemonTypes(pokemon.url);
        return (
        getTypes.then((data) => {
          this.props.addPokemonTypes(data.name, data.types);
        }));
    })

    this.props.addPokemonData(this.populatePokemon(this.props.pokemonMap));

    this.setState({
      //TEMP
      tempTeam: [this.props.pokemonData[54], this.props.pokemonData[103]],
      
      /* Uncomment below to switch between team collection to ALL pokemon as default
      */
      // pokemonCollection: this.props.pokemonData,
      pokemonCollection: [this.props.pokemonData[54], this.props.pokemonData[103]],
    })

    this.props.changeCollection(this.state.pokemonCollection);

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
                    <Switch
                      color=""
                      name="checkedC"
                      onChange={(event) => handleSwitch(event)}
                      checked={this.props.pokemonCollection === this.props.pokemonData} />
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