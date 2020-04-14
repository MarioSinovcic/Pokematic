import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import StatusDropdown from '../StatusDropdown'
import "./NewTaskModalContent.css"

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  taskNameInput: {
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
    const defaultDescription="As a user, \nI want, \nso that, ";

    const [selectedTaskName, setSelectedTaskName] = useState("TASK - " + new Date());
    const [selectedDescription, setSelectedDescription] = useState("");
    const [selectedStoryPoints, setSelectedStoryPoints] = useState("");

    // ----- HANDLERS FOR INPUT FIELDS -----
    const handleTaskNameChange = event => {
        setSelectedTaskName(event.target.value);
    };

    const handleDescriptionChange = event => {
        setSelectedDescription(event.target.value);
    };

    const handleStoryPointChange = event => {
        setSelectedStoryPoints(event.target.value);
    };

    //TODO
    const handleAddGoal = event => {
        
    }

    //TODO
    const handleAddTask = event => {
        const newTask = {
            name: selectedTaskName,
            points: selectedStoryPoints,
            description: selectedDescription,
        };

        props.addNewTask(newTask);
    };


    return (
        <div className="modal-content">
            <div className="grouping">
                <p className="task-number">#65</p>
                <div  className="task-title"> 
                    <TextField 
                        onChange={handleTaskNameChange}
                        defaultValue="Task Name"
                        fullWidth
                        InputProps={{
                            classes: {
                                input: classes.taskNameInput,
                                underline: classes.underline
                            },
                        }}
                    />
                </div>
            </div>    
            <div className="grouping padding-bottom">
                <div className="goal-name-input" 
                    onClick={handleAddGoal}> + ADD GOAL </div>
                <div className="right-align">
                    <div className="story-points-label">STORY POINTS</div>
                    <div className="story-points">
                        <TextField
                            onChange={handleStoryPointChange}
                            id="story-points-input"
                            type="number"
                            onInput={(e)=>{ 
                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)
                            }}
                            defaultValue={1}
                              InputProps={{
                                classes: {
                                    input: classes.storyPointInput,
                                    underline: classes.underline
                                },
                            }}
                        />
                    </div>
                </div>
            </div>  
            <div className="grey-group">
                <p className="description-label">Description</p>
                <div className="description">
                    <TextField
                        onChange={handleDescriptionChange}
                        id="description-input"
                        multiline={true}
                        defaultValue= {defaultDescription}
                        fullWidth
                        rowsMax={7}
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
                <p className="status-label">STATUS</p>
                <div>
                    <StatusDropdown/>
                </div>
                <div className="right-align">
                    <div className="done-button" onClick={handleAddTask}>DONE</div>
                </div>
            </div> 
        </div>
    );
}
export default ModalContent;
