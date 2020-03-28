import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import NavigationIcon from '@material-ui/icons/Navigation';

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
