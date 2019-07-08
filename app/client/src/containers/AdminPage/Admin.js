import React, { Component } from 'react';
import classes from './Admin.css';
import Toggler from '../../components/UserInterface/Toggler/Toggler';
import AddAdminUsers from '../../components/ManageUsers/AddAdminUsers';
import RemoveAdminUsers from '../../components/ManageUsers/RemoveAdminUsers';
import AddFacilitator from '../../components/ManageUsers/AddFacilitator';
import RemoveFacilitator from '../../components/ManageUsers/RemoveFacilitator';
import UpdateYoutubeVideos from '../../components/ManageYoutube/YoutubeVideoBulkUpdate/UpdateYoutubeVideos';
import UpdateYoutubePlaylists from '../../components/ManageYoutube/YoutubePlaylistBulkUpdate/UpdateYoutubePlaylists';
import AddResource from '../../components/addResource/addResource';
import AddSubjectIcon from '../../components/manageSubjects/AddSubjectIcon';
import EditSubect from '../../components/manageSubjects/EditSubject';
import AddSubject from '../../components/manageSubjects/AddSubject';
import DeleteSubject from '../../components/manageSubjects/DeleteSubject';
import GridlessPageWrapper from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'; 
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Admin extends Component {

    componentDidMount() {
        if (this.props.useTypeContext === '0' || this.props.useTypeContext === '1') {
            this.props.history.push('/');
        }
    }

    componentWillUnmount () {
        this.props.onClearAllAdminMessages();
    }

    state = {
        showManageSubjects: false,
        manageSubjectsToggle: false,

        showManageUsers: false,
        manageUsersToggle: false,

        showManageYoutubeUpdates: false,
        manageYoutubeUpdatesToggle: false,

        showAddResource: false,
        addResourceToggle: false,
    }

    manageSubjectsToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageSubjects: !prevState.showManageSubjects,
                manageSubjectsToggle: !prevState.manageSubjectsToggle
            };
        });
    }

    manageUsersToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageUsers: !prevState.showManageUsers,
                manageUsersToggle: !prevState.manageUsersToggle
            };
        });
    }

    manageYoutubeUpdatesToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageYoutubeUpdates: !prevState.showManageYoutubeUpdates,
                manageYoutubeUpdatesToggle: !prevState.manageYoutubeUpdatesToggle
            };
        });
    }

    addResourceToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showAddResource: !prevState.showAddResource,
                addResourceToggle: !prevState.addResourceToggle
            };
        });
    }

    render() {
        return(
            <GridlessPageWrapper pageTitle='Admin Tools'>
                <div className={classes.Wrapper} >
                    <div className={classes.Subheader}>
                        <Toggler 
                            subheadTitle="confirm resources"
                            isLink
                            link='/admin_tools/confirm_resources'
                        />
                    </div>
                    <div className={classes.Subheader}>
                        <Toggler 
                            subheadTitle="manage assets"
                            isLink
                            link='/manage_assets'
                        />
                    </div>
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageSubjectsToggle} 
                            toggleHandler={this.manageSubjectsToggleHandler}
                            subheadTitle="manage subject"
                        />
                        { this.state.showManageSubjects ? 
                            <div className={classes.BlockContentItems}>
                                <AddSubjectIcon />
                                <EditSubect />
                                <AddSubject />
                                <DeleteSubject />
                            </div>
                        : null }
                    </div>
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageUsersToggle} 
                            toggleHandler={this.manageUsersToggleHandler}
                            subheadTitle="manage users"
                        />
                        { this.state.showManageUsers ? 
                            <div className={classes.ContentItems}>
                                { this.props.accountType === 'ChiefAdmin' ?
                                    <AddAdminUsers /> : null
                                }
                                { this.props.accountType === 'ChiefAdmin' ?
                                    <RemoveAdminUsers /> : null
                                }
                                <AddFacilitator />
                                <RemoveFacilitator />
                            </div>
                        : null }
                    </div>
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageYoutubeUpdatesToggle} 
                            toggleHandler={this.manageYoutubeUpdatesToggleHandler}
                            subheadTitle="manage youtube updates"
                        />
                        { this.state.showManageYoutubeUpdates ? 
                            <div className={classes.ContentItems}>
                                <UpdateYoutubeVideos />
                                <UpdateYoutubePlaylists />
                            </div>
                        : null }
                    </div>
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.addResourceToggle} 
                            toggleHandler={this.addResourceToggleHandler}
                            subheadTitle="add resource"
                        />
                        { this.state.showAddResource ? 
                            <div className={classes.BlockContentItems}>
                                <AddResource />
                            </div>
                        : null }
                    </div>
                </div>
            </GridlessPageWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        useTypeContext: state.auth.useTypeContext,
        userId: state.auth.user._id,
        accountType: state.auth.user.accountType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClearAllAdminMessages: () => dispatch(actions.clearAllAdminMessages())
    };
};


export default connect(mapStateToProps,  mapDispatchToProps)(Admin);