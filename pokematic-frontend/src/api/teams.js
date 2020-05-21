import {HOST} from './constants';

export async function getTeamInfo(teamName){
    var APIcall = HOST + "team/" + teamName;
    var response = await fetch(APIcall)
    .then(response => response.json())
    .then(json => {
        return json
    });
  
    var apiData = {
      name: response["name"], 
      level: response["level"], 
      experiencePoints: response["experiencePoints"],
      pokemon: response["pokemon"],
      ...response,
    }
  
    return apiData;
  }
  
  export async function checkTeamName(teamName){
    teamName = teamName.trim().split(' ').join('%20');
    var APIcall = HOST + "team/" + teamName;
    var response = await fetch(APIcall)
  
    if(response.status === 204){
      return false;
    }else{
      return true;
    }
  }
  
  export async function createTeam(newTeam){
    var APIcall = HOST + "team/createTeam";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeam)
    };
  
    await fetch(APIcall, requestOptions);
  }

  export async function updateTeam(updatedTeam, teamName){
    var APIcall = HOST + "team/updateTeam/" + teamName;
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeam)
    };
  
    await fetch(APIcall, requestOptions);
  }

  export async function getAllTeams(){
    var APIcall = HOST + "team";
    var response = await fetch(APIcall)
    .then(response => response.json())
    .then(json => {
        return json
    });
  
    var teamResponse = response;
    var gatheredTeams= [];
  
    for (var team = 0; team < teamResponse.length; team++) {
      gatheredTeams.push(teamResponse[team]);
    }
  
    return(gatheredTeams);
  }    