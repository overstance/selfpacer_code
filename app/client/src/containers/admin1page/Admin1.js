import React, { Component } from 'react';
import classes from './Admin1.css';
import SubHeader from '../../components/UserInterface/Subheader/SubHeader';

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
        manageSubjectsIconRotate: false,

        showManageUsers: false,
        manageUsersIconRotate: false,

        showManageYoutubeVideos: false,
        manageYoutubeVideosIconRotate: false,

        showManageYoutubePlaylists: false,
        manageYoutubePlaylistsIconRotate: false,

        showManageMoocs: false,
        manageMoocsIconRotate: false,

        showManageBooks: false,
        manageBooksIconRotate: false,
    }

    manageSubjectsToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageSubjects: !prevState.showManageSubjects,
                manageSubjectsIconRotate: !prevState.manageSubjectsIconRotate
            };
        });
    }

    manageUsersToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageUsers: !prevState.showManageUsers,
                manageUsersIconRotate: !prevState.manageUsersIconRotate
            };
        });
    }

    manageYoutubeVideosToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageYoutubeVideos: !prevState.showManageYoutubeVideos,
                manageYoutubeVideosIconRotate: !prevState.manageYoutubeVideosIconRotate
            };
        });
    }

    manageYoutubePlaylistsToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageYoutubePlaylists: !prevState.showManageYoutubePlaylists,
                manageYoutubePlaylistsIconRotate: !prevState.manageYoutubePlaylistsIconRotate      
            };
        });
    }

    manageMoocsToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageMoocs: !prevState.showManageMoocs,
                manageMoocsIconRotate: !prevState.manageMoocsIconRotate
            };
        });
    }

    manageBooksToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showManageBooks: !prevState.showManageBooks,
                manageBooksIconRotate: !prevState.manageBooksIconRotate
            };
        });
    }

    render() {
        return(
            <Container>
                <div style={{'padding': '16px 0'}}>
                    <div className={classes.Subheader}>
                        <SubHeader 
                            subheadTitle="CONFIRM RESOURCES"
                            isLink
                            link='/admin_tools/confirm_resources'
                        />
                    </div>
                    < div style={{'color': 'white', 'height': '1px'}} />
                    <div className={classes.Subheader}>
                        <SubHeader 
                            filterIconRotate={this.state.manageSubjectsIconRotate} 
                            filterToggleHandler={this.manageSubjectsToggleHandler}
                            subheadTitle="MANAGE SUBJECTS"
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
                        <SubHeader 
                            filterIconRotate={this.state.manageUsersIconRotate} 
                            filterToggleHandler={this.manageUsersToggleHandler}
                            subheadTitle="MANAGE USERS"
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
                        <SubHeader 
                            filterIconRotate={this.state.manageYoutubeVideosIconRotate} 
                            filterToggleHandler={this.manageYoutubeVideosToggleHandler}
                            subheadTitle="MANAGE YOUTUBE VIDEOS"
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
                        <SubHeader 
                            filterIconRotate={this.state.manageYoutubePlaylistsIconRotate} 
                            filterToggleHandler={this.manageYoutubePlaylistsToggleHandler}
                            subheadTitle="MANAGE YOUTUBE PLAYLISTS"
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
                        <SubHeader 
                            filterIconRotate={this.state.manageMoocsIconRotate} 
                            filterToggleHandler={this.manageMoocsToggleHandler}
                            subheadTitle="MANAGE MOOCS"
                        />
                        { this.state.showManageMoocs ? 
                            <div className={classes.ContentItems}>
                                <AddMooc />
                            </div>
                        : null }
                    </div>
                    < div style={{'color': 'white', 'height': '1px'}} />
                    <div className={classes.Subheader}>
                        <SubHeader 
                            filterIconRotate={this.state.manageBooksIconRotate} 
                            filterToggleHandler={this.manageBooksToggleHandler}
                            subheadTitle="MANAGE BOOKS"
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