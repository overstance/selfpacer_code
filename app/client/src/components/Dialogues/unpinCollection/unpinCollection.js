import React from 'react';
import classes from './unpinCollection.css';
import Modal from '../../UserInterface/Modal/Modal';
// import { Link } from 'react-router-dom';

const unpinCollection = (props) => (
    <Modal show={props.showDialogue} closeModal={props.closeModal}>
        <div>
            <div className={classes.DialogueTitleHead}>
                <div className={classes.DialogueTitleColumn}>
                    <h5>Unpin Collection</h5>
                </div>
                <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
            </div>
            <div className={classes.DialogueMessage}>
                <div>unPin:</div>
                <h4>{props.collectionTitle}<span>?</span></h4> 
                <div>
                    <div onClick={props.cancelUnpin} className={classes.CancelUnpin}>CANCEL</div>
                    <div onClick={props.confirmUnpin} className={classes.ConfirmUnpin}>UNPIN</div>
                </div>
            </div>                                    
        </div>
    </Modal>
);

export default unpinCollection;