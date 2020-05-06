import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../shared-components/Header';
import './Login.css';
import { Typography } from '@material-ui/core';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    return (
      <div className="App">
        <Header />

        <div>
          <div className="login-background"></div>
          <div className="login-space">
            <div className="login-card-shape">
              <div className="login-base-shape">
                <div className="login-card-title">
                  <Typography className="login-card-title">Log In</Typography>
                </div>
                <div className="credentials-shape">
                <div className="pokeball-img-login"></div>
                </div>
              </div>
              <div className="login-edge">
              <div className="login-cut"></div>
              <div className="login-bottom"></div>
            </div>
            </div>
            
          </div>

        </div>


        <div className="team-card">
          <NavLink to="/profile" >Log In</NavLink>
        </div>
      </div>
    );
  }
}

export default Login;
