import React from 'react';
import ProgressBar from './ProgressBar';
import TeamCardShape from './TeamCardShape';
import styles from './styledComponents.css';

function TeamCard() {
    return (
        <div>
            Hello
            <TeamCardShape className="TeamCardPosition">
                <div className="TeamLevelBar"><ProgressBar className="TeamLevelBar"/></div>
            
            </TeamCardShape>

        </div>
    )
}

export default TeamCard;