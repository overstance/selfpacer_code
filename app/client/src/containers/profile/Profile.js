import React, { Component } from 'react';
import classes from './Profile.module.css';
import Container from '../../components/UserInterface/Container/Container';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import starIcon from '../../assets/images/star.svg';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Dialogue from '../../components/Dialogues/Dialogue/Dialogue';
import AjaxDialogueMessage from '../../components/Dialogues/Dialogue/AjaxDialogueMessage/AjaxDialogueMessage';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';

class Profile extends Component {

    state = {
        showDeleteAccountModal: false
    }

    componentDidMount() {
        this.props.onFetchUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.deleteOwnAccountSuccessInfo !== prevProps.deleteOwnAccountSuccessInfo && this.props.deleteOwnAccountSuccessInfo === 'user own account successfully deleted') {
            this.props.history.push('/logout');
        }
    }

    closeDeleteAccountModalHandler = () => {
        this.setState({ showDeleteAccountModal: false });
    }

    showDeleteAccountModalHandler = () => {
        this.setState({ showDeleteAccountModal: true });
    }

    confirmAccountDeleteHandler = () => {
        this.props.onDeleteOwnAccount(this.props.userId);   
    }

    render() {

        let collectionCount = <div className={classes.StatisticsCount}>< Spinner isLoadMore /></div>;
        let assetCount = <div className={classes.StatisticsCount}>< Spinner isLoadMore /></div>;
        
        if (!this.props.collectionLoading) {
            collectionCount = <div className={classes.StatisticsCount}>{this.props.collectionCount.length}</div>
        }

        if (!this.props.assetCountLoading) {
            assetCount = <div className={classes.StatisticsCount}>{this.props.userAssetCount}</div>;
        }

        let deleteAccountWarning =
        "Are you sure you want to delete your account? All your curated collections and added resources will be irreversably removed."

        let deleteAccountDialogueMessage = 
        <AjaxDialogueMessage
        isDelete
        resourceTitle={deleteAccountWarning}
        cancel={this.closeDeleteAccountModalHandler}
        confirm={this.confirmAccountDeleteHandler}
        />

        if (this.props.deleteOwnAccountLoading) {
            deleteAccountDialogueMessage =
            <Spinner isDialogue/>
        }

        if (!this.props.deleteOwnAccountLoading && this.props.deleteOwnAccountError) {
            deleteAccountDialogueMessage =
            <PostActionInfo isFailed>{this.props.deleteOwnAccountError}</PostActionInfo>
        }

        return (
        <Container>
            <div className={classes.AllWrapper}>
                <div className={classes.ProfilePanelWrapper}>
                    <div className={classes.ProfilePanel}>
                        <div className={classes.Biodata}>
                            <div className={classes.ProfilePic}>
                                <div className={classes.UserIcon} />
                            </div>
                            <div className={classes.BiodataInfo}>
                                <h3 className={classes.BiodataName}>{this.props.userName}</h3>
                                <div>Account Type: <span>{this.props.accountType}</span></div>
                                { !this.props.specialization2 || this.props.specialization2 === 'N/A' ?
                                    <div>Specialization: <span>{this.props.specialization}</span></div>
                                    : 
                                    <div>Specialization: <span>{this.props.specialization},</span><span>{this.props.specialization2}</span></div>
                                }
                                <div>Joined On: <span>{new Date(this.props.joinDate).toLocaleDateString()}</span></div>
                            </div>
                            <div className={classes.BiodataEdit}>
                                <Link to='/profile/edit' className={classes.BiodataEditButton}>
                                    Edit
                                </Link>
                            </div>
                            { this.props.accountType === 'User' && this.props.isFacilitateApplicant === false ?
                                <div className={classes.Facilitator}>
                                    <Link to="/facilitate" className={classes.FaclitatorButton}>Become a Facilitator</Link>
                                </div>
                                : null
                            }
                        </div>
                        { 
                            this.props.accountType === 'Administrator' ||
                            this.props.accountType === 'Facilitator' ||
                            this.props.accountType === 'Senior Administrator' ||
                            this.props.accountType === 'Head Administrator' ?
                            <div className={classes.Statistics}>
                                <div className={classes.StatisticsLike}>
                                    <div className={classes.StatisticsCount}>{this.props.likeCount ? this.props.likeCount : 0}</div>
                                    <div className={classes.StatisticsLabel}>Likes</div>
                                </div>
                                <div className={classes.StatisticsCollections}>
                                    {collectionCount}
                                    <div className={classes.StatisticsLabel}>Collections</div>
                                </div>
                                <div className={classes.StatisticsAssets}>
                                    {assetCount}
                                    <div className={classes.StatisticsLabel}>Assets</div>
                                </div>
                            </div>
                            :
                            <div className={classes.Statistics}>
                                <div className={classes.NoAssetStatisticsLike}>
                                    <div className={classes.StatisticsCount}>{this.props.likeCount}</div>
                                    <div className={classes.StatisticsLabel}>Likes</div>
                                </div>
                                <div className={classes.NoAssetStatisticsCollections}>
                                    {collectionCount}
                                    <div className={classes.StatisticsLabel}>Collections</div>
                                </div>
                            </div>
                        }
                    </div>
                    <span className={classes.EdgeTri}>
                        <img className={classes.StarIcon} src={starIcon} alt="star icon" />
                    </span>
                </div>
                <div className={classes.LogoutPanelWrapper}>
                    <div className={classes.AuthContainer}>
                        {this.props.accountType === "Head Administrator" || this.props.accountType === "Senior Administrator" || this.props.accountType === "Administrator" ? <Link className={classes.AdminTools} to='/admin_tools'>Admin Tools</Link> : null}
                        <Link className={classes.Logout} to='/logout'>Log Out</Link>
                    </div>
                    <div className={classes.DeleteAccount}>
                        <button onClick={this.showDeleteAccountModalHandler}>
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
            {this.state.showDeleteAccountModal ?
                <Dialogue
                isDeleteAccount 
                showDialogue={this.state.showDeleteAccountModal}
                closeDialogue={this.closeDeleteAccountModalHandler}
                >
                    {deleteAccountDialogueMessage}
                </Dialogue>    
                : null
            }
        </Container>                      
        )
    }
};

const mapStateToProps = state => ({
    userId: state.auth.user._id,
    isFacilitateApplicant: state.auth.user.isFacilitateApplicant,
    userName: state.auth.user.name,
    specialization: state.auth.user.specialization,
    specialization2: state.auth.user.specialization_alt,
    accountType: state.auth.user.accountType,
    joinDate: state.auth.user.date,
    collectionCount: state.collection.userCollections,
    collectionLoading: state.collection.loading,
    userAssetCount: state.resource.userAssetCount,
    likeCount: state.auth.userLikeCount,
    assetCountLoading: state.resource.userAssetCountLoading,
    isAdmin: state.auth.isAdmin,

    deleteOwnAccountLoading: state.profile.deleteOwnAccountLoading,
    deleteOwnAccountSuccessInfo: state.profile.deleteOwnAccountSuccessInfo,
    deleteOwnAccountError: state.profile.deleteOwnAccountError
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser()),
        onDeleteOwnAccount: (userId) => dispatch(actions.deleteOwnAccount(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Profile);