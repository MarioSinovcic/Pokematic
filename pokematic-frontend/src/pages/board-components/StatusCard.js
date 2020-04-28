import React from 'react';
import { Typography } from '@material-ui/core';
import './StatusCard.css';
import TaskCard from './TaskCard';

export class StatusCard extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
          taskCards: []
        }
      }
      
    render() {
        if (!this.props.taskList){ 
            return null;
        }
        else{            
            var tasksToRender = this.props.taskList.map((taskData) => 
                <TaskCard 
                    key={taskData["name"]} //not used: just avoiding warnings
                    id={taskData["id"]} 
                    name={taskData["name"]} 
                    taskNumber={taskData["taskNumber"]} 
                    description={taskData["description"]} 
                    experiencePoints={taskData["experiencePoints"]} 
                    status={taskData["status"]} 
                    storyPoints={taskData["storyPoints"]}
                    assignees={taskData["assignees"]}
                    approved={taskData["approved"]}
                    goalName={taskData["goalName"]}
                    populatePage={this.props.populatePage}
                    />
            )

            return (
            <div className="StatusCardShape">
                <div className="StatusBaseShape">
                <div className="StatusHeaders">
                    <Typography className="StatusCardTitle">{this.props.statusTitle}</Typography>
                    </div>
                    {/* Dynamically generate cards here */}
                    <div className ="Tasks" id="scrollbar">
                        {tasksToRender}
                    </div>
                </div>
                <div className="StatusEdge">
                    <div className="StatusCut"></div>
                    <div className="StatusBottom"></div> 
                </div>
            </div>
        );
        }
    } 
}

export default StatusCard;