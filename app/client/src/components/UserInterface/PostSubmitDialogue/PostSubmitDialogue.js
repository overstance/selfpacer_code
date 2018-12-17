import React from 'react';
import classes from './PostSubmitDialogue.css';

const postSubmitDialogue = (props) => (
    <div className={classes.PostSubmitDailogue}>
        <div className={classes.PostSubmitMessage}>
            {props.children}
        </div>
        { props.withGoBackButton ? <div className={classes.GoBackPrompt} onClick={props.handleBack}>Go back</div>: null} 
    </div>
);

export default postSubmitDialogue;