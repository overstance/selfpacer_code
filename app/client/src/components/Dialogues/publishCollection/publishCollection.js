import React, { Component } from 'react';
import classes from './publishCollection.css';
import Modal from '../../UserInterface/Modal/Modal';
import { connect } from 'react-redux';
import Spinner from '../../UserInterface/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
// import { Link } from 'react-router-dom';

class publishCollection extends Component {

    componentWillUnmount() {
        this.props.onClearPublishCollectionMessages()
    }

    render () {

        let Dialogue =
        <div className={classes.DialogueMessage}>
            <div>Publish:</div>
            <h4>{this.props.collectionTitle}</h4>
            <span>on Selfpacer?</span>
            <div>
                <div onClick={this.props.cancelPublish} className={classes.CancelPublish}>CANCEL</div>
                <div onClick={this.props.confirmPublish} className={classes.ConfirmPublish}>PUBLISH</div>
            </div>
        </div>

        if (this.props.publishCollectionLoading) {
            Dialogue =
            <div className={classes.DialogueMessage}><Spinner /></div>
        }

        if ( this.props.publishCollectionSuccessInfo) {
            Dialogue =
            <div className={classes.DialogueMessage}><p className={classes.AddFeedbackInfo}>{this.props.publishCollectionSuccessInfo}</p></div>
        } else if ( this.props.publishCollectionError) {
            Dialogue =
            <div className={classes.DialogueMessage}><p className={classes.ErrorFeedbackInfo}>{this.props.publishCollectionError}</p></div>
        }

        return (
            <Modal show={this.props.showDialogue} closeModal={this.props.closeModal}>
                <div>
                    <div className={classes.DialogueTitleHead}>
                        <div className={classes.DialogueTitleColumn}>
                            <h5>Publish Collection</h5>
                        </div>
                        <div onClick={this.props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                    </div>
                    {Dialogue}                              
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    publishCollectionSuccessInfo: state.collection.publishCollectionSuccessInfo,
    publishCollectionError: state.collection.publishCollectionError,
    publishCollectionLoading: state.collection.publishCollectionLoading
});

const mapDispatchToProps = dispatch => {
    return {
        onClearPublishCollectionMessages: () => dispatch(actions.clearPublishCollectionMessages())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(publishCollection);
