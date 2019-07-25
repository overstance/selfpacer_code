import React from 'react';
import classes from './AjaxDialogueMessage.module.css';

const ajaxDialogueMessage = (props) => (
    <div className={classes.BodyWrapper}>
        <div className={classes.DialogueMessage}>
            <div>{props.action + ':'}</div>
            <h4>{props.resourceTitle}</h4>
            {   props.isDelete ?
                <div>
                    <span 
                    onClick={props.cancel} 
                    className={classes.Confirm}>cancel</span>
                    <span 
                    onClick={props.confirm} 
                    className={classes.Cancel}>delete</span>
                </div>
                :
                <div>
                    <span 
                    onClick={props.cancel} 
                    className={classes.Cancel}>cancel</span>
                    <span 
                    onClick={props.confirm} 
                    className={classes.Confirm}>{props.action}</span>
                </div> 
            }
        </div>
    </div>
    
);

export default ajaxDialogueMessage;