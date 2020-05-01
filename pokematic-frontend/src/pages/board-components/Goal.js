import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Divider, ListItem } from '@material-ui/core';
import ProgressBar from '../../shared-components/ProgressBar';
import {deleteGoal, updateGoal} from '../../apiHandler';
import './Goal.css';

export class Goal extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      open: false
    }
  }
  
  async componentDidMount(){
    if(this.props.progress >= 1 && !this.props.completed){
      const updatedGoal = {
        name: this.props.name,
        description: this.props.description,
        completed: true,
        tasks: this.props.tasks,
        experiencePoints: this.props.experiencePoints,
        progress: this.props.progress
      };
    await updateGoal(updatedGoal, this.props.teamName, this.props.name);
    await this.props.populatePage(this.props.teamName);
    }
  }


  openDeleteGoalModal = () => {
    this.setState({open: true});
  };

  closeDeleteGoalModal = () => {
    this.setState({open: false});
  };

  handleDeleteGoal = async () => {
    await deleteGoal(this.props.teamName, this.props.name);
    await this.props.populatePage(this.props.teamName);
    await this.props.populatePage(this.props.teamName);
    this.setState({open: false});
  }
  render(){
    return (
      <div>
        <div className="team-tabs">
            <ListItem key={this.props.text} className="team-tabs">
              <div className="goal-heading">
                <Typography className="name-width sidebar-goal-name">{this.props.name}</Typography>
                <button className="delete-goal-button" onClick={this.openDeleteGoalModal}></button>
              </div>
                <ProgressBar progress={this.props.progress *100} />

            </ListItem>
            <Divider className="goal-divider" /> 
        </div>
        <div>
            <Dialog
              open={this.state.open}
              onClose={this.closeDeleteGoalModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div className="delete-modal">
              <DialogTitle disableTypography id="alert-dialog-title">
                <Typography className="delete-modal-title">Delete "{this.props.name}"?</Typography>
              </DialogTitle>
              <DialogContent >
                <DialogContentText disableTypography id="alert-dialog-description">
                  <Typography className="delete-modal-message">It looks like you are trying to delete a goal. Please remember that deleting a goal will delete all of its tasks too.</Typography>
                </DialogContentText>
              </DialogContent>
              <div className="delete-modal-actions">
                <Button className="cancel-delete" onClick={this.closeDeleteGoalModal}>Cancel</Button>
                <Button className="confirm-delete" onClick={this.handleDeleteGoal}/>
              </div>
              </div>
            </Dialog>
      </div>
    </div>  
  )
}
}

export default Goal;