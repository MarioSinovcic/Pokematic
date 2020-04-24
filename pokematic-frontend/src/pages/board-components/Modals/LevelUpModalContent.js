import React from 'react';
import "./TaskModalContent.css"
import "./LevelUpModalContent.css"
import { Button } from '@material-ui/core';
import { useHistory} from "react-router-dom";


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
        this.setState({
            showReward: true,
            // Temporary static values
            rewardName: "Squirtle",
        })

    }

    toPokedex() {
        const history = useHistory();
        history.push("/pokedex");
    }


    render() {
        return (
            <div className="modal-content">
                <div className="blocks">
                    <div className="new-level">LV. {this.state.newLevel}</div>
                    <div className="title">
                        {!this.state.showReward ? "Level Up!" : this.state.rewardName }
            </div>
                    {!this.state.showReward ?
                        <div className="pokeball"><img src="/images/pokeballPrize.png" alt="prize" className="pokeball hidden" onClick={this.switchToReward.bind(this)} /></div>
                        : <div className="pokeball">
                            <div className="reward-circle pokeball">
                                {/* //TODO: Change this image to dynamically change depending on the pokemon received */}
                                    <img className="pokemon-image pokemon-reward" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt=""></img>
                                
                            </div>
                            <div className="action-button-container">
                                <Button className="reward-button" onClick={() => this.toPokedex()} >View Collection</Button>
                                <Button className="reward-button" onClick={this.props.handleClose}>Done</Button>
                            </div>

                        </div>}
                </div>
            </div>
        );
    }
}
export default LevelUpModalContent;
