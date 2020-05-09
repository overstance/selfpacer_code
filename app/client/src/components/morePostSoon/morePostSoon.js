import React from 'react';
import classes from './morePostSoon.module.css';

const morePostSoon = (props) => (
    <div className={classes.container}>
        <div className={classes.info}>
            <div className={classes.infoText}>
                {props.children}
            </div>
        </div>
    </div>
);

export default morePostSoon;