import React from 'react';
import classes from './Toggler.module.css';
import {Link} from 'react-router-dom';


const toggler = (props) => {

    const toggleButtonClasses = [ classes.ToggleButton];
    const toggleBGClasses = [classes.ToggleButtonBG];

    if (props.toggle) {
        toggleButtonClasses.push(classes.Toggle);
        toggleBGClasses.push(classes.ToggleBGColor);
    }

    return (
        <div>
            { props.isLink ?
                <div className={classes.FlexWrapper}>
                    <div className={classes.TitleContainer}>
                        <div className={classes.Title}>{props.subheadTitle}</div>
                    </div>
                    <Link to={props.link} /* onClick={props.toggleHandler} */ className={classes.ToggleButtonContainer}>
                        <div /* className={toggleBGClasses.join(' ')} */ className={classes.ToggleButtonBG}>
                            {/* <div className={toggleButtonClasses.join(' ')}></div> */}
                            <div className={classes.ToggleButtonLink}></div>
                        </div>
                    </Link>
                </div> :
                <div className={classes.FlexWrapper}>
                    <div className={classes.TitleContainer}>
                        <div className={classes.Title}>{props.subheadTitle}</div>
                    </div>
                    <div onClick={props.toggleHandler} className={classes.ToggleButtonContainer}>
                        <div className={toggleBGClasses.join(' ')}>
                            <div className={toggleButtonClasses.join(' ')}></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default toggler;