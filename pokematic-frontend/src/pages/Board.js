import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TeamCard from '../components/TeamCard';
import StatusCard from '../components/StatusCard';
import styles from './page.css'


function Board() {
  return (
    <div>
      <div className="BoardPage">
        <div className="Menu">
          <TeamCard className="TeamCard"/>
          <Sidebar />
        </div>
        <div className="TasksContent">
          <div className="TodoStatus">
          {/* Dynamically generate status cards here */}
          <StatusCard id="Todo"/>
          <StatusCard id="InProgress"/>
          <StatusCard id="InReview"/>
          <StatusCard id="Done"/>
          </div>
        </div>
      </div>
        {/* Example: This is how we should use Navlinks to swap between routes in nested components */}
        <NavLink to="/login" >Log Out</NavLink>
    </div>
  );
}

export default Board;
