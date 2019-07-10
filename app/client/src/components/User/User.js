import React, { Component } from 'react';
import classes from './User.css';
// import PropTypes from 'prop-types';
import CheckActionButton from '../UserInterface/ActionButtons/Check';
import CancelActionButton from '../UserInterface/ActionButtons/Cancel';
import ProcessingActionButton from '../UserInterface/ActionButtons/Processing';
import {connect} from 'react-redux';

class User extends Component {
    render () {

        let confirmButton =
        <CheckActionButton clicked={this.props.approve} />;

        if (this.props.id === this.props.applicantToApproveId && this.props.approveFacilitateApplicantLoading) {
            confirmButton = 
            <ProcessingActionButton />
        }

        let cancelButton =
        <CancelActionButton clicked={this.props.disapprove}/>;

        if (this.props.id === this.props.applicantToDisapproveId && this.props.disapproveFacilitateApplicantLoading) {
            cancelButton =
            <ProcessingActionButton />
        }

        return (
            <div className={classes.User}>
                <div className={classes.MainContainer}>
                    <div className={classes.InfoContainer}>
                        <div className={classes.UrlsContainer}>
                            <a
                            target="_blank" 
                            rel="noopener noreferrer" 
                            href={this.props.workUrl1} 
                            className={classes.WorkUrl}
                            >
                                <div className={classes.Title}>workUrl1</div>
                            </a>
                            {  this.props.workUrl2 ?
                                <a
                                target="_blank" 
                                rel="noopener noreferrer" 
                                href={this.props.workUrl2} 
                                className={classes.WorkUrl}
                                >
                                    <div className={classes.Title}>workUrl2</div>
                                </a>
                                : null
                            }
                        </div>
                        <div className={classes.DetailsContainer}>
                            <div>
                                <div className={classes.Type}>NAME:<span>{this.props.name}</span></div>
                            </div>
                            <div>
                                <div className={classes.Type}>USER-ID:<span>{this.props.id}</span></div>
                            </div> 
                            <div>
                                <div className={classes.Type}>SPEC.:<span>{this.props.specialization}</span></div>
                            </div>
                            <div>
                                <div className={classes.Type}>EMAIL:<span>{this.props.email}</span></div>
                            </div>
                            <div>
                                <div className={classes.Type}>APPLY-DATE:<span>{this.props.applicationDate}</span></div>
                            </div>
                            <div className={classes.DetailsColumnFlex}>
                                <div className={classes.Type}>JOIN-DATE:<span>{this.props.joinDate}</span></div>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className={classes.FeedbackRow}>
                    <div className={classes.FeedbackContainer}>
                        <div className={classes.DetailsColumnFlex}>
                            { 
                                this.props.id === this.props.applicantToApproveId &&
                                this.props.approveFacilitateApplicantError ?
                                <div className={classes.ResourceFeedBackError}>
                                    <span>{this.props.approveFacilitateApplicantError}</span>
                                </div> : null
                            }
                            { 
                                this.props.id === this.props.applicantToDisapproveId &&
                                this.props.disapproveFacilitateApplicantError ?
                                <div className={classes.ResourceFeedBackError}>
                                    <span>{this.props.disapproveFacilitateApplicantError}</span>
                                </div> : null
                            }
                            <div className={classes.OptionFlex}>
                                {confirmButton}
                            </div>
                        </div>
                        <div className={classes.OptionFixed}>
                            {cancelButton}
                        </div>
                    </div>
                </div>           
            </div> 
        );
    }
};

const mapStateToProps = state => {
    return {
        approveFacilitateApplicantLoading: state.admin1.approveFacilitateApplicantLoading,
        approveFacilitateApplicantError: state.admin1.approveFacilitateApplicantError,
        applicantToApproveId: state.admin1.applicantToApproveId,

        disapproveFacilitateApplicantLoading: state.admin1.disapproveFacilitateApplicantLoading,
        disapproveFacilitateApplicantError: state.admin1.disapproveFacilitateApplicantError,
        applicantToDisapproveId: state.admin1.applicantToDisapproveId
    };
};



export default connect(mapStateToProps)(User);