import React from 'react';
import classes from './GridlessPageWrapper.module.css';
import Container from '../Container/Container';

const gridlessPageWrapper = (props) => (
    <Container>
        <div className={classes.Wrapper}>
            <h1 className={classes.Header}>
                {props.pageTitle}
            </h1>
            {props.children}
        </div>
    </Container>
);

export default gridlessPageWrapper;