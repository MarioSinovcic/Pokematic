import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography } from '@material-ui/core';
import './TeamCard.css';
import Label from '../pages/board-components/Label';
import TeamDetails from './TeamDetails';

function TeamCard() {
    const teamName = "Team Alpha";
    const temporaryTeamLogo = "/images/eevee.png";

    return (
        <div id="CardShape">
            <div className="base-shape shape-content">
                <TeamDetails />
            </div>
            <div className="bottom-support"></div>
            <div className="triangle-cut"></div>
        </div>
)
}

export default TeamCard;