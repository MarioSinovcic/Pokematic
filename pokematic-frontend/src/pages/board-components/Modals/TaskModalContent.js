import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';
import {deleteTask, updateTask} from '../../../apiHandler';
import "./TaskModalContent.css"

function TaskModalContent (props) {
    var disableCheckBox = false;
    var defaultStatus = false;
    const [showBinButton, setShowBinButton] = useState(true);
    const [selectedApproved, setSelectedApproved] = useState(false);

    if(props.status !== "Done"){
        disableCheckBox = true;
    }

    if(props.approved){
        disableCheckBox = true;
        defaultStatus= true; 
    }

    function handleCheckBox(){
        setSelectedApproved(!selectedApproved);
        setShowBinButton(!showBinButton);
    }

    async function handleDelete() {
        await deleteTask(props.goalName, props.name);
        await props.populatePage();
        props.handleClose();
    };

    async function handleSave() {
        const updatedTask = {
            name: props.name,
            taskNumber: props.taskNumber, 
            description: props.description,
            experiencePoints: parseInt(props.storyPoints),
            status: props.status,
            storyPoints: parseInt(props.storyPoints),
            assignees: props.assignees, 
            approved: selectedApproved,
        };
        await updateTask(updatedTask, props.goalName, props.name);
        await props.populatePage();

        props.handleClose();
    };

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
                <p className="description">{props.description}</p>
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
