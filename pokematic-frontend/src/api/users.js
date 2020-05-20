import {HOST} from './constants';

export async function AddUserToTeam(userId, teamName){
    teamName = teamName.trim().split(' ').join('%20');
    var APIcall = HOST + "team/" + teamName;
    var response = await fetch(APIcall)
    .then(response => response.json())
    .then(json => {
        return json
    });
    
    var updatedTeam = await response;
    var newTeamList = await response["users"];
  
    if(!newTeamList.includes(userId)){
      newTeamList.push(userId);
      updatedTeam["users"] = newTeamList;
    }  
    
    var putCall = HOST + "team/updateTeam/" + teamName;
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeam)
    };
  
    await fetch(putCall, requestOptions);
  }
  
  export async function getAllTeamsForAUser(userId){
    var APIcall = HOST + "team";
    var response = await fetch(APIcall)
    .then(response => response.json())
    .then(json => {
        return json
    });
  
    var teamResponse = response;
    var gatheredTeams= [];
  
    for (var team = 0; team < teamResponse.length; team++) {
      if(teamResponse[team]["users"].includes(userId)){
        gatheredTeams.push(teamResponse[team]);
      }
    }
  
    return(gatheredTeams);
  }