import React from 'react';
import GoalSidebar from './board-components/GoalSideBar';
import TeamCard from '../shared-components/TeamCard';
import StatusCard from './board-components/StatusCard';
import ModalButton from '../shared-components/ModalButton';
import Header from '../shared-components/Header';
import AddIcon from '@material-ui/icons/Add';
import './Board.css'

import { STATUSLIST } from '../constants';
import fakeGoalResponse from '../goalResponse.json';
import LevelUpModalContent from './board-components/Modals/LevelUpModalContent';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';

class Board extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      goalsList: [],
      todoList: [],
      inProgressList: [],
      inReviewList: [],
      doneList: [],
      open: false,
    }
  }


  
   handleOpen() {
      this.setState({
        open: true,
      })
      console.log("Open");
    };
  
   handleClose() {
    this.setState({
      open: false,
    })
    };

  componentDidMount() {
    this.getTeamGoals();
  }

  getTeamGoals() {
    //replace with api call
    var goalResponse = fakeGoalResponse;

    const gatheredTeamGoals = [];
    var gatheredTasksForGoals = [];

    for (var goal = 0; goal < goalResponse.length; goal++) {
      gatheredTeamGoals.push(goalResponse[goal]);
      var taskArray = goalResponse[goal]["tasks"];

      for (var task = 0; task < taskArray.length; task++) {
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

  sortTasks(tasks) {
    const gatheredTodoList = [];
    const gatheredInProgressList = [];
    const gatheredInReviewList = [];
    const gatheredDoneList = [];

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i]["status"] === STATUSLIST[0]) {
        gatheredTodoList.push(tasks[i]);
      }
      if (tasks[i]["status"] === STATUSLIST[1]) {
        gatheredInProgressList.push(tasks[i]);
      }
      if (tasks[i]["status"] === STATUSLIST[2]) {
        gatheredInReviewList.push(tasks[i]);
      }
      if (tasks[i]["status"] === STATUSLIST[3]) {
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

  render() {
    return (
      <div>
        <div>
          <div className="board-page">
            <Header />
            <div className="team-card">
              <TeamCard />
            </div>
            <div className="menu">
              <GoalSidebar goalsList={this.state.goalsList} />
            </div>
            <div className="tasks-content">
              <div className="todo-status">
                <StatusCard statusTitle={"TODO"} taskList={this.state.todoList} />
                <StatusCard statusTitle={"IN PROGRESS"} taskList={this.state.inProgressList} />
                <StatusCard statusTitle={"IN REVIEW"} taskList={this.state.inReviewList} />
                <StatusCard statusTitle={"DONE"} taskList={this.state.doneList} />
              </div>
            </div>
            <div className="new-task-button">
              <ModalButton icon={<AddIcon style={{ fontSize: "35px" }} />} theme="dark" type="new-task" />
              {/* // TEMP LEVEL UP BUTTON */}
              <Button style={{size: "50px", backgroundColor: "red"}} onClick={() => this.handleOpen()} > Level up! </Button>
            </div>
          </div>
        </div>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            // className={classes.modal}
            open={this.state.open}
            disableAutoFocus={true}
            onBackdropClick={() => this.handleClose()}
            onClose={() => this.handleClose()}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.open}>
              <div>
                <LevelUpModalContent
                />
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Board;
