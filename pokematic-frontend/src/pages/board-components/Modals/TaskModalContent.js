import React from 'react';
import StatusDropdown from '../StatusDropdown';
import {deleteTask} from '../../../apiHandler';
import "./TaskModalContent.css"

function ModalContent (props) {

    async function handleDelete() {
        deleteTask(props.goalName, props.name);
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
                <p className="status-label">STATUS</p>
                <div>
                    <StatusDropdown/>
                </div>
                <div className="right-align">
                    <button className="bin-button" onClick={handleDelete}/>
                </div>
            </div> 
        </div>
    );


}
export default ModalContent;
