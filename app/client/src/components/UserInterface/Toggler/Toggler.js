import React from 'react';
import classes from './Toggler.css';


const toggler = (props) => {

    const toggleButtonClasses = [ classes.ToggleButton];
    const toggleBGClasses = [classes.ToggleButtonBG];

    if (props.toggle) {
        toggleButtonClasses.push(classes.Toggle);
        toggleBGClasses.push(classes.ToggleBGColor);
    }

    return (
        
        <div className={classes.FlexWrapper}>
            <div className={classes.Title}>{props.subheadTitle}</div>
            <div onClick={props.toggleHandler} className={classes.ToggleButtonContainer}>
                <div className={toggleBGClasses.join(' ')}>
                    <div className={toggleButtonClasses.join(' ')}></div>
                </div>
            </div>
        </div>

    );
};

export default toggler;