import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from './board-components/Sidebar';
import TeamCard from '../shared-components/TeamCard';
import StatusCard from './board-components/StatusCard';
import './Board.css'
import NewTaskButton from './board-components/NewTaskButton';
import Header from '../shared-components/Header';


function Board() {
  return (
    <div>
      <div className="board-page">
      <Header />
      <div className="team-card">
            <TeamCard />
      </div>
        <div className="menu">
          <Sidebar />
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
        <NewTaskButton />
      </div>
        {/* Example: This is how we should use Navlinks to swap between routes in nested components */}
        <NavLink to="/login" >Log Out</NavLink>
    </div>
  );
}

export default Board;
