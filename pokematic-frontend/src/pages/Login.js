import React from 'react';
import Counter from '../Counter';

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Login
        </p>
        {/* NOTE: REMOVE THIS AND ITS CLASS WHEN READY */}
        <Counter />
      </header>
    </div>
  );
}

export default Login;
