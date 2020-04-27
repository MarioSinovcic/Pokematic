import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Divider, ListItem } from '@material-ui/core';
import ProgressBar from '../../shared-components/ProgressBar';
import {deleteGoal} from '../../apiHandler';
import './Goal.css';

function Goal(props) {
  const [open, setOpen] = React.useState(false);

  const openDeleteGoalModal = () => {
    setOpen(true);
  };

  const closeDeleteGoalModal = () => {
    setOpen(false);
  };

  async function handleDeleteGoal(){
    await deleteGoal(props.teamName, props.name);
    await props.populatePage();
    setOpen(false);
  }

    return (
      <div>
        <div className="team-tabs">
            <ListItem key={props.text} className="team-tabs">
              <div className="goal-heading">
                <Typography className="name-width sidebar-goal-name">{props.name}</Typography>
                <button className="delete-goal-button" onClick={openDeleteGoalModal}></button>
              </div>
                <ProgressBar progress={props.progress *100} />

            </ListItem>
            <Divider className="goal-divider" /> 
        </div>
        <div>
            <Dialog
              open={open}
              onClose={closeDeleteGoalModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div className="delete-modal">
              <DialogTitle disableTypography id="alert-dialog-title">
                <Typography className="delete-modal-title">Delete "{props.name}"?</Typography>
              </DialogTitle>
              <DialogContent >
                <DialogContentText disableTypography id="alert-dialog-description">
                  <Typography className="delete-modal-message">It looks like you are trying to delete a goal. Please remember that deleting a goal will delete all of its tasks too.</Typography>
                </DialogContentText>
              </DialogContent>
              <div className="delete-modal-actions">
                <Button className="cancel-delete" onClick={closeDeleteGoalModal}>Cancel</Button>
                <Button className="confirm-delete" onClick={handleDeleteGoal}/>
              </div>
              </div>
            </Dialog>
      </div>
    </div>  
  )
}

export default Goal;