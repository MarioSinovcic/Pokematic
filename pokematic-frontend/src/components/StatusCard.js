import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography } from '@material-ui/core';
import styles from './styledComponents.css';
import Label from './Label';

function StatusCard() {
    const teamName = "Team Alpha";
    const temporaryTeamLogo = "/eevee.png";

    return (
        <div class="StatusCardShape">
            <div className="StatusBaseShape"></div>
            <div className="StatusEdge">
                <div className="StatusCut"></div>
                <div className="StatusBottom"></div> 
            </div>
        </div>
)
}

export default StatusCard;