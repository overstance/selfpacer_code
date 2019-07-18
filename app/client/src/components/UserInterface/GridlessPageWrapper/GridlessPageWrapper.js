import React from 'react';
import classes from './GridlessPageWrapper.module.css';
import Container from '../Container/Container';

const gridlessPageWrapper = (props) => (
    <Container>
        <div className={classes.Header}>
            {props.pageTitle}
        </div>
        {props.children}
    </Container>
);

export default gridlessPageWrapper;