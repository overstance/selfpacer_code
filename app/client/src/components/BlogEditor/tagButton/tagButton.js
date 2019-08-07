import React from 'react';
import classes from '../BlogEditor.module.css';

const tagButton = (props) => (
    <div className={classes.tagButton}>
        <span className={classes.tagButtonLabel}>{props.tagLabel}</span>
        <span className={classes.removeTag} onClick={props.removeTagClicked}>X</span>
    </div>
);

export default tagButton;