import React from 'react';
import Header from '../shared-components/Header';
import Sidebar from '../shared-components/Sidebar';
import ProfileCard from './profile-components/ProfileCard';
import ModalButton from '../shared-components/ModalButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import {populateProfilePage} from '.././apiHandler';
import './Profile.css';

class Profile extends React.Component {
  constructor(props){
    super(props);

    this.populatePage = this.populatePage.bind(this);

    this.state = {
      teamsList: []
    }
  }

  componentDidMount(){
    this.populatePage();
  }

  populatePage = async () => {
    var apiData = populateProfilePage();

    this.setState({
      teamsList: (await apiData)
    })
  }

render(){
    const sidebarTitle = 'TEAMS';
    const teams = ["yes", "hello"];

    const searchTeamIcon = <SearchIcon style={{fontSize: "35px", color: "#3D3D3D"}}/>;
    const newTeamIcon = <AddIcon style={{fontSize: "35px", color: "#3D3D3D"}}/>;

    return (
      
      <div>
        <header className="App-header">
        <Header />
        </header>
        <div className="profile-background"></div>
          <div className="menu">
            <Sidebar 
              items={teams} 
              title={sidebarTitle} 
              itemType="TEAM"
              teamsList={this.state.teamsList}
            />
            <div className="team-buttons">
              <ModalButton icon={searchTeamIcon} theme="light" type="search-team"/>
              <ModalButton icon={newTeamIcon} theme="light" type="new-team"/>
            </div>
            <div className="profile-content">
              <ProfileCard className="profile-card"/>
            </div>
          </div>
      </div>
    );
  }
}

export default Profile;
