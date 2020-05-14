import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import {checkTeamName, createTeam} from '../../../apiHandler';
import "./NewTeamModalContent.css";

const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
    },
    teamNameInput: {
        fontFamily: [
            'Roboto Condensed Light', 
            'monospace'
          ].join(','),
        fontSize: 22,
        lineHeight: 1.3,
      },
})

function NewTeamModalContent (props) {
    const classes = useStyles();
    const [selectedTeamName, setSelectedTeamName] = useState("Team Name");

    const handleTeamNameChange = event => {
        setSelectedTeamName(event.target.value.trim());
    };

    const handleCreateTeam = async () => {
        if(selectedTeamName === "Team Name" || selectedTeamName === ""){
            props.showErrorMessage("Team wasn't created, please enter a valid team name");
        }else{
            var teamNameInUse = await checkTeamName(selectedTeamName);
            if(teamNameInUse){
                props.showErrorMessage("Team wasn't created, team name already in use");
            }else{
                var randomPokemonURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ Math.floor(Math.random() * 151) +".png";
                const newTeam = {
                            name: selectedTeamName.trim(),
                            imageUri: randomPokemonURL,
                            users: [props.userId],
                            goals: [],
                            level: 1,
                            experiencePoints: 0,
                            pokemon: []
                        };
                await createTeam(newTeam);
                await props.refreshProfilePage();
            }
        }
        props.handleClose();

    }

    return (
        <div className="team-modal-content">
                <div className="new-team-label">
                    CREATE NEW TEAM
                </div>
                <div  className="grey-group-team"> 
                    <TextField 
                        className="team-name"
                        onChange={handleTeamNameChange}
                        defaultValue=" "
                        fullWidth
                        inputProps={{
                            maxLength: 16,
                        }}
                        InputProps={{
                            classes: {
                                input: classes.teamNameInput,
                                underline: classes.underline
                            },
                        }}
                    />
                </div>
                <div className="right-align">
                    <div className="done-button" onClick={handleCreateTeam}>DONE</div>
                </div>
        </div>
    );
}
export default NewTeamModalContent;
