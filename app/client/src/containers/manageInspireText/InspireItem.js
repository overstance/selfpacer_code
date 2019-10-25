import React, { Component } from 'react';
import classes from './manageInspireTexts.module.css';
import DeleteActionButton from '../../components/UserInterface/ActionButtons/Delete';
import ProcessingActionButton from '../../components/UserInterface/ActionButtons/Processing';
import {connect} from 'react-redux';

class InspireItem extends Component {
    render () {

        let deleteButton =
        <DeleteActionButton clicked={this.props.deleteText}/>;

        if (this.props.id === this.props.inspireTextToDeleteId && this.props.deleteInspireTextLoading) {
            deleteButton =
            <ProcessingActionButton />
        }

        return (
            <div className={classes.inspireItem}>
                <div className={classes.Title}>{this.props.inspireText}</div>
                <div className={classes.FeedbackRow}>
                    <div className={classes.FeedbackContainer}>
                        <div className={classes.DetailsColumnFlex}>
                            { 
                                this.props.id === this.props.inspireTextToDeleteId &&
                                this.props.deleteInspireTextError ?
                                <div className={classes.ResourceFeedBackError}>
                                    <span>{this.props.deleteInspireTextError}</span>
                                </div> : null
                            }
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
        deleteInspireTextLoading: state.admin1.deleteInspireTextLoading,
        deleteInspireTextError: state.admin1.deleteInspireTextError,
        inspireTextToDeleteId: state.admin1.inspireTextToDeleteId
    };
};



export default connect(mapStateToProps)(InspireItem);