import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    colorPrimary: '#ffffff',
  },
}));

export default function ProgressBar() {
  const classes = useStyles();
  const completed = 30;



  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={completed} color="primary" className="GoalProgressBar"/>
    </div>
  );
}