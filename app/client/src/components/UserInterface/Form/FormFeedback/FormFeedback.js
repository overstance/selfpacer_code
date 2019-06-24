import React from 'react';
import classes from './FormFeedback.css';

const formFeedback = (props) => (
    <div>
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
    </div>

);

export default formFeedback;