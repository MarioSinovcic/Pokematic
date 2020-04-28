import React from 'react';
import { NavLink } from 'react-router-dom';

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Login
        </p>
        <NavLink to="/profile" >Log In</NavLink>
      </header>
    </div>
  );
}

export default Login;
