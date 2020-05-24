import {HOST} from './constants';
import {STATUSLIST} from './constants';

export async function createGoal(teamName, newGoal){
    var APIcall = HOST + "team/createGoal/" + teamName;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
    };
  
    await fetch(APIcall, requestOptions);
  }
  
  export async function deleteGoal(teamName, goalName){
    var APIcall = HOST + "team/deleteGoal/" + teamName + "/" + goalName;
      const requestOptions = {
          method: 'DELETE'
      };
  
      await fetch(APIcall, requestOptions);
  }

  export async function populateBoardPage(teamName){
    var APIcall = HOST + "team/goals/" + teamName;
    var response = await fetch(APIcall)
    .then(response => response.json())
    .then(json => {
        return json
    });
    
    var goalResponse = response;
    var gatheredTeamGoals= [];
    var gatheredTasksForGoals= [];
    var gatheredGoalNames= [];
    var gatheredTaskNames= [];

    for (var goal = 0; goal < goalResponse.length; goal++) {
      gatheredTeamGoals.push(goalResponse[goal]);
      if(!goalResponse[goal]["completed"]){
        gatheredGoalNames.push(goalResponse[goal]["name"]);
      }
    
      var taskArray = goalResponse[goal]["tasks"];
      
      for(var task = 0; task < taskArray.length; task++){
        var currentTask = taskArray[task];
        currentTask["goalName"] = goalResponse[goal]["name"];
        gatheredTaskNames.push(currentTask["name"]);
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
        goalsList: gatheredTeamGoals.reverse(), 
        goalNames: gatheredGoalNames.reverse(), 
        taskNames: gatheredTaskNames.reverse(), 
        todoList: gatheredTodoList.reverse(),
        inProgressList: gatheredInProgressList.reverse(),
        inReviewList: gatheredInReviewList.reverse(),
        doneList: gatheredDoneList.reverse()
    }
    return apiData;
}