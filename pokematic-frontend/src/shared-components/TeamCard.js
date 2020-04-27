import React from 'react';
import './TeamCard.css';
import TeamDetails from './TeamDetails';

function TeamCard() {

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