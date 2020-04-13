import React from 'react';
import '../Board.css';
import { Typography, Divider, ListItem } from '@material-ui/core';
import ProgressBar from '../../shared-components/ProgressBar';

function Goal(props) {

  function calculateProgress(){
    return (props.progress / props.experiencePoints *100)
  }

    return (
        <div className="TeamTabs">
            <ListItem button key={props.text} className="TeamTabs">
              <Typography className="TaskName">{props.name}</Typography>
              <ProgressBar progress={calculateProgress()} />
            </ListItem>
            <Divider className="GoalDivider" /> 
        </div>
)
}

export default Goal;