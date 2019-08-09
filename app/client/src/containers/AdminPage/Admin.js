import React, { Component } from 'react';
import classes from './Admin.module.css';
import Toggler from '../../components/UserInterface/Toggler/Toggler';
import AddAdminUsers from '../../components/ManageUsers/AddAdminUser';
import RemoveAdminUsers from '../../components/ManageUsers/RemoveAdminUser';
import AddFacilitator from '../../components/ManageUsers/AddFacilitator';
import RemoveFacilitator from '../../components/ManageUsers/RemoveFacilitator';
import UpdateYoutubeVideos from '../../components/ManageYoutube/UpdateYoutubeVideos';
import UpdateYoutubePlaylists from '../../components/ManageYoutube/UpdateYoutubePlaylists';
import AddResource from '../../components/addResource/addResource';
// import AddSubjectIcon from '../../components/manageSubjects/AddSubjectIcon';
import EditSubect from '../../components/manageSubjects/EditSubject';
import AddSubject from '../../components/manageSubjects/AddSubject';
import FetchUserByAttribute from '../../components/ManageUsers/FetchUserByAttribute';
import DeleteSubject from '../../components/manageSubjects/DeleteSubject';
import GridlessPageWrapper from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'; 
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import InitializedBlogCategories from '../../components/manageBlogFilters/InitializeCategories';
import InitializeBlogTags from '../../components/manageBlogFilters/InitializeTags';
import EditBlogCategories from '../../components/manageBlogFilters/EditCategories';
import EditBlogTags from '../../components/manageBlogFilters/EditTags';
import AddAuthorOrEditor from '../../components/ManageUsers/AddAuthorOrEditor';
import RemoveAuthorOrEditor from '../../components/ManageUsers/RemoveAuthorOrEditor';

class Admin extends Component {

    componentDidMount() {
        if (this.props.useTypeContext === '0' || this.props.useTypeContext === '1') {
            this.props.history.push('/');
        } else {
            this.props.onFetchBlogCategories();
            this.props.onFetchBlogTags();
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

        showManageBlogFilters: false,
        manageBlogFiltersToggle: false,

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

    manageBlogFiltersToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageBlogFilters: !prevState.showManageBlogFilters,
                manageBlogFiltersToggle: !prevState.manageBlogFiltersToggle
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
                            subheadTitle="facilitate applicants"
                            isLink
                            link='/facilitate_applicants'
                        />
                    </div>
                    <div className={classes.Subheader}>
                        <Toggler 
                            subheadTitle="manage blog drafts"
                            isLink
                            link='/blog_drafts'
                        />
                    </div>
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageBlogFiltersToggle} 
                            toggleHandler={this.manageBlogFiltersToggleHandler}
                            subheadTitle="manage blog filters"
                        />
                        { this.state.showManageBlogFilters ? 
                            <div className={classes.BlockContentItems}>
                                <InitializedBlogCategories />
                                <InitializeBlogTags />
                                <EditBlogCategories />
                                <EditBlogTags />
                            </div>
                        : null }
                    </div>
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageSubjectsToggle} 
                            toggleHandler={this.manageSubjectsToggleHandler}
                            subheadTitle="manage subject"
                        />
                        { this.state.showManageSubjects ? 
                            <div className={classes.BlockContentItems}>
                                {/* <AddSubjectIcon /> */}
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
                            <div /* className={classes.ContentItems} */className={classes.BlockContentItems}>
                                <FetchUserByAttribute />
                                <AddAuthorOrEditor />
                                <RemoveAuthorOrEditor />
                                { this.props.accountType === 'Head Administrator' || this.props.accountType === 'Senior Administrator' ?
                                    <AddAdminUsers /> : null
                                }
                                { this.props.accountType === 'Head Administrator' || this.props.accountType === 'Senior Administrator' ?
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
                            <div /* className={classes.ContentItems} */className={classes.BlockContentItems}>
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
        onClearAllAdminMessages: () => dispatch(actions.clearAllAdminMessages()),
        onFetchBlogCategories: () => dispatch(actions.fetchBlogCategories()),
        onFetchBlogTags: () => dispatch(actions.fetchBlogTags())
    };
};


export default connect(mapStateToProps,  mapDispatchToProps)(Admin);