import React from 'react';
import GoalSidebar from './board-components/GoalSideBar';
import TeamCard from '../shared-components/TeamCard';
import StatusCard from './board-components/StatusCard';
import ModalButton from '../shared-components/ModalButton';
import Header from '../shared-components/Header';
import AddIcon from '@material-ui/icons/Add';
import {populateBoardPage} from '.././apiHandler';
import './Board.css'

class Board extends React.Component {
  constructor(props){
    super(props);

    this.populatePage = this.populatePage.bind(this);

    this.state = {
      teamName: this.props.match.params.teamName,
      goalsList: [],
      goalNames: [],
      todoList: [],
      inProgressList: [],
      inReviewList: [],
      doneList: [],
    }
  }

  componentDidMount(){
    this.populatePage();
  }

  populatePage = async () => {
    var apiData = populateBoardPage(this.state.teamName);

    this.setState({
      goalsList: (await apiData).goalsList,
      goalNames: (await apiData).goalNames,
      todoList: (await apiData).todoList,
      inProgressList: (await apiData).inProgressList,
      inReviewList: (await apiData).inReviewList,
      doneList: (await apiData).doneList,
    })
  }
  
  render(){
    if(this.state.response === []){
      return(<div>loading</div>)
    }
    else{
    return (
        <div>
          <div className="board-page">
          <Header teamName={this.state.teamName}/>
          <div className="team-card">
                <TeamCard teamName={this.state.teamName}/>
          </div>
            <div className="menu">
            <GoalSidebar populatePage={this.populatePage} goalNames ={this.state.goalNames} goalsList={this.state.goalsList}/>
            </div>
            <div className="tasks-content">
              <div className="todo-status">
              <StatusCard statusTitle={"TODO"} taskList={this.state.todoList} populatePage={this.populatePage}/>
              <StatusCard statusTitle={"IN PROGRESS"} taskList={this.state.inProgressList} populatePage={this.populatePage}/>
              <StatusCard statusTitle={"IN REVIEW"} taskList={this.state.inReviewList} populatePage={this.populatePage}/>
              <StatusCard statusTitle={"DONE"} taskList={this.state.doneList} populatePage={this.populatePage}/>
              </div>
            </div>
            <div className="new-task-button">
              <ModalButton 
                populatePage={this.populatePage} 
                goalNames ={this.state.goalNames} 
                icon={<AddIcon style={{fontSize: "35px"}}/>} theme="dark" type="new-task"
              />
            </div>
          </div>
        </div>
     );
  }
}
}

export default Board;