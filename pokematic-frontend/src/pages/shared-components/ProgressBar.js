import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './ProgressBar.css'

export default function ProgressBar(props) {

  return (
    <div className="progress-bar"> 
      <LinearProgress variant="determinate" value={props.progress} color="primary" className="goal-progress-bar"/>
    </div>
  );
}