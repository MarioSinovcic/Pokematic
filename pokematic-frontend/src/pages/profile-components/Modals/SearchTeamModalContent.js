import React from "react";
import {AddUserToTeam} from '../../../apiHandler';
import TeamDetails from '../../../shared-components/TeamDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import "./SearchTeamModalContent.css"

function SearchTeamModalContent (props) {
    
    const handleAddUserToTeam = async teamName => {
        await AddUserToTeam(props.userId, teamName);
        await props.refreshProfilePage();
        props.handleClose();
    }

    var teamsToJoin = props.teamsList.map((teamData) => 
        <ListItem button key={teamData["name"]} className="TeamTabs TaskButton" onClick={() => handleAddUserToTeam(teamData["name"])}>
            <TeamDetails 
            id={teamData["id"]} //not used: just avoiding warnings
            name={teamData["name"]} 
            imageUri={teamData["imageUri"]}
            level={teamData["level"]}
            experiencePoints={teamData["experiencePoints"]}
            isItem={true}/>
        </ListItem>
    )

    return (
        <div className="search-modal-content">
                <div className="search-team-label">
                   JOIN A TEAM
                </div>
                <div  className="grey-group-search-team"> 
                    <List className="team-list-item" style={{maxHeight: '98%', overflow: 'auto'}}>
                        {teamsToJoin}
                    </List>
                </div>
        </div>
    );
}
export default SearchTeamModalContent;
