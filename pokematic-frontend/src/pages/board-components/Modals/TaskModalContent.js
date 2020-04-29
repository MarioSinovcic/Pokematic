import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';
import {deleteTask, updateTask} from '../../../apiHandler';
import "./TaskModalContent.css"

const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
    },
    descriptionInput: {
        fontFamily: [
            'Roboto Condensed Light', 
            'monospace'
          ].join(','),
        fontSize: 22,
        lineHeight: 1.3,
    },
})

function TaskModalContent (props) {
    const classes = useStyles();
    var disableCheckBox = (props.status !== "Done" || props.approved );
    var defaultStatus = (props.approved);
    const [showBinButton, setShowBinButton] = useState(true);
    const [selectedApproved, setSelectedApproved] = useState(props.approved);
    const [selectedDescription, setSelectedDescription] = useState(props.description);

    const handleDescriptionChange = event => {
        setShowBinButton(false);
        setSelectedDescription(event.target.value);
    }

    const handleCheckBox = event => {
        setShowBinButton(false);
        setSelectedApproved(!selectedApproved);
    }

    async function handleDelete() {
        await deleteTask(props.teamName, props.goalName, props.name);
        await props.populatePage(props.teamName);
        props.handleClose();
    }

    async function handleSave() {
        const updatedTask = {
            name: props.name,
            taskNumber: props.taskNumber, 
            description: selectedDescription,
            experiencePoints: parseInt(props.storyPoints),
            status: props.status,
            storyPoints: parseInt(props.storyPoints),
            assignees: props.assignees, 
            approved: selectedApproved,
        };
        await updateTask(updatedTask, props.teamName, props.goalName, props.name);
        await props.populatePage(props.teamName);
        await props.populatePage(props.teamName);
        props.handleClose();
    }

    return (
        <div className="modal-content">
            <div className="grouping">
                <p className="task-number">#{props.taskNumber}</p>
                <p className="modal-task-title">{props.name}</p>
            </div>    
            <div className="grouping padding-bottom-p">
                <p className="goal-name">{props.goalName}</p>
                <div className="right-align">
                    <div className="story-points-label">STORY POINTS</div>
                    <div className="story-points">{props.storyPoints}</div>
                </div>
            </div>  
            <div className="grey-group">
                <p className="description-label">Description</p>
                <p className="description">
                <TextField
                        onChange={handleDescriptionChange}
                        id="description-input"
                        multiline={true}
                        defaultValue= {props.description}
                        fullWidth
                        rowsMax={7}
                        InputProps={{
                            classes: {
                                input: classes.descriptionInput,
                                underline: classes.underline
                            },
                        }}
                    />
                </p>
            </div>  
            <div className="grouping">
                <div className="approved-section">
                    <FormControlLabel
                        disabled={disableCheckBox}
                        value="start"
                        control={<Checkbox color={"default"} onChange={handleCheckBox} defaultChecked={defaultStatus}/>}
                        label={
                            <Typography className="approved-label"> APPROVED? </Typography>
                        }
                        labelPlacement="start"
                    />
                </div>
                <div className="right-align">
                    {showBinButton && <button className="bin-button" onClick={handleDelete}/>}
                    {!showBinButton && <button className="save-button" onClick={handleSave}>SAVE</button>}
                </div>
            </div> 
        </div>
    );
}
export default TaskModalContent;
