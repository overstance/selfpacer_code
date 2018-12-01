import React from 'react';
import classes from './authRequired.css';
import Modal from '../../UserInterface/Modal/Modal';
import { Link } from 'react-router-dom';

const authRequired = (props) => (
    <Modal show={props.showDialogue} closeModal={props.closeModal}>
        <div>
            <div className={classes.DialogueTitleHead}>
                <div className={classes.DialogueTitleColumn}>
                    <h5>Authentication Required</h5>
                </div>
                <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
            </div>
            <div className={classes.DialogueMessage}>
                <div>Please </div>
                <div><Link to='/login'>LOG-IN</Link> Or <Link to='/register'>SIGN-UP</Link></div>
                <div>To Collect Or Add Resource.</div>
            </div>                                    
        </div>
    </Modal>
);

export default authRequired;