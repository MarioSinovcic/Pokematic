import React from 'react';
import './Assignees.css';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

function Assignees() {

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