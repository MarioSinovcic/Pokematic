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
            rewardName: "",
            newLevel: 21,
        }
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
        return Math.floor(Math.random() * 152)
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
                            <div className="pokemon-reward-name">Squirtle
                                    </div>
                                    <img className="pokemon-image pokemon-reward" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.generatePokemon()+".png"} alt="newPokemon"></img>
                                
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
export default LevelUpModalContent;
