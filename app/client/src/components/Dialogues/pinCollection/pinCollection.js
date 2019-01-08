import React from 'react';
import classes from './pinCollection.css';
import Modal from '../../UserInterface/Modal/Modal';
// import { Link } from 'react-router-dom';

const pinCollection = (props) => (
    <Modal show={props.showDialogue} closeModal={props.closeModal}>
        <div>
            <div className={classes.DialogueTitleHead}>
                <div className={classes.DialogueTitleColumn}>
                    <h5>Pin Collection</h5>
                </div>
                <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
            </div>
            <div className={classes.DialogueMessage}>
                <div>Pin:</div>
                <h4>{props.collectionTitle}<span>?</span></h4> 
                <div>
                    <div onClick={props.cancelPin} className={classes.CancelPin}>CANCEL</div>
                    <div onClick={props.confirmPin} className={classes.ConfirmPin}>PIN</div>
                </div>
            </div>                                    
        </div>
    </Modal>
);

export default pinCollection;