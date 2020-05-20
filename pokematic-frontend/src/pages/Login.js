import React from 'react';
import Header from './shared-components/Header';
import { Typography, Button } from '@material-ui/core';
import * as colors from './shared-components/colors'
import { Link } from 'react-router-dom';
import auth0Client from '../Auth0/Auth';
import './Login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <Header currentPage=""/>

        <div>
          <div className="login-background"></div>
          <div className="login-space">
            <div className="login-card-shape">
              <div className="login-base-shape">
                <div className="login-card-title">
                  <Typography className="login-card-title">Log In</Typography>
                </div>
                <div className="credentials-shape">
                  <Link to={"/profile"} replace style={{ textDecoration: 'none' }} >
                    <Button style={{ backgroundColor: colors.fire, height: "50px", width: "225px", fontSize: "60px", marginTop: "-125px", border: "white 3px solid" }}
                      className="team-label pokemon-label"
                      onClick={() => auth0Client.signIn()}>
                      Enter Pokematic!
                 </Button>
                  </Link>
                </div>
                <div className="pokeball-img-login"></div>

              </div>
              <div className="login-edge">
                <div className="login-cut"></div>
                <div className="login-bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Login;
