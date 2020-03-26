import React from 'react';
import { shape } from "prop-types";
import ProgressBar from './ProgressBar';

function TeamCard() {
    return (
        <div className="Shape">
            <div className="BaseShape ShapeContent">
                <ProgressBar className="TeamProgress"/>
            
            </div>
            <div className="BottomSupport"></div>
            <div className="TriangleCut"></div>
        </div>
    )
}

export default TeamCard;