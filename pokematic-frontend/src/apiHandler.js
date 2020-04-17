import {STATUSLIST} from './constants';

import {LOCALHOST} from './constants';

export async function createTask(newTask, goalName){
    var teamName = "Dummy Team"; //temporary

    var APIcall = LOCALHOST + "team/createTask/" + teamName + "/" +goalName;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    };

    await fetch(APIcall, requestOptions);
}

export async function populateBoardPage(){
    var teamName = "Dummy Team"; //temporary

    var APIcall = LOCALHOST + "team/goals/" + teamName;
    var response = await fetch(APIcall)
    .then(response => response.json())
    .then(json => {
        return json
    });
    
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