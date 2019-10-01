import React from 'react';
import classes from './AjaxDialogueMessage.module.css';


/* this component is implemented to exist inside
of a dailogue component, it will be swapped for 
a spinner(isDialogue) on deployment of an ajax action
and replaced with a postActionInfo upon action completion */
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