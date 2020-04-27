import React from 'react';
import {getTeamInfo} from '.././apiHandler';
import TeamDetails from './TeamDetails';
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

        console.log(this.state.teamData)
    }

    render(){
        return (
            <div id="CardShape">
                <div className="base-shape shape-content">
                    <TeamDetails 
                        name={this.state.teamData["name"]}
                        level={this.state.teamData["level"]}
                        experiencePoints={this.state.teamData["experiencePoints"]}
                        isItem={true}
                        />
                </div>
                <div className="bottom-support"></div>
                <div className="triangle-cut"></div>
            </div>
        );
    }
}

export default TeamCard;