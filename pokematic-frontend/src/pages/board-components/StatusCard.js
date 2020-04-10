import React from 'react';
import { Typography } from '@material-ui/core';
import './StatusCard.css';
import TaskCard from './TaskCard';

function StatusCard() {
    // These should be passed in as props
    const statusTitle = "TODO";

    return (
        <div className="StatusCardShape">
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