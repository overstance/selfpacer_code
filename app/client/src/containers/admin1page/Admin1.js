import React, { Component } from 'react';
import classes from './Admin1.css';
import Toggler from '../../components/UserInterface/Toggler/Toggler';
import AddAdminUsers from '../../components/adminUsers/AddAdminUsers';
import RemoveAdminUsers from '../../components/adminUsers/RemoveAdminUsers';
import UpdateYoutubeVideos from '../../components/ManageYoutube/YoutubeVideoBulkUpdate/UpdateYoutubeVideos';
import UpdateYoutubePlaylists from '../../components/ManageYoutube/YoutubePlaylistBulkUpdate/UpdateYoutubePlaylists';
import AddResource from '../../components/addResource/addResource';
import AddSubjectIcon from '../../components/manageSubjects/AddSubjectIcon';
import EditSubect from '../../components/manageSubjects/EditSubject';
import AddSubject from '../../components/manageSubjects/AddSubject';
import GridlessPageWrapper from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'; 

class Admin1 extends Component {

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
            <GridlessPageWrapper pageTitle='Admin1 Tools'>
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
                                <AddAdminUsers />
                                <RemoveAdminUsers />
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

export default Admin1;