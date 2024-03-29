import React from 'react';
import Header from './shared-components/Header';
import TeamSidebar from './profile-components/TeamSidebar';
import ProfileCard from './profile-components/ProfileCard';
import ModalButton from './shared-components/ModalButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { getAllTeamsForAUser } from '.././api/users';
import { getAllTeams } from '.././api/teams';
import auth0Client from '../Auth0/Auth';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.populatePage = this.populatePage.bind(this);
    this.signOut = this.signOut.bind(this);

    this.state = {
      teamsList: [], //personal teamlist added below
      allTeamsList: [],
      nickname: "",
      name: "",
      picture: ""
    }
  }

  async componentDidMount() {
    // auth0Client.profile contains user information
    await auth0Client.silentAuth().then(() => this.setState({
        nickname: auth0Client.profile.nickname,
        name: String(auth0Client.profile.name),
        picture: auth0Client.profile.picture
    }));
    this.populatePage();
  }

  populatePage = async () => {
    var apiData =  getAllTeamsForAUser(this.state.name);
    var allTeams =  getAllTeams();

    this.setState({
      teamsList: (await apiData),
      allTeamsList: (await allTeams)
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
          <TeamSidebar
            title={sidebarTitle}
            itemType="TEAM"
            teamsList={this.state.teamsList}
          />
          <div className="team-buttons">
            <ModalButton icon={searchTeamIcon} theme="light" type="search-team" teamsList={this.state.allTeamsList} userId={this.state.name} refreshProfilePage={this.populatePage}/>
            <ModalButton icon={newTeamIcon} theme="light" type="new-team"  userId={this.state.name} refreshProfilePage={this.populatePage} />
          </div>
          <div className="profile-content">
            <ProfileCard className="profile-card" nickname={this.state.nickname} picture={this.state.picture} signOut={this.signOut} />
          </div>
        </div>
      </div>
    );
  }

}

export default Profile;
