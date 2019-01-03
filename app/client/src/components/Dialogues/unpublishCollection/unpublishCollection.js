import React, { Component } from 'react';
import classes from './unpublishCollection.css';
import Modal from '../../UserInterface/Modal/Modal';
import { connect } from 'react-redux';
import Spinner from '../../UserInterface/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
// import { Link } from 'react-router-dom';

class unpublishCollection extends Component {

    componentWillUnmount() {
        this.props.onClearPublishCollectionMessages()
    }

    render () {

        let Dialogue =
        <div className={classes.DialogueMessage}>
            <h4>{this.props.collectionTitle}</h4>
            <span>is already published</span>
            <div>
                <div onClick={this.props.cancelUnpublish} className={classes.CancelPublish}>CANCEL</div>
                <div onClick={this.props.confirmUnpublish} className={classes.ConfirmPublish}>UNPUBLISH</div>
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
                            <h5>unPublish Collection</h5>
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


export default connect(mapStateToProps, mapDispatchToProps)(unpublishCollection);
