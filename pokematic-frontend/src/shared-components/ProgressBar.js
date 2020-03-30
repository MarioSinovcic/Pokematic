import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './ProgressBar.css'

export default function ProgressBar() {
  const completed = 30;

  return (
    <div className="progress-bar"> 
      <LinearProgress variant="determinate" value={completed} color="primary" className="goal-progress-bar"/>
    </div>
  );
}