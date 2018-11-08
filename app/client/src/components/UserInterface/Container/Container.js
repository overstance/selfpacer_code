import React from 'react';
import classes from './Container.css';

const container = (props) => (
    <div className={classes.container}>
        {props.children}
    </div>
);

export default container;