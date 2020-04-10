import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography, Divider } from '@material-ui/core';
import './TeamDetails.css';
import Label from '../pages/board-components/Label';

function TeamDetails(props) {
    const teamName = "Team Alpha";
    const temporaryTeamLogo = "/images/eevee.png";


    return (
        <div className={props.isItem && "items"}>
        <div className="team-details">
            <div className="team-icon-bg">
                <img alt="team-logo" src={temporaryTeamLogo} className="team-image"></img>
            </div>
            <div className="team-stats">
                <Label />
                <Typography className={props.isItem ? "team-name team-item-text" : "team-name"}>{teamName}</Typography>
                <div className={props.isItem ? "team-level-bar item-width" : "team-level-bar card-width"}>
                    <ProgressBar progress={60}/>
                    <Typography className={props.isItem ? "EXP EXP-text item-text" : "EXP EXP-text"}>EXP: 100/200</Typography>
                </div>
            </div>
        </div>
        <Divider className="GoalDivider" /> 
        </div>
)
}

export default TeamDetails;