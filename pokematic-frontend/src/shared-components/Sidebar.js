import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import TeamDetails from './TeamDetails';
import './Sidebar.css'

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
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

export default function Sidebar(props) {
  const classes = useStyles();


  var teamsToRender = props.teamsList.map((teamData) => 
                 <TeamDetails 
                   key={teamData["name"]} //not used: just avoiding warnings
                   id={teamData["id"]} 
                   name={teamData["name"]} 
                   level={teamData["level"]}
                   experiencePoints={teamData["experiencePoints"]}
                   isItem={true}/>
  )

  return (
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
            <ListItem button key={"title"} className="TeamTabs TaskButton">
            <Typography className="TaskFilter AllTasks">{props.title}</Typography>
            </ListItem>
            {props.subTitle && 
             <ListItem button key={"subtitle"} className="TeamTabs">
             <Typography className="TaskFilter MyTasks">{props.subTitle}</Typography>
            </ListItem>}
        </List>
        <Divider className="SideBarDivider"/>
        <List>
              {teamsToRender}
        </List>
      </Drawer>
    </div>
  );
}