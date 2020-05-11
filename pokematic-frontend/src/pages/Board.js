import React from 'react';
import GoalSidebar from './board-components/GoalSideBar';
import TeamCard from '../shared-components/TeamCard';
import StatusCard from './board-components/StatusCard';
import ModalButton from '../shared-components/ModalButton';
import Header from '../shared-components/Header';
import AddIcon from '@material-ui/icons/Add';
import { populateBoardPage, fetchPokemonData, fetchPokemonTypes } from '.././apiHandler';
import LevelUpModalContent from './board-components/Modals/LevelUpModalContent';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { togglePokemonLoad, addPokemonData, addPokemonNames, addPokemonTypes } from '../actions/actions';
import './Board.css'
import auth0Cilent from '../Auth0/Auth';

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
    }
  }

  componentDidMount(){
    auth0Cilent.silentAuth();
    console.log(auth0Cilent);
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
    var apiData = populateBoardPage(this.state.teamName);

    this.setState({
      teamName: this.props.match.params.teamName,
      goalsList: (await apiData).goalsList,
      goalNames: (await apiData).goalNames,
      taskNames: (await apiData).taskNames,
      todoList: (await apiData).todoList,
      inProgressList: (await apiData).inProgressList,
      inReviewList: (await apiData).inReviewList,
      doneList: (await apiData).doneList,
    })
  }
  
  handleOpenLevelUpModal() {
    this.setState({
      openLevelUp: true,
    })
  };

  handleCloseLevelUpModa() {
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
                <TeamCard teamName={this.state.teamName}/>
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
              <Button style={{ size: "50px", backgroundColor: "red" }} onClick={() => this.handleOpen()} > Level up! </Button>
            </div>
          </div>
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={this.state.openLevelUp}
              disableAutoFocus={true}
              onBackdropClick={() => this.handleOpenLevelUpModa()}
              onClose={() => this.handleCloseLevelUpModa()}
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
                    handleClose={this.handleCloseLevelUpModa.bind(this)}
                    pokemonData={this.props.pokemonData}
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
