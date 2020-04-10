import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Label from './Label';
import ModalConent from './Modals/TaskModalContent';
import StatusDropdown from './StatusDropdown';
import Assignees from './Assignees';
import './TaskCard.css';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        outline: 'none',
        borderRadius: 15,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));


function TaskCard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handlOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    // - - - not yet handled by API
    const taskGoal = "Some goal";


    return (
        <div>
        <div className="TaskCard" >
            <div className="TaskHeaders" onClick={handlOpen}>
            <Typography className="TaskTitleText">{props.name}</Typography>
                <Typography className="TaskIDText StoryPoint">{props.storyPoints}</Typography>
            </div>
            <Assignees />
            <div className="TaskLabels">
                <Label />
                <StatusDropdown />
            </div>
        </div>
        <div>
            <Modal 
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                disableAutoFocus={true}
                onBackdropClick={handleClose}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ModalConent 
                            id={props.id}
                            name={props.name} 
                            taskNumber={props.taskNumber} 
                            description={props.description} 
                            experiencePoints={props.experiencePoints} 
                            status={props.status} 
                            storyPoints={props.storyPoints}
                            assignees={props.assignees}
                            approved={props.approved}
                            handleClose={handleClose}
                            //not yet implemented
                            taskGoal={taskGoal}
                            />
                    </div>
                </Fade>
            </Modal>
        </div>
    </div>
    )   
}

export default TaskCard;