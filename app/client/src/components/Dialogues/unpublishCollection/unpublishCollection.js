import React, { Component } from 'react';
import classes from './unpublishCollection.module.css';
import Modal from '../../UserInterface/Modal/Modal';
import { connect } from 'react-redux';
import Spinner from '../../UserInterface/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import PostActionInfo from '../../PostActionInfo/PostActionInfo';
import AjaxDialogueMessage from '../Dialogue/AjaxDialogueMessage/AjaxDialogueMessage';
// import { Link } from 'react-router-dom';

class unpublishCollection extends Component {

    componentWillUnmount() {
        this.props.onClearPublishCollectionMessages()
    }

    render () {

        let Dialogue =
        <AjaxDialogueMessage 
        action='unpublish'
        resourceTitle={this.props.collectionTitle}
        cancel={this.props.cancelUnpublish}
        confirm={this.props.confirmUnpublish}
        />
        // eslint-disable-next-line no-lone-blocks
        {/* <div className={classes.DialogueMessage}>
            <h4>{this.props.collectionTitle}</h4>
            <span>is already published</span>
            <div>
                <div onClick={this.props.cancelUnpublish} className={classes.CancelPublish}>CANCEL</div>
                <div onClick={this.props.confirmUnpublish} className={classes.ConfirmPublish}>UNPUBLISH</div>
            </div>
        </div> */}

        if (this.props.publishCollectionLoading) {
            Dialogue =
            <Spinner isDialogue/>
        }

        if ( this.props.publishCollectionSuccessInfo) {
            Dialogue =
            <PostActionInfo isSuccess>
                {this.props.publishCollectionSuccessInfo}
            </PostActionInfo>
        } else if ( this.props.publishCollectionError) {
            Dialogue =
            <PostActionInfo isFailed>
                {this.props.publishCollectionError}
            </PostActionInfo>
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
