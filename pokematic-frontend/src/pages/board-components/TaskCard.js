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
import * as colors from '../../colors';
import {updateTask} from '../../apiHandler';
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

    async function changeStatus(newStatus) {
        const updatedTask = {
            name: props.name,
            number: props.number,
            description: props.description,
            experiencePoints: parseInt(props.storyPoints),
            status: newStatus,
            storyPoints: parseInt(props.storyPoints),
            assignees: props.assignees, 
            approved: props.approved,
        };
        await updateTask(updatedTask, props.teamName, props.goalName, props.name);
        await props.populatePage(props.teamName);
        await props.populatePage(props.teamName);
    };


    return (
        <div>
        <div className="TaskCard" >
            <div className="TaskHeaders" onClick={handlOpen}>
            <Typography className="TaskTitleText">{props.name}</Typography>
                <Typography className="TaskIDText StoryPoint">{props.storyPoints}</Typography>
            </div>
            <Assignees />
            <div className="TaskLabels">
                <Label labelText={props.experiencePoints + " XP"} color={colors.fire}/>
                <StatusDropdown changeStatus={changeStatus} currentStatus={props.status} />
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
                            teamName={props.teamName}
                            number={props.number} 
                            description={props.description} 
                            experiencePoints={props.experiencePoints} 
                            status={props.status} 
                            storyPoints={props.storyPoints}
                            assignees={props.assignees}
                            approved={props.approved}
                            goalName={props.goalName}
                            handleClose={handleClose}
                            populatePage={props.populatePage}
                            openLevelUp={props.openLevelUp}
                            />
                    </div>
                </Fade>
            </Modal>
        </div>
    </div>
    )   
}

export default TaskCard;