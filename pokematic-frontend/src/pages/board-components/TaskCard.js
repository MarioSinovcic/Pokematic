import React from 'react';
import { Typography } from '@material-ui/core';
import './TaskCard.css';
import Label from './Label';
import StatusDropdown from './StatusDropdown';
import Assignees from './Assignees';



function TaskCard() {
    // These should be passed in as props
    const taskTitle = "Implement collaboration feature";
    const storyPoint = "3";


    return (
        <div class="TaskCard">
            <div className="TaskHeaders">
            <Typography className="TaskTitleText">{taskTitle}</Typography>
                <Typography className="TaskIDText StoryPoint">{storyPoint}</Typography>
            </div>
            <Assignees />
            <div className="TaskLabels">
                <Label />
                <StatusDropdown />

            </div>
            
        </div>
)
}

export default TaskCard;