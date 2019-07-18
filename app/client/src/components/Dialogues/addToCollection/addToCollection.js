import React, { Component} from 'react';
import classes from './addToCollection.module.css';
import Modal from '../../UserInterface/Modal/Modal';
// import { Link } from 'react-router-dom';
import Collection from './collection/Collection';

class AddToCollection extends Component {
    
    render () {
        return (
            <Modal show={this.props.showDialogue} closeModal={this.props.closeModal}>
                <div>
                    <div className={classes.DialogueTitleHead}>
                        <div className={classes.DialogueTitleColumn}>
                            <h5>Add To Collection</h5>
                        </div>
                        <div onClick={this.props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                    </div>
                    <div className={classes.DialogueMessage}>
                        <div>
                            <Collection />
                        </div>
                    </div>                                    
                </div>
            </Modal>
        )
    }
};

export default AddToCollection;