import {HOST} from './constants';
import {populateBoardPage} from './goals';

export async function createTask(teamName, newTask, goalName){
    var APIcall = HOST + "team/createTask/" + teamName + "/" + goalName;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    };

    await fetch(APIcall, requestOptions);
}

export async function updateTask(updatedTask, teamName, goalName, taskName){
    var APIcall = HOST + "team/updateTask/" + teamName + "/" + goalName  + "/" + taskName;
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
    };

    await fetch(APIcall, requestOptions);
}

export async function deleteTask(teamName, goalName, taskName){
  var APIcall = HOST + "team/deleteTask/" + teamName + "/" + goalName  + "/" + taskName;
    const requestOptions = {
        method: 'DELETE'
    };

    await fetch(APIcall, requestOptions);
}

export async function gatherAllTasks(teamName){
    populateBoardPage(teamName); 
}

export async function handleApproval(teamName, goalName, taskXP){
    var goalInfoCall = HOST + "team/goals/" + teamName + "/" + goalName;
    var goalData = await fetch(goalInfoCall)
    .then(response => response.json())
    .then(json => {
        return json
    });
  
    var goalXP = 0;
    if(goalData["progress"] === 1.0){
      goalData["completed"] = true;
  
      var updateGoal = HOST + "team/updateGoal/" + teamName + "/" + goalName;
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(goalData)
      };
      await fetch(updateGoal, requestOptions);
      goalXP = goalData["experiencePoints"];
    } 
  
    var teamInfoCall = HOST + "team/" + teamName;
    var teamData = await fetch(teamInfoCall)
    .then(response => response.json())
    .then(json => {
        return json
    });
  
    var newteamXP = teamData["experiencePoints"] + goalXP + taskXP;
    var initalTemLevel = teamData["level"];
    var newTeamLevel = teamData["level"];
  
    while(newteamXP >= (newTeamLevel * 5)){
      newteamXP = newteamXP - (newTeamLevel * 5);
      newTeamLevel++;
    }
    teamData["level"] = newTeamLevel;
    teamData["experiencePoints"] = newteamXP;
  
    var updateTeam = HOST + "team/updateTeam/" + teamName;
    const requestOptions2 = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData)
    };
        
    await fetch(updateTeam, requestOptions2);
    var levelInfo = [initalTemLevel, newTeamLevel]
    return (levelInfo);
  }   