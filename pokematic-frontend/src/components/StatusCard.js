import React from 'react';
import ProgressBar from './ProgressBar';
import { Typography, Button } from '@material-ui/core';
import styles from './styledComponents.css';
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
                {/* <Button className="NewTask">New Task <CreateIcon style={{fontSize: "15px", paddingLeft: "5px", color: "#FFFFFF"}}/></Button> */}
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