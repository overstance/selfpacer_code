import React from 'react';
import classes from './FormTitle.css';

const formTitle = (props) => (
    props.isAdmin ? 
    <div className={classes.AdminFormTitle}>{props.children}</div>
    :
    <div className={classes.FormTitle}>{props.children}</div>
);

export default formTitle;