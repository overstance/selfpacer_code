import React from 'react';
import classes from './updateAsset.css';
import Modal from '../../UserInterface/Modal/Modal';

const updateAsset = (props) => (
    <Modal show={props.showDialogue} closeModal={props.closeModal}>
        <div>
            <div className={classes.DialogueTitleHead}>
                <div className={classes.DialogueTitleColumn}>
                    <h5>Update Asset</h5>
                </div>
                <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
            </div>
            {props.children}                                    
        </div>
    </Modal>
);

export default updateAsset;