import React from 'react';
import {getTeamInfo} from '../../api/teams';
import TeamDetails from './TeamDetails';
import { addToCollection, setCollection } from '../../actions/actions';
import { connect } from 'react-redux';
import './TeamCard.css';

class TeamCard extends React.Component {
    constructor(props){
        super(props);
        this.getTeamData = this.getTeamData.bind(this);

        this.state = {
            teamData: [],
        }
    }

    componentDidMount(){
        this.getTeamData();
    }
    
    getTeamData = async ()  => {
        var apiData = await getTeamInfo(this.props.teamName);

        this.setState({
            teamData: (await apiData)
        })
    }

    render(){
        return (
            <div id="CardShape">
                <div className="base-shape shape-content">
                    <TeamDetails 
                        name={this.state.teamData["name"]}
                        imageUri={this.state.teamData["imageUri"]}
                        level={this.state.teamData["level"]}
                        experiencePoints={this.state.teamData["experiencePoints"]}
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
