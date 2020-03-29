import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography } from '@material-ui/core';
import styles from './styledComponents.css';
import Label from './Label';
import StatusDropdown from './StatusDropdown';
import { sizing } from '@material-ui/system';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

function Assignees() {
    // These should be passed in as props
    const taskID = "34"
    const taskTitle = "Implement collaboration feature";



    return (
        <div className="AvatarContent">
        <AvatarGroup max={3}>
        <Avatar>M</Avatar>
        <Avatar>V</Avatar>
        <Avatar>C</Avatar>
        <Avatar>S</Avatar>
</AvatarGroup>
            
        </div>
)
}

export default Assignees;