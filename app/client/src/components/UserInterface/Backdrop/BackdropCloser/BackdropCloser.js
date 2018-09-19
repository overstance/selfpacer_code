import React from 'react';
import classes from './BackdropCloser.css';
import clearIcon from '../../../../assets/images/baseline-clear-24px.svg';


const backdropCloser = (props) => (
    props.show ? <img className={classes.BackdropCloser} onClick={props.clicked} src={clearIcon} alt='clear icon' /> : null
);

export default backdropCloser;