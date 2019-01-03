import React from 'react';
import classes from './deleteCollectionItem.css';
import Modal from '../../UserInterface/Modal/Modal';
// import { Link } from 'react-router-dom';

const deleteCollectionItem = (props) => (
    <Modal show={props.showDialogue} closeModal={props.closeModal}>
        <div>
            <div className={classes.DialogueTitleHead}>
                <div className={classes.DialogueTitleColumn}>
                    <h5>Confirm Delete</h5>
                </div>
                <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
            </div>
            <div className={classes.DialogueMessage}>
                <div>Delete:</div>
                <h4>{props.itemTitle}<span>?</span></h4> 
                <div>
                    <div onClick={props.cancelDelete} className={classes.CancelDelete}>CANCEL</div>
                    <div onClick={props.confirmDelete} className={classes.ConfirmDelete}>DELETE</div>
                </div>
            </div>                                    
        </div>
    </Modal>
);

export default deleteCollectionItem;