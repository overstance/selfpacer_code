import axios from 'axios';
import * as actionTypes from './actionTypes';

//AdminUser 

export const addAdminUser = (user_id) => {
    return dispatch => {
        dispatch (AdminAddStart());
        const newAdminUser = {
            userId: user_id
        };

        axios.post('/api/admin_user', newAdminUser)
            .then(res => {

                if (res.data.updatedUser) {
                    dispatch(adminUserAdded(res.data.updatedUser));
                    // history.push('/profile');
                    // return;
                } else {
                    dispatch(adminAddFailed(res.data));
                }
            })
            .catch(err => 
                dispatch(adminAddFailed(err))               
            );        
    }
};

export const AdminAddStart = () => {
    return {
        type: actionTypes.ADMIN_ADD_START
    };
};

export const adminUserAdded = ( updatedUser ) => {
    return {
        type: actionTypes.ADMIN_USER_ADDED,
        updatedUser: updatedUser
    };
};

export const adminAddFailed = ( error ) => {
    return {
        type: actionTypes.ADMIN_ADD_FAILED,
        error: error
    };
};



//Youtube Playlist

export const addYoutubePlaylist = (playlistId, subject, user) => {
    return dispatch => {
        dispatch (youtubePlaylistAddStart());
        

        if (subject === 'Accounting') {
            const asset = {
                id: playlistId,
                user: user
            };
          
            axios.post('/api/youtube_accounting_playlist', asset)
            .then( res => {
             
                if (res.data.length >= 1) {
                    dispatch(youtubePlaylistAdded(res.data, res.data.length));
                } else {
                    dispatch(youtubePlaylistAddFailed( 'error!'))
                }
            }).catch(err => 
                dispatch(youtubePlaylistAddFailed(err.name))               
            );  
        }
    }
};

export const youtubePlaylistAddStart = () => {
    return {
        type: actionTypes.YOUTUBE_PLAYLIST_ADD_START
    };
};

export const youtubePlaylistAdded = ( playlists, addCount ) => {
    return {
        type: actionTypes.YOUTUBE_PLAYLIST_ADDED,
        playlists: playlists,
        addCount: addCount
    };
};

export const youtubePlaylistAddFailed = ( error ) => {
    return {
        type: actionTypes.YOUTUBE_PLAYLIST_ADD_FAILED,
        error: error
    };
};

// youtube Video

//onAddYoutubeVideo: (videoId, subject) => dispatch( actions.addYoutubePlaylist(videoId, subject) )

export const addYoutubeVideo = (videoId, subject, user) => {
    return dispatch => {
        dispatch (youtubeVideoAddStart());
        

        if (subject === 'Accounting') {
            const asset = {
                id: videoId,
                user: user
            };
            axios.post('/api/youtube_accounting_video', asset)
            .then( res => {
                if (res.data.length >= 1) {
                    dispatch(youtubeVideoAdded(res.data, res.data.length));
                } else {
                    dispatch(youtubeVideoAddFailed( 'error!'))
                }
            }).catch(err => 
                dispatch(youtubeVideoAddFailed(err.name))               
            );  
        }
    }
};

export const youtubeVideoAddStart = () => {
    return {
        type: actionTypes.YOUTUBE_VIDEO_ADD_START
    };
};

export const youtubeVideoAdded = ( videos, addCount ) => {
    return {
        type: actionTypes.YOUTUBE_VIDEO_ADDED,
        addCount: addCount,
        videos: videos
    };
};

export const youtubeVideoAddFailed = ( error ) => {
    return {
        type: actionTypes.YOUTUBE_VIDEO_ADD_FAILED,
        error: error
    };
};

