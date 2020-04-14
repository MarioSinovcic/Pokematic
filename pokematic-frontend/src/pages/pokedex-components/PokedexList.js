import React from 'react';
import PokedexItem from './PokedexItem'
import './PokedexList.css'
import { connect } from 'react-redux';
import { addPokemonNames } from '../../actions/actions'

class PokedexList extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    pokemon: []
  }

  componentWillMount() {
    this.fetchPokemonData();
  }


  async fetchPokemonData() {

    // Get a list of pokemon Names and their URLs
    await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
      .then(response => response.json())
      .then(data => {
        this.props.addPokemon(data.results);
      })

    console.log("we are done");
    this.setState({
      pokemon: this.populatePokemon()
    })
  }

  populatePokemon() {

    var populatedPokemon = []

    //   this.populatedPokemon.push(
    //     [i,
    //       this.props.pokemonMap[i] && this.props.pokemonMap[i].name,
    //       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (i + 1) + ".png",
    //     ])

    //     return populatedPokemon;
    // }

    this.props.pokemonMap.map((pokemonData, i) => {
      return(
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
            console.log(pokemonData);

            return (
              <div className="grid-item">
                <PokedexItem pokemonNumber={pokemonData[0]} pokemonName={pokemonData[1]} pokemonImage={pokemonData[2]} />
              </div>)
          })}

        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    pokemonMap: state.pokemon
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPokemon: (pokemon) => {
      dispatch(addPokemonNames(pokemon))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokedexList);
