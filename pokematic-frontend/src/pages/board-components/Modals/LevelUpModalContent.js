import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import "./TaskModalContent.css"
import "./LevelUpModalContent.css"

class LevelUpModalContent extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            showReward: false,
            pokemonReward: [],
            newLevel: 21,
        }
    }

    componentDidMount() {
        const newPokemonReward = this.generatePokemon();

        // TODO: call API to add this pokemon to the team's collection so it can be displayed in the pokedex
        // eg. apiHandler.addToCollection(newPokemonReward)

        this.setState({
            pokemonReward: newPokemonReward,
        });
    }

    generatePokemon(){
        const randomNum = Math.floor(Math.random() * 151);
        const randomPokemon = this.props.pokemonData[randomNum];

        const pokemon = {
            name: randomPokemon[1],
            number: randomPokemon[0]+1,
        }
        return pokemon;
    }


    render() {
        return (
            <div className="pokemon-modal-content">
                <div className="blocks">
                    <div className="new-level">LV. {this.state.newLevel}</div>
                    <div className="pokemon-modal-title">
                        {!this.state.showReward ? "Level Up!" : this.state.rewardName}
                    </div>
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <div className="pokeball"><img src="/images/pokeballPrize.png" alt="prize" className="pokeball hidden" /></div>
                            </div>
                            <div class="flip-card-back">
                            <div className="pokeball">
                            <div className="reward-circle pokeball">
                            <div className="pokemon-reward-name">{this.state.pokemonReward.name}
                                    </div>
                                    <img className="pokemon-image pokemon-reward" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.state.pokemonReward.number+".png"} alt="newPokemon"></img>

                            </div>
                            <div className="action-button-container">
                                <Link to={"/pokedex/"+this.props.teamName} replace style={{ textDecoration: 'none' }} >
                                    <Button className="reward-button">View Collection</Button>
                                </Link>
                                <Button className="reward-button" onClick={this.props.handleClose}>Done</Button>
                            </div>

                        </div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
  export default LevelUpModalContent