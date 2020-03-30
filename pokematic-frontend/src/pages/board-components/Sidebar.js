import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ProgressBar from '../../shared-components/ProgressBar';
import './Sidebar.css'

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

export default function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Pokematic
          </Typography>
        </Toolbar>
      </AppBar> */}
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
          {/* Dynamically fetch goals here */}
          {['Planning', 'Frontend Team', 'Testers', 'Design Squad'].map((text, index) => (
            <div className="TeamTabs">
            <ListItem button key={text} className="TeamTabs">
              <Typography className="TaskName">{text}</Typography>
              <ProgressBar />
            </ListItem>
            <Divider className="GoalDivider" /> 
            </div>
          ))}
        </List>
      </Drawer>
    </div>
  );
}