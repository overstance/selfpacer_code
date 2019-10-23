import React from 'react';

import classes from './NavBackdrop.module.css';

const backdrop = (props) => (
    props.show ? 
    <div 
        role="button"
        aria-label="close side menu"
        tabIndex="0"
        className={classes.Backdrop} 
        onKeyUp={props.keyboarded}
        onClick={props.clicked}
    >
        {props.children}
    </div> 
        : null
);

export default backdrop;