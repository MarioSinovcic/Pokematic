import React from 'react';
import { Button } from '@material-ui/core';
import './Label.css';

function Label(props) {
    return (
        <div id="Label">
            <Button className="TeamLabel">{props.labelText}</Button>
        </div>
)
}

export default Label;