import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => ( 
                props.isDialogue || props.isComponent || props.isButton ?
                <div>
                        { props.isDialogue ?
                                <div className={classes.DialogueContainer}>
                                        <div className={classes.SpinnerContainer}>
                                                <div className={classes.Spinner}></div>     
                                        </div>
                                </div>
                                :
                                null
                        }
                        { props.isComponent ? 
                                <div className={classes.ComponentContainer}>
                                        <div className={classes.SpinnerContainer}>
                                                <div className={classes.Spinner}></div>     
                                        </div>
                                </div> :
                                null
                        }
                        { props.isButton ?
                                <div className={classes.ButtonSpinnerContainer}>
                                        <div className={classes.ButtonSpinner}></div>     
                                </div> :
                                null
                        }
                </div>
        : 
                <div className={classes.SpinnerContainer}>
                        <div className={classes.Spinner}></div>     
                </div>
);

export default spinner;