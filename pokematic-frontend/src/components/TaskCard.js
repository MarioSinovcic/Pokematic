import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography } from '@material-ui/core';
import styles from './styledComponents.css';
import Label from './Label';
import StatusDropdown from './StatusDropdown';
import { sizing } from '@material-ui/system';

function TaskCard() {
    // These should be passed in as props
    const taskID = "34"
    const taskTitle = "Implement collaboration feature";


    return (
        <div class="TaskCard">
            <div className="TaskHeaders">
            <Typography className="TaskTitleText">{taskTitle}</Typography>
                <Typography className="TaskIDText">#{taskID}</Typography>
            </div>
            <div className="TaskLabels">
                <Label />
            <StatusDropdown />

            </div>
            
        </div>
)
}

export default TaskCard;