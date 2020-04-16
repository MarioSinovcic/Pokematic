import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
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
        'Roboto Mono', 
        'monospace'
      ].join(','),
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 600,
  },
  storyPointInput: {
    fontFamily: 'pkmn_rbygscregular',
    fontSize: 30,
    fontWeight: 600,
    color: '#F74747',
    min: "0",
    max: "99",
  },
  descriptionInput: {
    fontFamily: [
        'Roboto Condensed Light', 
        'monospace'
      ].join(','),
    fontSize: 22,
    lineHeight: 1.3,
  },

});

function ModalContent (props) {
    const classes = useStyles();
    const defaultDescription = "This task needs to be done because ...."

    const [selectedGoalName, setSelectedGoalName] = useState("GOAL: " + new Date());
    const [selectedDescription, setSelectedDescription] = useState("No description added");
    const [selectedDifficulty, setSelectedDifficulty] = useState("EASY");

    // ----- HANDLERS FOR INPUT FIELDS -----
    const handleGoalNameChange = event => {
        setSelectedGoalName(event.target.value);
    };

    const handleDescriptionChange = event => {
        setSelectedDescription(event.target.value);
    };

    const handleDifficultyChange = event => {
        if(event.target.value === "EASY"){
            setSelectedDifficulty(10);
        }
    };

    //TODO
    const handleAddGoal = event => {
        const newGoal = {
            name: selectedGoalName,
            description: selectedDescription,
            tasks: [],
            experiencePoints: 10,
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
                <p className="difficulty-label">DIFFICULTY</p>
                <div>
                    DiffucltyDropDown
                </div>
                <div className="right-align">
                    <div className="done-button" onClick={handleAddGoal}>DONE</div>
                </div>
            </div> 
        </div>
    );
}
export default ModalContent;
