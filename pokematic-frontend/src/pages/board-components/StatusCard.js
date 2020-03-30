import React from 'react';
import ProgressBar from '../../shared-components/ProgressBar';
import { Typography, Button } from '@material-ui/core';
import './StatusCard.css';
import Label from './Label';
import TaskCard from './TaskCard';
import CreateIcon from '@material-ui/icons/Create'

function StatusCard() {
    // These should be passed in as props
    const teamName = "Team Alpha";
    const temporaryTeamLogo = "/eevee.png";
    const statusTitle = "TODO";

    return (
        <div class="StatusCardShape">
            <div className="StatusBaseShape">
            <div className="StatusHeaders">
                <Typography className="StatusCardTitle">{statusTitle}</Typography>
                </div>
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