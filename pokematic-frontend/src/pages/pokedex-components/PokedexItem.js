import React from 'react';
import './PokedexItem.css'

class PokedexItem extends React.Component {

  getPokemonTypes(pokemonTypesList) {
    const typesArray = pokemonTypesList.find(pokemon => 
      this.props.pokemonName === pokemon[0]
    )

    if (typesArray) {
      return typesArray[1];
    } 

  }

  render() {

    return (
      <div className="PokedexItem">
        <div className="pokeball-background"></div>
        <div className="background-enabler">
          <div className="pokemon-number">
            #{this.props.pokemonNumber}
          </div>
          <div className="pokemon-name">
            {this.props.pokemonName}
          </div>
          <div className="pokemon-image-wrapper">
            <img className="pokemon-image" src={this.props.pokemonImage} alt=""></img>
          </div>
          <div className="pokemon-type">
          {/* Change these to labels and pass the text in as props */}
            {this.getPokemonTypes(this.props.pokemonType) && this.getPokemonTypes(this.props.pokemonType)[1]}
            {this.getPokemonTypes(this.props.pokemonType) && this.getPokemonTypes(this.props.pokemonType)[0]}
          </div>
        </div>
      </div>
    );
  }
}

export default PokedexItem;
