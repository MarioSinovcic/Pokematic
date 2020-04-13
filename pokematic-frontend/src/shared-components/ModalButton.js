import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import NewTaskModalContent from '../pages/board-components/Modals/NewTaskModalContent'
import './ModalButton.css';

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


function ModalButton(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handlOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const addNewTask = (newTask) => {
    //TODO
    console.log("New task added called: " + newTask.name)

    setOpen(false);
  };

  let renderModal;
  switch(props.type) {

    case "new-task":
    renderModal = <NewTaskModalContent addNewTask={addNewTask}/>
    break;

    case "search-team":
    renderModal = "To be Completed";
      break; 

    case "new-team":
    renderModal = "To be Completed";
    break;

    default:
    break;
  }


  return (
    <div>
      <div>
        <Fab color="secondary" aria-label="add" className={props.theme === "light" ? "light-theme-bg" : "dark-theme-bg"} onClick={handlOpen}>
          {props.icon}
        </Fab>
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
                {renderModal}
              </div>
            </Fade>
          </Modal>
        </div>
    </div>
  );
}

export default ModalButton;
