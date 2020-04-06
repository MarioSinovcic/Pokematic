import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import StatusDropdown from '../StatusDropdown'
import "./NewTaskModalContent.css"

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  taskNameInput: {
    fontFamily: [
        'Roboto Mono', 
        'monospace'
      ].join(','),
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 600,
  },
  storyPointInput: {
    fontFamily: 'pkmn_rbygscregular',
    fontSize: 30,
    fontWeight: 600,
    color: '#F74747',
    min: "0",
    max: "99",
  },
  descriptionInput: {
    fontFamily: [
        'Roboto Condensed Light', 
        'monospace'
      ].join(','),
    fontSize: 22,
  },

});

function ModalContent (props) {
    const classes = useStyles();
    const defaultDescription="As a user, \nI want, \nso that, ";

    

    function handleAddGoal() {

    }

    const handleAddTask = event => {
        //note: this should call the API first

        props.handleClose();
    };


    return (
        <div className="modal-content">
            <div className="grouping">
                <p className="task-number">#65</p>
                <div  className="task-title"> 
                    <TextField
                        defaultValue="Task Name"
                        fullWidth
                        InputProps={{
                            classes: {
                                input: classes.taskNameInput,
                                underline: classes.underline
                            },
                        }}
                    />
                </div>
            </div>    
            <div className="grouping padding-bottom">
                <div className="goal-name-input" onClick={handleAddGoal}> + ADD GOAL </div>
                <div className="right-align">
                    <div className="story-points-label">STORY POINTS</div>
                    <div className="story-points">
                        <TextField
                            id="story-points-input"
                            type="number"
                            inputProps={{ min: "0", max: "99", step: "1"}}
                            defaultValue={1}
                              InputProps={{
                                classes: {
                                    input: classes.storyPointInput,
                                    underline: classes.underline
                                },
                            }}
                        />
                    </div>
                </div>
            </div>  
            <div className="grey-group">
                <p className="description-label">Description</p>
                <div className="description">
                    <TextField
                        id="description-input"
                        multiline={true}
                        defaultValue= {defaultDescription}
                        fullWidth
                        rowsMax={8}
                        InputProps={{
                            classes: {
                                input: classes.descriptionInput,
                                underline: classes.underline
                            },
                        }}
                    />
                </div>
            </div>  
            <div className="grouping">
                <p className="status-label">STATUS</p>
                <div>
                    <StatusDropdown/>
                </div>
                <div className="right-align">
                    <div className="done-button" onClick={handleAddTask}>DONE</div>
                </div>
            </div> 
        </div>
    );
}
export default ModalContent;
