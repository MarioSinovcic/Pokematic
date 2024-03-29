import React from 'react';
import { useHistory} from "react-router-dom";
import './Header.css'

const Header = (props) => {
  const history = useHistory();

  function handleProfile() {
    history.push("/profile");
  }

  function handlePokedex() {
    history.push("/pokedex/"+ props.teamName);
  }

  function handleBoard() {
    history.push("/board/"+ props.teamName);
  }

  function renderHeader(currentPage) {
    switch(currentPage) {

      case "/profile":
        return (    
          <div className="Header">
              <div className="middle-section">
                <img className="logo" src="https://imgur.com/MOQ5TEp.png" alt="Pokematic"/>
              </div>
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
              <div className="middle-section">
                <img className="logo" src="https://imgur.com/MOQ5TEp.png" alt="Pokematic"/>
              </div>
          </div>);
    }
  }


  return (
    <div className="Header">
       {renderHeader(props.currentPage)}
    </div>
  );
}

export default Header;
