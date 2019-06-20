import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => (
        <div>
                { props.isDialogue ?
                        <div className={classes.DialogueContainer}>
                                <div className={classes.SpinnerContainer}>
                                        <div className={classes.Spinner}></div>     
                                </div>
                        </div>
                        :
                        <div className={classes.SpinnerContainer}>
                                <div className={classes.Spinner}></div>     
                        </div>
                }
        </div>
        
);

export default spinner;