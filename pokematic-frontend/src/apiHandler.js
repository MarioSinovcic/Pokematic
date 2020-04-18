/*
    To run the system without any API interation:
    1. uncomment the import below
    2. in the populateBoardPage method uncomment the "var response = fakeGoalResponse;" line
    3. comment out everything in the "comment out" section in that same method
    NOTE: API calls will still occur when creating tasks ect... 

*/

//import fakeGoalResponse from './goalResponse.json';

import {STATUSLIST} from './constants';
import {HOST} from './constants';

const teamName = "Dummy Team"; //temporary

export async function populateBoardPage(){
    // --- comment out ----
    var APIcall = HOST + "team/goals/" + teamName;
    var response = await fetch(APIcall)
    .then(response => response.json())
    .then(json => {
        return json
    });
    // --- comment out ----

    // var response = fakeGoalResponse;
    
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

export async function createTask(newTask, goalName){
  var APIcall = HOST + "team/createTask/" + teamName + "/" +goalName;
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
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