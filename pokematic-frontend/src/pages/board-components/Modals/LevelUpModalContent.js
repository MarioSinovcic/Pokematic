import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { addToCollection } from '../../../actions/actions';
import { saveTeamCollection } from '../../../api/pokemon';
import "./TaskModalContent.css"
import "./LevelUpModalContent.css"

class LevelUpModalContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showReward: false,
            pokemonReward: [],
        }
    }

    componentDidMount() {
        const audio = document.getElementsByClassName("audio-element")[0];
        audio.play();

        const newPokemonReward = this.generatePokemon();

        this.setState({
            pokemonReward: newPokemonReward,
        });

        saveTeamCollection(newPokemonReward.name, this.props.teamName);
    }

    generatePokemon() {
        const randomNum = Math.floor(Math.random() * 151);
        const randomPokemon = this.props.pokemonData[randomNum];
        this.props.addToCollection(randomPokemon.name);
        const pokemon = {
            name: randomPokemon.name,
            number: randomPokemon.number + 1,
        }
        return pokemon;
    }


    render() {
        return (
            <div className="pokemon-modal-content">
                <audio className="audio-element">
                    <source src="/sounds/lvlup.wav"></source>
                </audio>
                <div className="blocks">
                    <div className="new-level">LV. {this.props.newTeamLevel}</div>
                    <div className="pokemon-modal-title">
                        {!this.state.showReward ? "Level Up!" : this.state.rewardName}
                    </div>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <div className="pokeball"><img src="/images/pokeballPrize.png" alt="prize" className="pokeball hidden" /></div>
                            </div>
                            <div className="flip-card-back">
                                <div className="pokeball">
                                    <div className="reward-circle pokeball">
                                        <div className="pokemon-reward-name">{this.state.pokemonReward.name}
                                        </div>
                                        <img className="pokemon-image pokemon-reward" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.state.pokemonReward.number + ".png"} alt="newPokemon"></img>

                                    </div>
                                    <div className="action-button-container">
                                        <Link to={"/pokedex/" + this.props.teamName} replace style={{ textDecoration: 'none' }} >
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
const mapStateToProps = (state) => {
    return {
        pokemonData: state.pokemonData,
        teamPokemon: state.teamPokemon,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCollection: (pokemon) => {
            dispatch(addToCollection(pokemon))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelUpModalContent);