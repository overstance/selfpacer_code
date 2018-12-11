import React from 'react';
import classes from './PostSubmitDialogue.css';

const postSubmitDialogue = (props) => (
    <div className={classes.PostSubmitDailogue}>
        <div className={classes.PostSubmitMessage}>
            {props.children}
        </div>
        <div className={classes.GoBackPrompt} onClick={props.handleBack}>Go back</div> 
    </div>
);

export default postSubmitDialogue;