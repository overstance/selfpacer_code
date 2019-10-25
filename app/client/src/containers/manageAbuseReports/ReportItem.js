import React, { Component } from 'react';
import classes from './abuseReport.module.css';
import DeleteActionButton from '../../components/UserInterface/ActionButtons/Delete';
import ProcessingActionButton from '../../components/UserInterface/ActionButtons/Processing';
import {connect} from 'react-redux';

class ReportItem extends Component {
    render () {

        let deleteButton =
        <DeleteActionButton clicked={this.props.deleteReport}/>;

        if (this.props.id === this.props.abuseReportToDeleteId && this.props.deleteAbuseReportLoading) {
            deleteButton =
            <ProcessingActionButton />
        }

        let reportDate = new Date(this.props.reportDate).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })

        return (
            <div className={classes.item}>
                <div className={classes.Title}>
                    {this.props.abuseReport}
                    <div>
                        {this.props.abuseReporter}
                    </div>
                    <span>
                        {reportDate}
                    </span>
                </div>
                <div className={classes.FeedbackRow}>
                    <div className={classes.FeedbackContainer}>
                        <div className={classes.DetailsColumnFlex}>
                            { 
                                this.props.id === this.props.abuseReportToDeleteId &&
                                this.props.deleteAbuseReportError ?
                                <div className={classes.ResourceFeedBackError}>
                                    <span>{this.props.deleteAbuseReportError}</span>
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
        deleteAbuseReportLoading: state.admin1.deleteAbuseReportLoading,
        deleteAbuseReportError: state.admin1.deleteAbuseReportError,
        abuseReportToDeleteId: state.admin1.abuseReportToDeleteId
    };
};



export default connect(mapStateToProps)(ReportItem);