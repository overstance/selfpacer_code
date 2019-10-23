import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? 
    <div
        className={classes.Backdrop}
        onClick={props.clicked}
        role="button"
        aria-label="close search"
        tabIndex="0"
        onKeyUp={props.keyboarded}
     >
        {props.children}
    </div> : null
);

export default backdrop;