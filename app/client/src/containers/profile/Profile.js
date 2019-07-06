import React, { Component } from 'react';
import classes from './Profile.css';
import Container from '../../components/UserInterface/Container/Container';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import starIcon from '../../assets/images/star.svg';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Profile extends Component {

    componentDidMount() {
        this.props.onFetchUser();
    }

    render() {

        let collectionCount = <div className={classes.StatisticsCount}>< Spinner /></div>;
        let assetCount = <div className={classes.StatisticsCount}>< Spinner /></div>;
        
        if (!this.props.collectionLoading) {
            collectionCount = <div className={classes.StatisticsCount}>{this.props.collectionCount.length}</div>
        }

        if (!this.props.assetCountLoading) {
            assetCount = <div className={classes.StatisticsCount}>{this.props.userAssetCount}</div>;
        }

        // let statistics =

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
                            <div className={classes.Facilitator}>
                                <div className={classes.FaclitatorButton}>Become a Facilitator</div>
                            </div>
                        </div>
                        { 
                            this.props.accountType === 'Administrator' ||
                            this.props.accountType === 'Facilitator' ||
                            this.props.accountType === 'ChiefAdmin' ?
                            <div className={classes.Statistics}>
                                <div className={classes.StatisticsLike}>
                                    <div className={classes.StatisticsCount}>{this.props.likeCount}</div>
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
                        {this.props.userId === "5c16e8de76e09e200c039178" || this.props.userId === "5c16efcef6d0f300144d3cda" ? <Link className={classes.AdminTools} to='/admin_tools'>Admin Tools</Link> : null}
                        <Link className={classes.Logout} to='/logout'>Log Out</Link>
                    </div>
                    <div className={classes.DeleteAccount}> Delete Account</div>
                </div>
            </div>
        </Container>                      
        )
    }
};

const mapStateToProps = state => ({
    userId: state.auth.user._id,
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
    isAdmin: state.auth.isAdmin
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Profile);