import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography, Divider } from '@material-ui/core';
import './TeamDetails.css';
import Label from './Label';
import * as colors from './colors'

function TeamDetails(props) {
    function calculateProgress(){
        return ((props.experiencePoints / (props.level *5))*100);
    }

    return (
        <div className={props.isItem && "items"}>
        <div className="team-details">
            <div className="team-icon-bg">
                <img alt="team-logo" src={props.imageUri} className="team-image"></img>
            </div>
            <div className="team-stats">
                <Label labelText={"lv. "+ props.level} color={colors.fire}/>
                <Typography className={props.isItem ? "team-name team-item-text" : "team-name extra-long-text"}>{props.name}</Typography>
                <div className={props.isItem ? "team-level-bar item-width" : "team-level-bar card-width"}>
                    <ProgressBar progress={calculateProgress()}/>
                         <Typography className={props.isItem ? "EXP EXP-text item-text" : "EXP EXP-text"}>EXP: {props.experiencePoints}/ {props.level *5}</Typography>
                </div>
            </div>
        </div>
        <Divider className="GoalDivider" /> 
        </div>
)
}

export default TeamDetails;