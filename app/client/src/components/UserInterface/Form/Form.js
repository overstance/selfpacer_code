import React from 'react';
import classes from './Form.module.css';

const form = (props) => (
    <form 
    className={classes.Form}
    encType={props.encType}
    onSubmit={props.submitForm}
    >
        {props.children}
    </form>
);

export default form;