import React from 'react';
import './ProfileCard.css';
import { Typography, Button } from '@material-ui/core';

function ProfileCard() {

    // TEMP: fetch user details & change role into enum/object
    const userName = "Sean Spires";
    const role = "Product Manager";


    const handleIconChange = event => {
       //TODO: Change icon here
    };

    return (
        <div className="profile-card-shape">
        <div className="profile-card-shadow"></div>
            <div className="profile-base-shape">
            <div className="profile-headers">
                <div className="info">
                    <div className="user-icon" onClick={handleIconChange}/>
                    <Typography className="user-name">{userName}</Typography>
                </div>
                <Button className="TeamLabel role-button">{role}</Button>
            </div>
    
            </div>
            <div className="profile-edge">
                <div className="profile-cut"></div>
                <div className="profile-bottom"></div> 
            </div>
        </div>
)
}

export default ProfileCard;