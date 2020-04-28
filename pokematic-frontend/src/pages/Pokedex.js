import React from 'react';
import PokedexList from './pokedex-components/PokedexList'
import Header from '../shared-components/Header'
import TeamCard from '../shared-components/TeamCard';
import './Pokedex.css';
import { connect } from 'react-redux';
import { changeCollection } from '../actions/actions';
import { Typography, Grid, Switch } from '@material-ui/core';

class Pokedex extends React.Component {

  state = {
    teamName: this.props.match.params.teamName,
    pokemonCollection: [],
  }

  componentWillMount() {
    // TEMPORARY TEAM
    this.props.changeCollection([this.props.pokemonData[54], this.props.pokemonData[103]]);
  } 
  
  switchPokemon(event) {

    if (!event.target.checked) { 
      this.setState({
        pokemonCollection: [this.props.pokemonData[54], this.props.pokemonData[103]],
      })

      this.props.changeCollection([this.props.pokemonData[54], this.props.pokemonData[103]]);


    } else {
      this.setState({
        pokemonCollection: this.props.pokemonData,
      })

      this.props.changeCollection(this.props.pokemonData);
      
    }
  };



  render() {

    const handleSwitch = this.switchPokemon.bind(this)

    return (
      <div className="pokedex">

        <div>
          <div className="header">
            <Header currentPage={"/pokedex"} teamName={this.state.teamName}/>
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
          {this.props.pokemonCollection[0] ? <PokedexList pokemonCollection={this.props.pokemonCollection} /> : ""}
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokemonData: state.pokemonData,
    pokemonCollection: state.pokemonCollection,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCollection: (collection) => {
      dispatch(changeCollection(collection))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);