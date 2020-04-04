import React from 'react';
import { Button } from '@material-ui/core';
import './Label.css';

function Label() {
    // Temporary
    const labelText = "Lv. 21";

    return (
        <div id="Label">
            <Button className="TeamLabel">{labelText}</Button>
        </div>
)
}

export default Label;