import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Goal from './Goal';
import './GoalSideBar.css'

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));


export class GoalSideBar extends React.Component {

  render (){
    const classes = useStyles;

    if (!this.props.goalsList){ 
      return null;
    }
    else{         
        var goalsToRender = this.props.goalsList.map((goalData) => 
            <Goal 
                key={goalData["id"]} //not used: just avoiding warnings
                id={goalData["id"]} 
                name={goalData["name"]} 
                experiencePoints={goalData["experiencePoints"]} 
                progress={goalData["progress"]} 
                />
          )
      return(
        <div className={classes.root}>
          <Drawer
            className="SideBar"
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <List>
            
                <ListItem button key={"All Tasks"} className="TeamTabs TaskButton">
                <Typography className="TaskFilter AllTasks">ALL TASKS</Typography>
                </ListItem>

                <ListItem button key={"My Tasks"} className="TeamTabs">
                <Typography className="TaskFilter MyTasks">MY TASKS</Typography>
                </ListItem>
            </List>
            <Divider className="SideBarDivider"/>
            <List>
              {goalsToRender}
            </List>
          </Drawer>
        </div>
      );
    }
  }
}

export default GoalSideBar;