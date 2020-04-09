import React from 'react';
import Header from '../shared-components/Header';
import Sidebar from '../shared-components/Sidebar';
import ProfileCard from './profile-components/ProfileCard';
import './Profile.css';

function Profile() {

// Temporary teams list - API call should go here
const teams = ['yes', 'hello'];
const sidebarTitle = 'TEAMS';

  return (
    <div>
      <header className="App-header">
      <Header />
      
      <div className="profile-background"></div>
        <div className="menu">
          <Sidebar items={teams} title={sidebarTitle} itemType="TEAM"/>
          </div>
          <div className="profile-content">
            <ProfileCard className="profile-card"/>
          </div>
      </header>
    </div>
  );
}

export default Profile;
