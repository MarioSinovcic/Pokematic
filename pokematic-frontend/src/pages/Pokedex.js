import React from 'react';
import PokedexList from './pokedex-components/PokedexList'
import Header from '../shared-components/Header'
import TeamCard from '../shared-components/TeamCard';
import './Pokedex.css';
import { connect } from 'react-redux';
import { toggleCollection, setCollection } from '../actions/actions';
import { Typography, Grid, Switch } from '@material-ui/core';
import { getTeamInfo } from '../apiHandler';
import auth0Client from '../Auth0/Auth';

class Pokedex extends React.Component {

  state = {
    teamName: this.props.match.params.teamName,
    pokemonCollection: [],
  }

  componentWillMount() {
    auth0Client.silentAuth();
    this.mapPokemon().then(() => {
      this.props.toggleCollection(this.props.teamPokemon);
      this.setState({
        pokemonCollection: this.props.pokemonCollection,
      })
    });
  } 

  componentDidMount() {
    this.mapPokemon();
  }
  
  switchPokemon(event) {
    if (!event.target.checked) { 
      this.setState({
        pokemonCollection: this.props.teamPokemon,
      })

      this.props.toggleCollection(this.props.teamPokemon);


    } else {
      this.setState({
        pokemonCollection: this.props.pokemonData,
      })

      this.props.toggleCollection(this.props.pokemonData);
      
    }
  };

  // Convert the API pokemon collection from names into objects to store in collection
  async mapPokemon() {
    var apiData = await getTeamInfo(this.state.teamName);
    const teamPokemonNames = apiData.pokemon;

    const teamCollection = [];
    for (let i = 0; i < teamPokemonNames.length; i++) {
        const teamPokemon = teamPokemonNames[i];
        let pokemonToAdd = this.props.pokemonData.find(pokemon => pokemon.name === teamPokemon.toLowerCase())

        teamCollection.push(pokemonToAdd);
    }
    await this.props.setCollection(teamCollection);
}

  render() {

    const handleSwitch = this.switchPokemon.bind(this)
    return (

      <div className="pokedex">

        <div>
          <div className="header">
            <Header currentPage="/pokedex" teamName={this.state.teamName}/>
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
          <TeamCard teamName={this.state.teamName}/>
        </div>
        <div>
          {this.props.pokemonCollection && this.props.pokemonCollection[0] ? <PokedexList pokemonCollection={this.props.pokemonCollection} /> : ""}
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokemonData: state.pokemonData,
    pokemonCollection: state.pokemonCollection,
    teamPokemon: state.teamPokemon,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCollection: (collection) => {
      dispatch(toggleCollection(collection))
    },
    setCollection: (pokemon) => {
      dispatch(setCollection(pokemon))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);