import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Label from './Label';
import ModalConent from './ModalContent';
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


function TaskCard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handlOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    // These should be passed in as props
    const taskTitle = "Implement collaboration feature";
    const taskDescription = "As a student, I want to be able to collaborate with my team mates, so that we can all work on the project together.";
    const storyPoint = "3";


    return (
        <div>
            <div className="TaskCard" onClick={handlOpen}>
                <div className="TaskHeaders">
                <Typography className="TaskTitleText">{taskTitle}</Typography>
                    <Typography className="TaskIDText StoryPoint">{storyPoint}</Typography>
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
                        <ModalConent/>
                    </div>
                </Fade>
            </Modal>
        </div>
    </div>
    )   
}

export default TaskCard;