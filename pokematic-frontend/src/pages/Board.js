import React from 'react';
import { NavLink } from 'react-router-dom';

function Board() {
  return (
    <div className="Board">
      <header className="App-header">
        <p>
          Board
        </p>
        {/* Example: This is how we should use Navlinks to swap between routes in nested components */}
        <NavLink to="/login" >Login One</NavLink>
      </header>
    </div>
  );
}

export default Board;
