import React from 'react';
import {deleteTask} from '../../../apiHandler';
import "./TaskModalContent.css"

function TaskModalContent (props) {

    async function handleApprove() {
        //TODO: approveTask();
    };

    async function handleDelete() {
        await deleteTask(props.goalName, props.name);
        await props.populatePage();
        props.handleClose();
    };

    return (
        <div className="modal-content">
            <div className="grouping">
                <p className="task-number">#{props.taskNumber}</p>
                <p className="task-title">{props.name}</p>
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
                <button className="approve-button" onClick={handleApprove}>APPROVE</button>
                <div className="right-align">
                    <button className="bin-button" onClick={handleDelete}/>
                </div>
            </div> 
        </div>
    );
}
export default TaskModalContent;
