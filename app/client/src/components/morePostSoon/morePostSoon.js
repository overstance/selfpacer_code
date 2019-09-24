import React from 'react';
import classes from './morePostSoon.module.css';

const morePostSoon = (props) => (
    <div className={classes.container}>
        <div className={classes.info}>
            {props.children}
        </div>
    </div>
);

export default morePostSoon;