import React, { Component } from 'react';
import classes from './Admin1.css';
// import SubHeader from '../../components/UserInterface/Subheader/SubHeader';
import Toggler from '../../components/UserInterface/Toggler/Toggler';

import AddYoutubeVideos from './youtubeVideos/AddYoutubeVideos';
import AddYoutubePlaylists from './youtubePlaylist/AddYoutubePlaylists';
import AddAdminUsers from './adminUsers/AddAdminUsers';
import RemoveAdminUsers from './adminUsers/RemoveAdminUsers';
import UpdateYoutubeVideos from './youtubeVideos/UpdateYoutubeVideos';
import UpdateYoutubePlaylists from './youtubePlaylist/UpdateYoutubePlaylists';
import AddMooc from './manageMoocs/AddMooc';
import AddBooks from './manageBooks/AddBooks';
import AddSubjectIcon from './manageSubjects/AddSubjectIcon';
import EditSubect from './manageSubjects/EditSubject';
import Container from '../../components/UserInterface/Container/Container';

class Admin1 extends Component {

    state = {
        showManageSubjects: false,
        manageSubjectsToggle: false,

        showManageUsers: false,
        manageUsersToggle: false,

        showManageYoutubeVideos: false,
        manageYoutubeVideosToggle: false,

        showManageYoutubePlaylists: false,
        manageYoutubePlaylistsToggle: false,

        showManageMoocs: false,
        manageMoocsToggle: false,

        showManageBooks: false,
        manageBooksToggle: false,
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

    manageYoutubeVideosToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageYoutubeVideos: !prevState.showManageYoutubeVideos,
                manageYoutubeVideosToggle: !prevState.manageYoutubeVideosToggle
            };
        });
    }

    manageYoutubePlaylistsToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageYoutubePlaylists: !prevState.showManageYoutubePlaylists,
                manageYoutubePlaylistsToggle: !prevState.manageYoutubePlaylistsToggle      
            };
        });
    }

    manageMoocsToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageMoocs: !prevState.showManageMoocs,
                manageMoocsToggle: !prevState.manageMoocsToggle
            };
        });
    }

    manageBooksToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageBooks: !prevState.showManageBooks,
                manageBooksToggle: !prevState.manageBooksToggle
            };
        });
    }

    render() {
        return(
            <Container>
                <div >
                    <div className={classes.Subheader}>
                        <Toggler 
                            subheadTitle="confirm resources"
                            isLink
                            link='/admin_tools/confirm_resources'
                        />
                    </div>
                    < div style={{'color': 'white', 'height': '1px'}} />
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageSubjectsToggle} 
                            toggleHandler={this.manageSubjectsToggleHandler}
                            subheadTitle="manage resources"
                        />
                        { this.state.showManageSubjects ? 
                            <div className={classes.BlockContentItems}>
                                <AddSubjectIcon />
                                <EditSubect />
                            </div>
                        : null }
                    </div>
                    < div style={{'color': 'white', 'height': '1px'}} />
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
                                {/* <AddSubjectIcon /> */}
                            </div>
                        : null }
                    </div>
                    < div style={{'color': 'white', 'height': '1px'}} />
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageYoutubeVideosToggle} 
                            toggleHandler={this.manageYoutubeVideosToggleHandler}
                            subheadTitle="manage youtube-videos"
                        />
                        { this.state.showManageYoutubeVideos ? 
                            <div className={classes.ContentItems}>
                                <AddYoutubeVideos />
                                <UpdateYoutubeVideos />
                            </div>
                        : null }
                    </div>
                    < div style={{'color': 'white', 'height': '1px'}} />
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageYoutubePlaylistsToggle} 
                            toggleHandler={this.manageYoutubePlaylistsToggleHandler}
                            subheadTitle="manage youtube-playlists"
                        />
                        { this.state.showManageYoutubePlaylists ? 
                            <div className={classes.ContentItems}>
                                <AddYoutubePlaylists />
                                <UpdateYoutubePlaylists />
                            </div>
                        : null }
                    </div>
                    < div style={{'color': 'white', 'height': '1px'}} />
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageMoocsToggle} 
                            toggleHandler={this.manageMoocsToggleHandler}
                            subheadTitle="manage courses"
                        />
                        { this.state.showManageMoocs ? 
                            <div className={classes.ContentItems}>
                                <AddMooc />
                            </div>
                        : null }
                    </div>
                    < div style={{'color': 'white', 'height': '1px'}} />
                    <div className={classes.Subheader}>
                        <Toggler 
                            toggle={this.state.manageBooksToggle} 
                            toggleHandler={this.manageBooksToggleHandler}
                            subheadTitle="manage books"
                        />
                        { this.state.showManageBooks ? 
                            <div className={classes.ContentItems}>
                                <AddBooks />
                            </div>
                        : null }
                    </div>
                    < div style={{'color': 'white', 'height': '1px'}} />
                </div>
            </Container>
        )
    }
}

export default Admin1;