import React from 'react';
import Header from '../shared-components/Header';
import Sidebar from '../shared-components/Sidebar';

function Profile() {

// Temporary teams list - API call should go here
const teams = ['yes', 'hello'];
const sidebarTitle = 'TEAMS';

  return (
    <div className="App">
      <header className="App-header">
      <Header />
        <div className="menu">
          <Sidebar items={teams} title={sidebarTitle} itemType="TEAM"/>
        </div>
      </header>
    </div>
  );
}

export default Profile;
