import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';


function Board() {
  return (
    <div className="Board">
      <header className="App-header">
      <Sidebar />
        {/* Example: This is how we should use Navlinks to swap between routes in nested components */}
        <NavLink to="/login" >Log Out</NavLink>
      </header>
    </div>
  );
}

export default Board;
