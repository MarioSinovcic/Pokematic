import React from 'react';
import {getTeamInfo} from '../../api/teams';
import TeamDetails from './TeamDetails';
import { addToCollection, setCollection } from '../../redux/actions/actions';
import { connect } from 'react-redux';
import './TeamCard.css';

class TeamCard extends React.Component {
    constructor(props){
        super(props);
        this.getTeamData = this.getTeamData.bind(this);

        this.state = {
            teamData: [],
            goals: [],
        }
    }

    async componentDidMount(){
        await this.getTeamData().then((apiData) => {
            this.setState({
                teamData: (apiData),
                goals: this.props.goals
            })
        });
    }
    
    getTeamData =  ()  => {
        return getTeamInfo(this.props.teamName);
    }

    render(){
        var teamLevel;
        var XP;
        if(!this.props.isComponentofBoard){
            teamLevel = this.state.teamData["level"];
            XP = this.state.teamData["experiencePoints"];
        }else{
            teamLevel = this.props.teamLevel;
            XP = this.props.teamExp;
        }
        return (
            <div id="CardShape">
                <div className="base-shape shape-content">
                    <TeamDetails 
                        name={this.state.teamData["name"]}
                        imageUri={this.state.teamData["imageUri"]}
                        level={teamLevel}
                        experiencePoints={XP}
                        />
                </div>
                <div className="bottom-support"></div>
                <div className="triangle-cut"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      teamCollection: state.teamCollection,
      pokemonData: state.pokemonData,
    };
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addToCollection: (pokemon) => {
        dispatch(addToCollection(pokemon))
      },
      setCollection: (pokemon) => {
        dispatch(setCollection(pokemon))
      },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TeamCard);
