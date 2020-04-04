import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import NewTaskModalContent from './Modals/NewTaskModalContent'
import './NewTaskButton.css';

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


function NewTaskButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handlOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <div>
        <Fab color="secondary" aria-label="add" className="NewTaskButton NewTaskButtonColors" onClick={handlOpen}>
          <AddIcon style={{fontSize: "35px"}}/>
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
                <NewTaskModalContent handleClose={handleClose}/>
              </div>
            </Fade>
          </Modal>
        </div>
    </div>
  );
}

export default NewTaskButton;
