import React from 'react';
import Header from '../shared-components/Header';
import Sidebar from '../shared-components/Sidebar';
import ProfileCard from './profile-components/ProfileCard';
import ModalButton from '../shared-components/ModalButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { populateProfilePage } from '.././apiHandler';
import auth0Client from '../Auth0/Auth';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.populatePage = this.populatePage.bind(this);

    this.state = {
      teamsList: [],
      nickname: "",
      name: "",
      picture: ""
    }
  }

  componentDidMount() {
    // auth0Client.profile contains user information
    auth0Client.silentAuth().then(() => this.setState({
        nickname: auth0Client.profile.nickname,
        name: String(auth0Client.profile.name),
        picture: auth0Client.profile.picture
    }));
    this.populatePage();
  }

  populatePage = async () => {
    var apiData = populateProfilePage();

    this.setState({
      teamsList: (await apiData)
    })
  }

  // method used to sign user out of application
  signOut = () => {
    auth0Client.signOut();
    this.props.history.replace('/');
  }

  render() {
    const sidebarTitle = 'TEAMS';

    const searchTeamIcon = <SearchIcon style={{ fontSize: "35px", color: "#3D3D3D" }} />;
    const newTeamIcon = <AddIcon style={{ fontSize: "35px", color: "#3D3D3D" }} />;


    return (
      <div>
        <header className="App-header">
          <Header currentPage="/profile" />
        </header>
        <div className="profile-background"></div>
        <div className="menu">
          <Sidebar
            title={sidebarTitle}
            itemType="TEAM"
            teamsList={this.state.teamsList}
          />
          <div className="team-buttons">
            <ModalButton icon={searchTeamIcon} theme="light" type="search-team"/>
            <ModalButton icon={newTeamIcon} theme="light" type="new-team"  userId={this.state.name} refreshProfilePage={this.populatePage} />
          </div>
          <div className="profile-content">
            <ProfileCard className="profile-card" username={this.state.nickname} picture={this.state.picture} />
          </div>
        </div>
      </div>
    );
  }

}

export default Profile;
