import React, { Fragment } from 'react';
import classes from './FormFeedback.module.css';

const formFeedback = (props) => (
    <Fragment>
        { props.isFillError ? 
            <div className={classes.FillError}>
                {props.children}
            </div>
            : null
        }
        { props.isSuccess ?
            <div className={classes.Success}>
                {props.children}
            </div>
            :null
        }
        { props.isFailed ?
            <div className={classes.Failed}>
                {props.children}
            </div>
            :null
        }
    </Fragment>

);

export default formFeedback;