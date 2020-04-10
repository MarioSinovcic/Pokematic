import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../shared-components/Sidebar';
import TeamCard from '../shared-components/TeamCard';
import StatusCard from './board-components/StatusCard';
import ModalButton from '../shared-components/ModalButton';
import Header from '../shared-components/Header';
import AddIcon from '@material-ui/icons/Add';
import './Board.css'

import LOCALFILE from './test.json';

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
    //similar ops here
    this.getTeamGoals();
    this.getTasks();
  }

  getTeamGoals(){
    //replace with api call
    const gatheredTeamGoals = ['Planning', 'Frontend Team', 'Testers', 'Design Squad'];

    this.setState({
      goalsList: gatheredTeamGoals
    })
  }

  getTasks(){
    //replace with api call and handelling
    var data = LOCALFILE;

    const gatheredTodoList = [];
    const gatheredInProgressList = [];
    const gatheredInReviewList = [];
    const gatheredDoneList = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i]["status"] === "TODO"){
        gatheredTodoList.push(data[i])
      }
      if(data[i]["status"] === "In Progress"){
        gatheredInProgressList.push(data[i])
      }
      if(data[i]["status"] === "In Review"){
        gatheredInReviewList.push(data[i])
      }
      if(data[i]["status"] === "Done"){
        gatheredDoneList.push(data[i])
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

  // Temporary goals list - API call should go here
  const goals = ['Planning', 'Frontend Team', 'Testers', 'Design Squad'];
  const sidebarTitle = 'ALL TASKS';
  const sidebarSubTitle = 'MY TASKS';
    return (
      <div>
        <div className="board-page">
        <Header />
        <div className="team-card">
              <TeamCard />
        </div>
          <div className="menu">
            <Sidebar items={goals} title={sidebarTitle} subTitle={sidebarSubTitle} itemType="GOAL"/>
          </div>
          <div className="tasks-content">
            <div className="todo-status">
            {/* Dynamically generate status cards here */}
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
          {/* Example: This is how we should use Navlinks to swap between routes in nested components */}
          <NavLink to="/login" >Log Out</NavLink>
      </div>
    );
  }
}

export default Board;
