import React from 'react';
import { NavLink } from 'react-router-dom';
import auth0Client from '../Auth0/Auth';


function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Login
        </p>
        <NavLink to="/profile" onClick={() => auth0Client.signIn()}>Log In</NavLink>
      </header>
    </div>
  );
}



export default Login;
