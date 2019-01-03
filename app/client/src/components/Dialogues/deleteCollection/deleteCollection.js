import React from 'react';
import classes from './deleteCollection.css';
import Modal from '../../UserInterface/Modal/Modal';
/* import { connect } from 'react-redux';
import Spinner from '../../UserInterface/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
// import { Link } from 'react-router-dom'; */

const deleteCollection = (props) => (
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
                <h4>{props.collectionTitle}</h4>
                <span>?</span>
                <div>
                    <div onClick={props.cancelDelete} className={classes.CancelDelete}>CANCEL</div>
                    <div onClick={props.confirmDelete} className={classes.ConfirmDelete}>DELETE</div>
                </div>
            </div>                              
        </div>
    </Modal>
);

export default deleteCollection;