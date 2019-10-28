import React from 'react';
import classes from './GridlessPageWrapper.module.css';
import Container from '../Container/Container';

const gridlessPageWrapper = (props) => (
    <Container>
        <h1 className={classes.Header}>
            {props.pageTitle}
        </h1>
        {props.children}
    </Container>
);

export default gridlessPageWrapper;