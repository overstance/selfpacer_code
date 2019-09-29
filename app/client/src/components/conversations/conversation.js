import React from 'react';
import classes from './conversations.module.css';

const conversation = (props) => {

    let closingDate = new Date(props.closingDate);
    let options = { /* weekday: 'short',  */year: 'numeric', month: 'long', day: 'numeric' };
    let displayDate = closingDate.toLocaleDateString('en-US', options);

    return (
        <div className={classes.conversation}>
            <div className={classes.titleSection}>
                <div className={classes.title}>
                    {props.title}
                </div>
                <div className={classes.type}>
                    {props.type}
                </div>
            </div>
            <div className={classes.otherSection}>
                <div className={classes.info}>
                    <div className={classes.initiator}>
                        <span>initiator: </span>{props.initiator}
                    </div>
                    <div className={classes.closingDate}>
                        <span>closing: </span>{displayDate}
                    </div>
                </div>
                <div className={classes.action}>
                    <div className={classes.joinButton}>
                        join
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default conversation;