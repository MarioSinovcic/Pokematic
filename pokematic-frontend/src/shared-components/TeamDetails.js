import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography } from '@material-ui/core';
import './TeamDetails.css';
import Label from '../pages/board-components/Label';

function TeamDetails() {
    const teamName = "Team Alpha";
    const temporaryTeamLogo = "/images/eevee.png";

    return (
        <div className="team-details">
            <div className="team-icon-bg">
                <img alt="team-logo" src={temporaryTeamLogo} className="team-image"></img>
            </div>
            <div className="team-stats">
                <Label />
                <Typography className="team-name">{teamName}</Typography>
                <div className="team-level-bar ">
                    <ProgressBar/>
                    <Typography className="EXP EXP-text">EXP: 100/200</Typography>
                </div>
            </div>
        </div>
)
}

export default TeamDetails;