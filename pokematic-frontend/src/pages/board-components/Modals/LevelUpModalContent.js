import React from 'react';
import "./TaskModalContent.css"
import "./LevelUpModalContent.css"

function LevelUpModalContent (props) {

    return (
        <div className="modal-content">
        <div className="blocks">
            <div className="new-level">LV. 21</div>
            <div className="title">
            Level Up!
            </div>
            <div className="pokeball"><img src="/images/pokeballPrize.png" alt="prize" className="pokeball" onClick={props.handleClose}/></div>
        </div>
        </div>
    );
}
export default LevelUpModalContent;
