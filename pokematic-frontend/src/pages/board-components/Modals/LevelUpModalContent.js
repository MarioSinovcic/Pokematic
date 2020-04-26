import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import "./TaskModalContent.css"
import "./LevelUpModalContent.css"
import { connect } from 'react-redux';

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
        this.setState({
            pokemonReward: this.generatePokemon(),
        });
    }

    switchToReward() {
        // this.setState({
        //     showReward: true,
        //     // Temporary static values
        //     rewardName: "Squirtle",
        // })

    }

    toPokedex() {
        this.context.router.push('/pokedex');
    }

    generatePokemon(){
        const randomNum = Math.floor(Math.random() * 152);
        const randomPokemon = this.props.pokemonData[randomNum];

        const pokemon = {
            name: randomPokemon[1],
            number: randomPokemon[0]+1,
        }
        return pokemon;
    }


    render() {
        return (
            <div className="modal-content">
                <div className="blocks">
                    <div className="new-level">LV. {this.state.newLevel}</div>
                    <div className="title">
                        {!this.state.showReward ? "Level Up!" : this.state.rewardName}
                    </div>
                    {/* {!this.state.showReward ?
                        <div className="pokeball"><img src="/images/pokeballPrize.png" alt="prize" className="pokeball hidden" onClick={this.switchToReward.bind(this)} /></div>
                        : <div className="pokeball">
                            <div className="reward-circle pokeball">
                                //TODO: Change this image to dynamically change depending on the pokemon received
                                    <img className="pokemon-image pokemon-reward" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt=""></img>
                                
                            </div>
                            <div className="action-button-container">
                                <Button className="reward-button" onClick={() => this.toPokedex()} >View Collection</Button>
                                <Button className="reward-button" onClick={this.props.handleClose}>Done</Button>
                            </div>

                        </div>} */}
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <div className="pokeball"><img src="/images/pokeballPrize.png" alt="prize" className="pokeball hidden" onClick={this.switchToReward.bind(this)} /></div>
                            </div>
                            <div class="flip-card-back">
                            <div className="pokeball">
                            <div className="reward-circle pokeball">
                            <div className="pokemon-reward-name">{this.state.pokemonReward.name}
                                    </div>
                                    <img className="pokemon-image pokemon-reward" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.state.pokemonReward.number+".png"} alt="newPokemon"></img>
                                
                            </div>
                            <div className="action-button-container">
                                <Link to="/pokedex" replace>
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
      pokemonMap: state.pokemonURL,
      pokemonTypes: state.pokemonTypes,
      pokemonData: state.pokemonData,
      pokemonCollection: state.pokemonCollection,
    };
  }
  
  export default connect(mapStateToProps)(LevelUpModalContent);

