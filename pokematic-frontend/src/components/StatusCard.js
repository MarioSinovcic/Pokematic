import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography } from '@material-ui/core';
import styles from './styledComponents.css';
import Label from './Label';
import TaskCard from './TaskCard';

function StatusCard() {
    // These should be passed in as props
    const teamName = "Team Alpha";
    const temporaryTeamLogo = "/eevee.png";
    const statusTitle = "TODO";

    return (
        <div class="StatusCardShape">
            <div className="StatusBaseShape">
                <Typography className="StatusCardTitle">{statusTitle}</Typography>
                {/* Dynamically generate cards here */}
                <div className ="Tasks" id="scrollbar">
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />


                </div>
            </div>
            <div className="StatusEdge">
                <div className="StatusCut"></div>
                <div className="StatusBottom"></div> 
            </div>
        </div>
)
}

export default StatusCard;