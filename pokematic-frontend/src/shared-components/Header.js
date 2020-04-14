import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './Header.css'

const Header = () => {
  const history = useHistory();

  function handleProfile() {
    history.push("/profile");
  }

  function handlePokedex() {
    history.push("/pokedex");
  }

  function handleBoard() {
    history.push("/board");
  }


  function renderHeader(currentPage) {
    switch(currentPage) {

      case "/profile":
        return (    
          <div className="Header">
              <div className="left-icon board-image" onClick={handleBoard}/>
              <div className="middle-section">
                <img className="logo" src="https://imgur.com/MOQ5TEp.png" alt="Pokematic" onClick={handleBoard}/>
              </div>
              <div className="right-icon pokedex-image" onClick={handlePokedex}/>
          </div>);

      case "/board":
        return (    
          <div className="Header">
              <div className="left-icon profile-image" onClick={handleProfile}/>
              <div className="middle-section">
                <img className="logo" src="https://imgur.com/MOQ5TEp.png" alt="Pokematic" onClick={handleBoard}/>
              </div>
              <div className="right-icon pokedex-image" onClick={handlePokedex}/>
          </div>);


      case "/pokedex":
        return (    
          <div className="Header">
              <div className="left-icon profile-image" onClick={handleProfile}/>
              <div className="middle-section">
                <img className="logo" src="https://imgur.com/MOQ5TEp.png" alt="Pokematic" onClick={handleBoard}/>
              </div>
              <div className="right-icon board-image" onClick={handleBoard}/>
          </div>);

      default:
      return (    
        <div className="Header">
            <div className="left-icon profile-image" onClick={handleProfile}/>
            <div className="middle-section">
              <img className="logo" src="https://imgur.com/MOQ5TEp.png" alt="Pokematic" onClick={handleBoard}/>
            </div>
            <div className="right-icon pokedex-image" onClick={handlePokedex}/>
        </div>);

    }
  }

  return (
    <div className="Header">
      {renderHeader(useLocation().pathname)}
    </div>
  );
}

export default Header;
