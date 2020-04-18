import React from 'react';
import { Button } from '@material-ui/core';
import './Label.css';

function Label(props) {

    return (
        <div id="Label">
            <Button style={ {backgroundColor: props.color} } className="team-label pokemon-label">{props.labelText}</Button>
        </div>
)
}

export default Label;