import React from 'react';
import classes from './ActionButtons.css';
import Spinner from '../Spinner/Spinner';

const processingButton = (props) => {

    const IconClasses = [classes.IconUpdating];

    if (props.large) {
        IconClasses.push(classes.LargeButton);
    }
    return ( 
        <span className={classes.IsProcessingContainer}>
            <Spinner isActionButton/>
        </span> 
    );
}  

export default processingButton;