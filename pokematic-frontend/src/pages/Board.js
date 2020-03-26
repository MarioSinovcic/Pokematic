import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TeamCard from '../components/TeamCard';
import styles from './page.css'


function Board() {
  return (
    <div className="BoardPage">
      <header className="BoardPage">
      <TeamCard className="TeamCard"/>
      <Sidebar />
        {/* Example: This is how we should use Navlinks to swap between routes in nested components */}
        <NavLink to="/login" >Log Out</NavLink>
      </header>
    </div>
  );
}

export default Board;
