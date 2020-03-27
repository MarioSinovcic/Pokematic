import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography } from '@material-ui/core';
import styles from './styledComponents.css';
import Label from './Label';

function TeamCard() {
    const teamName = "Team Alpha";
    const temporaryTeamLogo = "/eevee.png";

    return (
        <div id="CardShape">
            <div className="BaseShape ShapeContent">
                <div className="TeamIconBG">
                    <img src={temporaryTeamLogo} className="TeamImage"></img>
                </div>
                <div className="TeamStats">
                    <Label />
                    <Typography className="TeamName">{teamName}</Typography>
                    <div className="TeamLevelBar ">
                        <ProgressBar/>
                        <Typography className="EXP EXPText">EXP: 100/200</Typography>
                    </div>
                </div>
            </div>
            <div className="BottomSupport"></div>
            <div className="TriangleCut"></div>
        </div>
)
}

export default TeamCard;