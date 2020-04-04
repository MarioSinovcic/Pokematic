import React from 'react';
import StatusDropdown from './StatusDropdown';
import "./ModalContent.css"

function ModalContent () {
    return (
        <div className="modal-content">
            <div className="grouping">
                <p className="task-number">#65</p>
                <p  className="task-title">Implement Navigation Bar</p>
            </div>    
            <div className="grouping padding-bottom">
                <p className="goal-name">Planning Goal</p>
                <div className="right-align">
                    <div className="story-points-label">STORY POINTS</div>
                    <div className="story-points">3</div>
                </div>
            </div>  
            <div className="grey-group">
                <p className="description-label">Description</p>
                <p className="description">
                As a user <br/>
                I would like to navigate between pages <br/>
                So that I can access the different functionalities of the app <br/>
                </p>
            </div>  
            <div className="grouping">
                <p className="status-label">STATUS</p>
                <StatusDropdown/>
                <div className="right-align">
                    <button className="bin-button"/>
                </div>
            </div> 
        </div>
    );


}
export default ModalContent;
