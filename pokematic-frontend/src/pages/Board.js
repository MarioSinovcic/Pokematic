import React from 'react';
import GoalSidebar from './board-components/GoalSideBar';
import TeamCard from '../shared-components/TeamCard';
import StatusCard from './board-components/StatusCard';
import ModalButton from '../shared-components/ModalButton';
import Header from '../shared-components/Header';
import AddIcon from '@material-ui/icons/Add';
import { populateBoardPage } from '.././apiHandler';
import './Board.css'
import LevelUpModalContent from './board-components/Modals/LevelUpModalContent';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.populatePage = this.populatePage.bind(this);

    this.state = {
      goalsList: [],
      goalNames: [],
      todoList: [],
      inProgressList: [],
      inReviewList: [],
      doneList: [],
      open: false,
    }
  }

  componentDidMount() {
    this.populatePage();
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


  populatePage = async () => {
    var apiData = populateBoardPage();

    this.setState({
      goalsList: (await apiData).goalsList,
      goalNames: (await apiData).goalNames,
      todoList: (await apiData).todoList,
      inProgressList: (await apiData).inProgressList,
      inReviewList: (await apiData).inReviewList,
      doneList: (await apiData).doneList,
    })
  }


  render() {
    if (this.state.response === []) {
      return (<div>loading</div>)
    }
    else {

      return (
        <div>
          <div>
            <div className="board-page">
              <Header />
              <div className="team-card">
                <TeamCard />
              </div>
              <div className="menu">
                <GoalSidebar populatePage={this.populatePage} goalNames={this.state.goalNames} goalsList={this.state.goalsList} />
              </div>
              <div className="tasks-content">
                <div className="todo-status">
                  <StatusCard statusTitle={"TODO"} taskList={this.state.todoList} populatePage={this.populatePage} />
                  <StatusCard statusTitle={"IN PROGRESS"} taskList={this.state.inProgressList} populatePage={this.populatePage} />
                  <StatusCard statusTitle={"IN REVIEW"} taskList={this.state.inReviewList} populatePage={this.populatePage} />
                  <StatusCard statusTitle={"DONE"} taskList={this.state.doneList} populatePage={this.populatePage} />
                </div>
              </div>
              <div className="new-task-button">
                <ModalButton
                  populatePage={this.populatePage}
                  goalNames={this.state.goalNames}
                  icon={<AddIcon style={{ fontSize: "35px" }} />} theme="dark" type="new-task"
                />              {/* // TEMP LEVEL UP BUTTON */}
                <Button style={{ size: "50px", backgroundColor: "red" }} onClick={() => this.handleOpen()} > Level up! </Button>
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
                    handleClose={this.handleClose.bind(this)}
                  />
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      );
    }
  }
}

export default Board;
