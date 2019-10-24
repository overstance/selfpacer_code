import React, { Component } from 'react';
import classes from './manageInspireTexts.module.css';
import updateActionButton from '../../components/UserInterface/ActionButtons/Update';
import DeleteActionButton from '../../components/UserInterface/ActionButtons/Delete';
import ProcessingActionButton from '../../components/UserInterface/ActionButtons/Processing';
import {connect} from 'react-redux';

class InspireItem extends Component {
    render () {

        let updateButton =
        <updateActionButton clicked={this.props.updateText} />;

        if (this.props.id === this.props.inspireTextToUpdateId && this.props.updateInspireTextLoading) {
            updateButton = 
            <ProcessingActionButton />
        }

        let deleteButton =
        <DeleteActionButton clicked={this.props.deleteText}/>;

        if (this.props.id === this.props.inspireTextToDeleteId && this.props.deleteInspireTextLoading) {
            deleteButton =
            <ProcessingActionButton />
        }

        return (
            <div className={classes.inspireItem}>
                <div className={classes.MainContainer}>
                    <div className={classes.Title}>workUrl1</div>
                </div>
                <div className={classes.FeedbackRow}>
                    <div className={classes.FeedbackContainer}>
                        <div className={classes.DetailsColumnFlex}>
                            { 
                                this.props.id === this.props.inspireTextToUpdateId &&
                                this.props.updateInspireTextError ?
                                <div className={classes.ResourceFeedBackError}>
                                    <span>{this.props.updateInspireTextError}</span>
                                </div> : null
                            }
                            { 
                                this.props.id === this.props.inspireTextToDeleteId &&
                                this.props.deleteInspireTextError ?
                                <div className={classes.ResourceFeedBackError}>
                                    <span>{this.props.deleteInspireTextError}</span>
                                </div> : null
                            }
                            <div className={classes.OptionFlex}>
                                {updateButton}
                            </div>
                        </div>
                        <div className={classes.OptionFixed}>
                            {deleteButton}
                        </div>
                    </div>
                </div>           
            </div> 
        );
    }
};

const mapStateToProps = state => {
    return {
        updateInspireTextLoading: state.admin1.updateInspireTextLoading,
        updateInspireTextError: state.admin1.updateInspireTextError,
        inspireTextToUpdateId: state.admin1.inspireTextToUpdateId,

        deleteInspireTextLoading: state.admin1.deleteInspireTextLoading,
        deleteInspireTextError: state.admin1.deleteInspireTextError,
        inspireTextToDeleteId: state.admin1.inspireTextToDeleteId
    };
};



export default connect(mapStateToProps)(InspireItem);