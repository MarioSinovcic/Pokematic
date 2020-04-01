import React from 'react';
import { NavLink } from 'react-router-dom';

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Login
        </p>
        {/* NOTE: REMOVE THIS AND ITS CLASS WHEN READY */}
        {/* <Counter /> */}
        <NavLink to="/board" >Log In</NavLink>
      </header>
    </div>
  );
}

export default Login;
