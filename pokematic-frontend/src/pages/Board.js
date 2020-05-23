import React from 'react';
import auth0Cilent from '../Auth0/Auth';
import GoalSidebar from './board-components/GoalSideBar';
import TeamCard from './shared-components/TeamCard';
import StatusCard from './board-components/StatusCard';
import ModalButton from './shared-components/ModalButton';
import Header from './shared-components/Header';
import AddIcon from '@material-ui/icons/Add';
import LevelUpModalContent from './board-components/Modals/LevelUpModalContent';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { connect } from 'react-redux';
import { togglePokemonLoad, addPokemonData, addPokemonNames, addPokemonTypes } from '../actions/actions';
import { populateBoardPage } from '.././api/goals';
import {getTeamInfo} from '.././api/teams';
import { fetchPokemonData, fetchPokemonTypes } from '.././api/pokemon';
import './Board.css'

class Board extends React.Component {
  constructor(props){
    super(props);

    this.populatePage = this.populatePage.bind(this);
    this.handleOpenLevelUpModal = this.handleOpenLevelUpModal.bind(this);

    this.state = {
      teamName: this.props.match.params.teamName,
      goalsList: [],
      goalNames: [],
      taskNames: [],
      todoList: [],
      inProgressList: [],
      inReviewList: [],
      doneList: [],
      openLevelUp: false,
      teamLevel: "",
    }
  }

  componentDidMount(){
    auth0Cilent.silentAuth();
    this.populatePage();
    if (!this.props.isLoaded) {
      this.getPokemonData();
      this.props.togglePokemonHasLoaded();
    }
  }

  async getPokemonData() {
    // Get a list of pokemon Names and their URLs
    await fetchPokemonData().then((results)=> {this.props.addPokemon(results)});

    await this.props.pokemonMap.map((pokemon, i) => {
        const getTypes = fetchPokemonTypes(pokemon.url);
        return (
        getTypes.then((data) => {
          this.props.addPokemonTypes(data.name, data.types);
        }));
    })

    this.props.addPokemonData(this.populatePokemon(this.props.pokemonMap));
  }

  populatePokemon(pokemonCollection) {
    var populatedPokemon = [];
    pokemonCollection.map((pokemonData, i) => {
      return (
        populatedPokemon.push({
            number: i,
            name: pokemonData && pokemonData.name,
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (i + 1) + ".png",
        })
      );
    })
    return populatedPokemon;
  }

  populatePage = async () => {
    var goalApiData = populateBoardPage(this.state.teamName);
    var teamApiData = getTeamInfo(this.state.teamName);

    this.setState({
      teamName: this.props.match.params.teamName,
      teamLevel: (await teamApiData).level,
      teamExp: (await teamApiData).experiencePoints,
      goalsList: (await goalApiData).goalsList,
      goalNames: (await goalApiData).goalNames,
      taskNames: (await goalApiData).taskNames,
      todoList: (await goalApiData).todoList,
      inProgressList: (await goalApiData).inProgressList,
      inReviewList: (await goalApiData).inReviewList,
      doneList: (await goalApiData).doneList,
    })
  }
  
  handleOpenLevelUpModal(newTeamLevel) {
    this.setState({
      openLevelUp: true,
      teamLevel: newTeamLevel
    })
  };

  handleCloseLevelUpModal() {
    this.setState({
      openLevelUp: false,
    })
  };
  
  render(){
    if(this.state.response === []){
      return(<div>loading</div>)
    }
    else{
    return (
        <div>
          <div className="board-page">
          <Header teamName={this.state.teamName} currentPage="/board"/>
          <div className="team-card">
                <TeamCard teamName={this.state.teamName} teamLevel={this.state.teamLevel} teamExp={this.state.teamExp} goals={this.state.goalsList}/>
          </div>
            <div className="menu">
            <GoalSidebar 
              populatePage={this.populatePage} 
              goalNames ={this.state.goalNames} 
              goalsList={this.state.goalsList} 
              teamName={this.state.teamName}
            />
            </div>
            <div className="tasks-content">
              <div className="todo-status">
              <StatusCard statusTitle={"TODO"} taskList={this.state.todoList} populatePage={this.populatePage} openLevelUp={this.handleOpenLevelUpModal}  teamName={this.state.teamName}/>
              <StatusCard statusTitle={"IN PROGRESS"} taskList={this.state.inProgressList} populatePage={this.populatePage} openLevelUp={this.handleOpenLevelUpModal} teamName={this.state.teamName}/>
              <StatusCard statusTitle={"IN REVIEW"} taskList={this.state.inReviewList} populatePage={this.populatePage} openLevelUp={this.handleOpenLevelUpModal} teamName={this.state.teamName}/>
              <StatusCard statusTitle={"DONE"} taskList={this.state.doneList} populatePage={this.populatePage} openLevelUp={this.handleOpenLevelUpModal} teamName={this.state.teamName}/>
              </div>
            </div>
            <div className="new-task-button">
              <ModalButton 
                populatePage={this.populatePage} 
                taskNames={this.state.taskNames}
                goalNames ={this.state.goalNames} 
                teamName={this.state.teamName}
                icon={<AddIcon style={{fontSize: "35px"}}/>} theme="dark" type="new-task"
              />
            </div>
          </div>
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={this.state.openLevelUp}
              disableAutoFocus={true}
              onBackdropClick={() => this.handleOpenLevelUpModal()}
              onClose={() => this.handleCloseLevelUpModal()}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.openLevelUp}>
                <div>
                  {/* Temporary error handling to load pokedex first */}
                  {this.props.pokemonData[1] ? 
                  <LevelUpModalContent
                    teamName={this.state.teamName}
                    handleClose={this.handleCloseLevelUpModal.bind(this)}
                    newTeamLevel={this.state.teamLevel}
                  />
                  : ""}
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
     );
  }
}
}

const mapStateToProps = (state) => {
  return {
    pokemonMap: state.pokemonURL,
    pokemonTypes: state.pokemonTypes,
    pokemonData: state.pokemonData,
    isLoaded: state.isLoaded,
    pokemonCollection: state.pokemonCollection,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePokemonHasLoaded: () => {
      dispatch(togglePokemonLoad())
    },
    addPokemonData: (pokemon) => {
      dispatch(addPokemonData(pokemon))
    },
    addPokemon: (pokemon) => {
      dispatch(addPokemonNames(pokemon))
    },
    addPokemonTypes: (pokemonName, pokemonType) => {
      dispatch(addPokemonTypes(pokemonName, pokemonType))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
