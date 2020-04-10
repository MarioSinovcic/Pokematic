import React from 'react';
import Header from '../shared-components/Header';
import Sidebar from '../shared-components/Sidebar';
import ProfileCard from './profile-components/ProfileCard';
import './Profile.css';
import ModalButton from '../shared-components/ModalButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

function Profile() {

// Temporary teams list - API call should go here
const teams = ['yes', 'hello'];
const sidebarTitle = 'TEAMS';

const searchTeamIcon = <SearchIcon style={{fontSize: "35px", color: "#3D3D3D"}}/>;
const newTeamIcon = <AddIcon style={{fontSize: "35px", color: "#3D3D3D"}}/>;

  return (
    <div>
      <header className="App-header">
      <Header />
      
      <div className="profile-background"></div>
        <div className="menu">
          <Sidebar items={teams} title={sidebarTitle} itemType="TEAM"/>
          <div className="team-buttons">
            <ModalButton icon={searchTeamIcon} theme="light" type="search-team"/>
            <ModalButton icon={newTeamIcon} theme="light" type="new-team"/>
          </div>
        </div>
        <div className="profile-content">
          <ProfileCard className="profile-card"/>
        </div>
      </header>
    </div>
  );
}

export default Profile;
