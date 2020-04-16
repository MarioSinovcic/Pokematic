import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import "./NewGoalModalContent.css"

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  goalNameInput: {
    fontFamily: [
        'Roboto Condensed', 
        'monospace'
      ].join(','),
    fontSize: 30,
    color: "#3D3D3D",
    lineHeight: 35,
    fontWeight: 600,
  },
  descriptionInput: {
    fontFamily: [
        'Roboto Condensed Light', 
        'monospace'
      ].join(','),
    fontSize: 22,
    lineHeight: 1.3,
  },
  dropDown:{
      width: 200,
  },
  dropDownMenu: {
    borderRadius: 15,
    fontFamily: 'pkmn_rbygscregular',
  },
  dropDownItems:{
    fontFamily: 'pkmn_rbygscregular',
    color: 'white'
  },
  icon: {
    fill: "red",
  },
});

function ModalContent (props) {
    const classes = useStyles();
    const defaultDescription = "This goal encapsulates ...."

    const [selectedGoalName, setSelectedGoalName] = useState("GOAL: " + new Date());
    const [selectedDescription, setSelectedDescription] = useState("No description added");
    const [selectedDifficulty, setSelectedDifficulty] = useState(30);

    // ----- HANDLERS FOR INPUT FIELDS -----
    const handleGoalNameChange = event => {
        setSelectedGoalName(event.target.value);
    };

    const handleDescriptionChange = event => {
        setSelectedDescription(event.target.value);
    };

    const handleDifficultyChange = event => {
        setSelectedDifficulty(event.target.value);
    };

    //TODO
    const handleAddGoal = event => {
        const newGoal = {
            name: selectedGoalName,
            description: selectedDescription,
            tasks: [],
            experiencePoints: selectedDifficulty,
            progress: 0
        };

        props.addNewGoal(newGoal);
    };

    return (
        <div className="goal-modal-content">
            <div className="grouping">
                <div  className="goal-title"> 
                    <TextField 
                        onChange={handleGoalNameChange}
                        defaultValue="Goal Name"
                        fullWidth
                        InputProps={{
                            classes: {
                                input: classes.goalNameInput,
                                underline: classes.underline
                            },
                        }}
                    />
                </div>
            </div>    
            <div className="goal-grey-group">
                <p className="description-label">Description</p>
                <div className="description">
                    <TextField
                        onChange={handleDescriptionChange}
                        id="description-input"
                        multiline={true}
                        defaultValue= {defaultDescription}
                        fullWidth
                        rowsMax={4}
                        InputProps={{
                            classes: {
                                input: classes.descriptionInput,
                                underline: classes.underline
                            },
                        }}
                    />
                </div>
            </div>  
            <div className="grouping">
                    <FormControl variant="outlined" className={classes.dropDown}  >
                        <Select
                        className={classes.dropDownMenu}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={handleDifficultyChange}
                        inputProps={{
                            classes: {
                                icon: classes.icon,
                            },
                        }}
                        >
                            <MenuItem className={classes.dropDownItems} value={10}>Easy</MenuItem>
                            <MenuItem className={classes.dropDownItems} value={20}>Medium</MenuItem>
                            <MenuItem className={classes.dropDownItems} value={30}>Hard</MenuItem>
                        </Select>
                    </FormControl>
                <div className="right-align">
                    <div className="done-button" onClick={handleAddGoal}>DONE</div>
                </div>
            </div> 
        </div>
    );
}
export default ModalContent;
