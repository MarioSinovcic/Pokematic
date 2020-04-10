import React from 'react';
import GoalSidebar from './board-components/GoalSideBar';
import TeamCard from '../shared-components/TeamCard';
import StatusCard from './board-components/StatusCard';
import ModalButton from '../shared-components/ModalButton';
import Header from '../shared-components/Header';
import AddIcon from '@material-ui/icons/Add';
import './Board.css'

import fakeGoalResponse from './goalResponse.json';

class Board extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      goalsList: [],
      todoList: [],
      inProgressList: [],
      inReviewList: [],
      doneList: [],
    }
  }

  componentDidMount(){
    this.getTeamGoals();
  }

  getTeamGoals(){
    //replace with api call
    var goalResponse = fakeGoalResponse;

    const gatheredTeamGoals= [];
    var gatheredTasksForGoals= [];

    for (var goal = 0; goal < goalResponse.length; goal++) {
      gatheredTeamGoals.push(goalResponse[goal]);
      var taskArray = goalResponse[goal]["tasks"];

      for(var task = 0; task < taskArray.length; task++){
        var currentTask = taskArray[task];
        currentTask["goalName"] = goalResponse[goal]["name"];
        gatheredTasksForGoals.push(currentTask);
      }
    }
    this.sortTasks(gatheredTasksForGoals);
    
    this.setState({
      goalsList: gatheredTeamGoals
    })
  }

  sortTasks(tasks){
    const gatheredTodoList = [];
    const gatheredInProgressList = [];
    const gatheredInReviewList = [];
    const gatheredDoneList = [];
    
    for (var i = 0; i < tasks.length; i++) {
      if(tasks[i]["status"] === "TODO"){
        gatheredTodoList.push(tasks[i]);
      }
      if(tasks[i]["status"] === "In Progress"){
        gatheredInProgressList.push(tasks[i]);
      }
      if(tasks[i]["status"] === "In Review"){
        gatheredInReviewList.push(tasks[i]);
      }
      if(tasks[i]["status"] === "Done"){
        gatheredDoneList.push(tasks[i]);
      }
    }
        
    this.setState({
      todoList: gatheredTodoList,
      inProgressList: gatheredInProgressList,
      inReviewList: gatheredInReviewList,
      doneList: gatheredDoneList,
    })
  }

  render(){
    return (
        <div>
          <div className="board-page">
          <Header />
          <div className="team-card">
                <TeamCard />
          </div>
            <div className="menu">
            <GoalSidebar goalsList={this.state.goalsList}/>
            </div>
            <div className="tasks-content">
              <div className="todo-status">
              <StatusCard statusTitle={"TODO"} taskList={this.state.todoList}/>
              <StatusCard statusTitle={"IN PROGRESS"} taskList={this.state.inProgressList}/>
              <StatusCard statusTitle={"IN REVIEW"} taskList={this.state.inReviewList}/>
              <StatusCard statusTitle={"DONE"} taskList={this.state.doneList}/>
              </div>
            </div>
            <div className="new-task-button">
              <ModalButton icon={<AddIcon style={{fontSize: "35px"}}/>} theme="dark" type="new-task"/>
            </div>
          </div>
        </div>
     );
  }
}

export default Board;
