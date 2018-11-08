import React from 'react';
import classes from './Admin1.css';
// import * as actions from '../../store/actions/index';
// import { connect } from 'react-redux';
import ManageYoutubeVideos from './youtubeVideos/ManageYoutubeVideos';
import ManageYoutubePlaylists from './youtubePlaylist/ManageYoutubePlaylists';
import ManageAdminUsers from './adminUsers/ManageAdminUsers';

const admin1 = (props) => (
    <div>
        <div className={classes.ContentItems}>
            <ManageAdminUsers /> 
            <ManageYoutubeVideos />
            <ManageYoutubePlaylists />
        </div>
    </div>
); 

export default admin1;