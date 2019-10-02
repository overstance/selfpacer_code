import React from 'react';
import classes from './conversations.module.css';
import { Link } from 'react-router-dom';

const conversation = (props) => {

    let closingDate = new Date(props.closingDate);
    let startDate = new Date(props.startDate);
    let options = { /* weekday: 'short',  */year: 'numeric', month: 'long', day: 'numeric' };
    let displayedClosingDate = closingDate.toLocaleString('en-US', options);
    let displayedStartDate = startDate.toLocaleString('en-US', options);
    return (
        <div className={classes.conversation}>
            <div className={classes.topicSection}>
                <div className={classes.topic}>
                    {props.topic}
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
                        <span>started: </span>{displayedStartDate}
                    </div>
                    <div className={classes.closingDate}>
                        <span>closing: </span>{displayedClosingDate}
                    </div>
                </div>
                <div className={classes.action}>
                    <Link to={`/facilitate/conversations/${props.id}`} className={classes.joinButton}>
                        join
                    </Link>
                </div>    
            </div>
        </div>
    )
}

export default conversation;