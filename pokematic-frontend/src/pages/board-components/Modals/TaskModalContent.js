import React from 'react';
import StatusDropdown from '../StatusDropdown'
import "./TaskModalContent.css"

function ModalContent (props) {

    // function handleSatus() {
    //     //note: this should call the API first

    //     props.handleClose();
    // };


    function handleDelete() {
        //note: this should call the API first

        props.handleClose();
    };


    return (
        <div className="modal-content">
            <div className="grouping">
                <p className="task-number">#{props.taskNumber}</p>
                <p className="task-title">{props.taskTitle}</p>
            </div>    
            <div className="grouping padding-bottom-p">
                <p className="goal-name">{props.taskGoal}</p>
                <div className="right-align">
                    <div className="story-points-label">STORY POINTS</div>
                    <div className="story-points">{props.storyPoints}</div>
                </div>
            </div>  
            <div className="grey-group">
                <p className="description-label">Description</p>
                <p className="description">{props.taskDescription}</p>
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
