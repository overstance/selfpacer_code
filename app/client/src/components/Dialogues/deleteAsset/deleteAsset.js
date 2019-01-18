import React from 'react';
import classes from './deleteAsset.css';
import Modal from '../../UserInterface/Modal/Modal';

const deleteAsset = (props) => (
    <Modal show={props.showDialogue} closeModal={props.closeModal}>
        <div>
            <div className={classes.DialogueTitleHead}>
                <div className={classes.DialogueTitleColumn}>
                    <h5>Delete Asset</h5>
                </div>
                <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
            </div>
            {props.children}                                    
        </div>
    </Modal>
);

export default deleteAsset;