import React from 'react';
import classes from './Container.module.css';

const container = (props) => (
    <section className={classes.container}>
        {props.children}
    </section>
);

export default container;