import React from 'react';
import './ProfileCard.css';
import { Typography, Button } from '@material-ui/core';

function ProfileCard(props) {

    // TEMP: fetch user details & change role into enum/object
    const role = "Developer";

    return (
        <div className="profile-card-shape">
        <div className="profile-card-shadow"></div>
            <div className="profile-base-shape">
            <div className="profile-headers">
                <div className="info">
                    <div className="user-icon">
                        <img className="user-image" src={props.user.profile ? props.user.profile.picture : ""} alt={"User Profile"}/>
                    </div>
                    <Typography className="user-name">{props.user.profile ? props.user.profile.nickname : ""}</Typography>
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