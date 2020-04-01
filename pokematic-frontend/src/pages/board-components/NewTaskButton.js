import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './NewTaskButton.css';


function NewTaskButton() {

  return (
    <div>
      <div>
        <Fab color="secondary" aria-label="add" className="NewTaskButton NewTaskButtonColors">
          <AddIcon style={{fontSize: "35px"}}/>
        </Fab>
      </div>
    </div>
  );
}

export default NewTaskButton;
