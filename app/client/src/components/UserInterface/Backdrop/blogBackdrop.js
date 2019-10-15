import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? 
    <div className={classes.blogBackdrop} onClick={props.clicked}>{props.children}</div> : null
);

export default backdrop;