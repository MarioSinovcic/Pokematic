import React from 'react';
import Counter from '../Counter';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

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
        <Sidebar />
      </header>
    </div>
  );
}

export default Login;
