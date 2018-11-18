import React from 'react';
import classes from './Admin1.css';
// import * as actions from '../../store/actions/index';
// import { connect } from 'react-redux';
import AddYoutubeVideos from './youtubeVideos/AddYoutubeVideos';
import AddYoutubePlaylists from './youtubePlaylist/AddYoutubePlaylists';
import AddAdminUsers from './adminUsers/AddAdminUsers';
import RemoveAdminUsers from './adminUsers/RemoveAdminUsers';
import UpdateYoutubeVideos from './youtubeVideos/UpdateYoutubeVideos';
import UpdateYoutubePlaylists from './youtubePlaylist/UpdateYoutubePlaylists';

const admin1 = (props) => (
    <div>
        <div>
            <div>
                <div className={classes.Options}>Manage Users</div>
                <div className={classes.ContentItems}>
                    <AddAdminUsers />
                    <RemoveAdminUsers />
                </div>
            </div>
            <div>
                <div className={classes.Options}>Manage Youtube Videos</div>
                <div className={classes.ContentItems}>
                    <AddYoutubeVideos />
                    <UpdateYoutubeVideos />
                </div>
            </div>
            <div>
                <div className={classes.Options}>Manage Youtube Playlists</div>
                <div className={classes.ContentItems}>
                    <AddYoutubePlaylists />
                    <UpdateYoutubePlaylists />
                </div>
            </div>
        </div>
    </div>
); 

export default admin1;