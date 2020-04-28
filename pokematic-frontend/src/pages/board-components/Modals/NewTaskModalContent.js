import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {createTask} from '../../../apiHandler';
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
  dropDown:{
    width: 320,
    color: 'white'
  },
  dropDownMenu: {
    paddingLeft: 10, 
    borderRadius: 15,
    fontFamily: 'pkmn_rbygscregular',
    color: 'white'
  },
  dropDownItems:{
    fontFamily: 'pkmn_rbygscregular',
    color: 'white'
  },
  iconGrey: {
    display: "none"
  },
});

function ModalContent (props) {
    const classes = useStyles();
    const defaultDescription="As a user, \nI want, \nso that, ";

    const [selectedTaskName, setSelectedTaskName] = useState("NEW TASK");
    const [selectedGoal, setSelectedGoal] = useState("ADD GOAL +");
    const [selectedDescription, setSelectedDescription] = useState(defaultDescription);
    const [selectedStoryPoints, setSelectedStoryPoints] = useState(1);

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

    const handleGoalChange = event => {
        setSelectedGoal(event.target.value)
    }

    const handleAddTask = async () => {

        if(selectedGoal === "ADD GOAL +"){
            props.showErrorMessage("Task wasn't created, make sure you pick a goal");
        }
        else{
            const newTask = {
                name: selectedTaskName,
                taskNumber: 6, //TODO
                description: selectedDescription,
                experiencePoints: parseInt(selectedStoryPoints),
                status: "TODO", //TODO
                storyPoints: parseInt(selectedStoryPoints),
                assignees: [], //TODO
                approved: false,
            };
            await createTask(newTask, selectedGoal);
            await props.refreshBoardPage();
        }
        props.handleClose();
    };

    var goalsToRender; //This is used to get the goals list dropdown items
    if(!props.goalNames){
        goalsToRender = <div>loading</div>
    }
    else{
        goalsToRender = props.goalNames.map((goalData) => 
            <MenuItem className={classes.dropDownItems} value={goalData}>{goalData}</MenuItem>
        )
    }

    return (
        <div className="new-task-modal-content">
            <div className="grouping">
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
                <div className="goal-name-input">
                <FormControl className={classes.dropDown}  >
                        <Select
                        className={classes.dropDownMenu}
                        id="demo-simple-select-outlined"
                        onChange={handleGoalChange}
                        disableUnderline
                        displayEmpty
                        defaultValue={"ADD GOAL +"}
                        inputProps={{
                            classes: {
                                icon: classes.iconGrey,
                            },
                        }}
                        >
                            <MenuItem className={classes.dropDownItems} value="ADD GOAL +">ADD GOAL +</MenuItem>
                            {goalsToRender}
                        </Select>
                    </FormControl>
                </div>
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
                {/* <p className="status-label">STATUS</p> // still needs to be implemented
                <div>
                    <StatusDropdown/>
                </div> */}
                <div className="right-align">
                    <div className="done-button" onClick={handleAddTask}>DONE</div>
                </div>
            </div> 
        </div>
    );
}
export default ModalContent;
