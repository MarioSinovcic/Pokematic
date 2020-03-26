import React from 'react';
import { useHistory } from "react-router-dom";
import './Header.css'

const Header = () => {
  const history = useHistory();

  function handleProfile() {
    history.push("/profile");
  }

  function handlePokedex() {
    history.push("/board");
  }

  return (
    <div className="Header">
        <div className="left-icon" onClick={handleProfile}/>
        <div className="middle-section">
          <img className="logo" src="https://imgur.com/MOQ5TEp.png" alt="Pokematic"/>
        </div>
        <div className="right-icon" onClick={handlePokedex}/>
    </div>
  );
}

export default Header;
