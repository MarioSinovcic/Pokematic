import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../shared-components/Sidebar';
import TeamCard from '../shared-components/TeamCard';
import StatusCard from './board-components/StatusCard';
import './Board.css'
import ModalButton from '../shared-components/ModalButton';
import Header from '../shared-components/Header';
import AddIcon from '@material-ui/icons/Add';



function Board() {
  // Temporary goals list - API call should go here
  const goals = ['Planning', 'Frontend Team', 'Testers', 'Design Squad'];
  const sidebarTitle = 'ALL TASKS';
  const sidebarSubTitle = 'MY TASKS';

  const newTaskIcon = <AddIcon style={{fontSize: "35px"}}/>;

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
          <StatusCard id="Todo"/>
          <StatusCard id="InProgress"/>
          <StatusCard id="InReview"/>
          <StatusCard id="Done"/>
          </div>
        </div>
        <div className="new-task-button">
          <ModalButton icon={newTaskIcon} theme="dark" type="new-task"/>
        </div>
      </div>
        {/* Example: This is how we should use Navlinks to swap between routes in nested components */}
        <NavLink to="/login" >Log Out</NavLink>
    </div>
  );
}

export default Board;
