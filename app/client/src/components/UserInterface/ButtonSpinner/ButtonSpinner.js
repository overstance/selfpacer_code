import React from 'react';

import classes from './ButtonSpinner.css';

const spinner = () => (
        <div className={classes.SpinnerContainer}>
           <div className={classes.Spinner}></div>     
        </div>
);

export default spinner;