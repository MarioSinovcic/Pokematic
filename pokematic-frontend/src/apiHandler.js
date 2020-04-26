/*
    To run the system without any API interaction:
    1. uncomment the import below
    2. in the populateBoardPage method uncomment the "var response = fakeGoalResponse;" line
    3. comment out everything in the "comment out" section in that same method
    NOTE: API calls will still occur when creating tasks ect... 

*/

//import fakeGoalResponse from './goalResponse.json';

import {STATUSLIST} from './constants';
import {HOST} from './constants';

var teamName = "Dummy Team2"; //temporary

export async function createTask(newTask, goalName){
    var APIcall = HOST + "team/createTask/" + teamName + "/" + goalName;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    };

    await fetch(APIcall, requestOptions);
}

export async function updateTask(updatedTask, goalName, taskName){
    var APIcall = HOST + "team/updateTask/" + teamName + "/" + goalName  + "/" + taskName;
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
    };

    await fetch(APIcall, requestOptions);
}

export async function deleteTask(goalName, taskName){
  var APIcall = HOST + "team/deleteTask/" + teamName + "/" + goalName  + "/" + taskName;
    const requestOptions = {
        method: 'DELETE'
    };

    await fetch(APIcall, requestOptions);
}

export async function createGoal(newGoal){
  var APIcall = HOST + "team/createGoal/" + teamName;
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal)
  };

  await fetch(APIcall, requestOptions);
}

export async function deleteGoal(goalName){
  var APIcall = HOST + "team/deleteGoal/" + teamName + "/" + goalName;
    const requestOptions = {
        method: 'DELETE'
    };

    await fetch(APIcall, requestOptions);
}

export async function populateProfilePage(){
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

export async function populateBoardPage(){
    // --- comment out ----
    var APIcall = HOST + "team/goals/" + teamName;
    var response = await fetch(APIcall)
    .then(response => response.json())
    .then(json => {
        return json
    });
    // --- comment out ----
    
    var goalResponse = response;
    var gatheredTeamGoals= [];
    var gatheredTasksForGoals= [];
    var gatheredGoalNames= [];

    for (var goal = 0; goal < goalResponse.length; goal++) {
      gatheredTeamGoals.push(goalResponse[goal]);
      gatheredGoalNames.push(goalResponse[goal]["name"]);
    
      var taskArray = goalResponse[goal]["tasks"];
      
      for(var task = 0; task < taskArray.length; task++){
        var currentTask = taskArray[task];
        currentTask["goalName"] = goalResponse[goal]["name"];
        gatheredTasksForGoals.push(currentTask);
      }
    }

    var gatheredTodoList = [];
    var gatheredInProgressList = [];
    var gatheredInReviewList = [];
    var gatheredDoneList = [];

    var tasks = gatheredTasksForGoals;
    
    for (var i = 0; i < tasks.length; i++) {
      if(tasks[i]["status"] === STATUSLIST[0]){
        gatheredTodoList.push(tasks[i]);
      }
      if(tasks[i]["status"] === STATUSLIST[1]){
        gatheredInProgressList.push(tasks[i]);
      }
      if(tasks[i]["status"] === STATUSLIST[2]){
        gatheredInReviewList.push(tasks[i]);
      }
      if(tasks[i]["status"] === STATUSLIST[3]){
        gatheredDoneList.push(tasks[i]);
      }
    }

    var apiData = {
        goalsList:gatheredTeamGoals, 
        goalNames:gatheredGoalNames, 
        todoList: gatheredTodoList,
        inProgressList: gatheredInProgressList,
        inReviewList: gatheredInReviewList,
        doneList: gatheredDoneList
    }
    return apiData;
}


export async function fetchPokemonData() {

  var results;

  // Get a list of pokemon Names and their URLs
  await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(response => response.json())
    .then(data => {
      results = data.results;
    })

  return results;
}

export async function fetchPokemonTypes(pokemonURL) {

  var apiData;

  await fetch(pokemonURL)
    .then(response => response.json())
    .then(data => {
      apiData = {
        name: data.name,
        types: [data.types[0].type.name, (data.types[1] && data.types[1].type.name)],
      }
    })

    return apiData;
}
