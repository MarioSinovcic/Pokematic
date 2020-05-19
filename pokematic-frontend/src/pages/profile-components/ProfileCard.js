import React from 'react';
import './ProfileCard.css';
import { Typography, Button } from '@material-ui/core';

function ProfileCard(props) {

    return (
        <div className="profile-card-shape">
        <div className="profile-card-shadow"></div>
            <div className="profile-base-shape">
            <div className="profile-headers">
                <div className="info">
                    <div className="user-icon">
                        <img className="user-image" src={props.picture} alt={"User Profile"}/>
                    </div>
                    <Typography className="user-name">{props.nickname}</Typography>
                </div>
                <Button className="sign-out-button" onClick={props.signOut}>Sign out</Button>
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