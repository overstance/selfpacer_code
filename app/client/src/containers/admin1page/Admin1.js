import React, { Component } from 'react';
import classes from './Admin1.css';
// import * as actions from '../../store/actions/index';
// import { connect } from 'react-redux';
import AddYoutubeVideos from './youtubeVideos/AddYoutubeVideos';
import AddYoutubePlaylists from './youtubePlaylist/AddYoutubePlaylists';
import AddAdminUsers from './adminUsers/AddAdminUsers';
import RemoveAdminUsers from './adminUsers/RemoveAdminUsers';
import UpdateYoutubeVideos from './youtubeVideos/UpdateYoutubeVideos';
import UpdateYoutubePlaylists from './youtubePlaylist/UpdateYoutubePlaylists';
import SubHeader from '../../components/UserInterface/Subheader/SubHeader';
import AddMooc from './manageMoocs/AddMooc';

class Admin1 extends Component {

    state = {
        showManageUsers: false,
        manageUsersIconRotate: false,
        showManageYoutubeVideos: false,
        manageYoutubeVideosIconRotate: false,
        showManageYoutubePlaylists: false,
        manageYoutubePlaylistsIconRotate: false,
        showManageMoocs: false,
        manageMoocsIconRotate: false,
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

    render() {
        return(
            <div>
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
            </div>
        )
    }
}

export default Admin1;