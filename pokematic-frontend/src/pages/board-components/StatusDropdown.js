import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './StatusDropdown.css';

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  dropDown:{
      width: 120,
  },
  dropDownMenu: {
    textAlign: "right",
    fontSize: 10,
    borderRadius: 15,
    fontFamily: 'pkmn_rbygscregular',
  },
  dropDownItems:{
    fontFamily: 'pkmn_rbygscregular',
    color: 'white',

  },
  icon: {
    fill: "red",
  },
});

function StatusDropdown(props) {
  const classes = useStyles();

  const handleStausChange = event => {
    var newStatus = event.target.value;
    if(newStatus === 'TODO' || newStatus === 'In Progress' || newStatus === 'In Review' || newStatus === 'Done'){
      props.changeStatus(newStatus);
    }
  };
  
    return(
      <FormControl className={classes.dropDown}  >
        <Select
        className={classes.dropDownMenu}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        onChange={handleStausChange}
        defaultValue={props.currentStatus}
        disableUnderline
        inputProps={{
            classes: {
                icon: classes.icon,
            },
        }}
      > 
          <MenuItem className={classes.dropDownItems} value={'TODO'}>To Do</MenuItem>
          <MenuItem className={classes.dropDownItems} value={'In Progress'}>In Progress</MenuItem>
          <MenuItem className={classes.dropDownItems} value={'In Review'}>In Review</MenuItem>
          <MenuItem className={classes.dropDownItems} value={'Done'}>Done</MenuItem>
      </Select>
  </FormControl>
    )
}

export default StatusDropdown;