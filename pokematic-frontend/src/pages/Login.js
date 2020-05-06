import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../shared-components/Header';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teamName: this.props.match.params.teamName,
    }
  }
  

  render() {
    return (
      <div className="App">
        <div className="board-page">
          <Header teamName={this.state.teamName} />
        </div>
        <div className="team-card">
          <NavLink to="/profile" >Log In</NavLink>
        </div>
      </div>
    );
  }
}

  export default Login;
