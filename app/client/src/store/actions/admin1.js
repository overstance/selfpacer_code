import axios from 'axios';
import * as actionTypes from './actionTypes';

//Add AdminUser 

export const addAdminUser = (user_id) => {
    return dispatch => {
        dispatch (AdminAddStart());
        const newAdminUser = {
            userId: user_id
        };

        axios.post('/api/add_admin_user', newAdminUser)
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

// Remove Admin user

export const removeAdminUser = (user_id) => {
    return dispatch => {
        dispatch (adminUserRemoveStart());
        const adminUser = {
            userId: user_id
        };

        axios.post('/api/remove_admin_user', adminUser)
            .then(res => {

                if (res.data.updatedUser) {
                    dispatch(adminUserRemoved(res.data.updatedUser));
                    // history.push('/profile');
                    // return;
                } else {
                    console.log(res.data);
                    dispatch(adminUserRemoveFailed(res.data));
                }
            })
            .catch(err => 
                dispatch(adminUserRemoveFailed(err))               
            );        
    }
};

export const adminUserRemoveStart = () => {
    return {
        type: actionTypes.ADMIN_USER_REMOVE_START
    };
};

export const adminUserRemoved = ( updatedUser ) => {
    return {
        type: actionTypes.ADMIN_USER_REMOVED,
        updatedUser: updatedUser
    };
};

export const adminUserRemoveFailed = ( error ) => {
    return {
        type: actionTypes.ADMIN_USER_REMOVED_FAILED,
        error: error
    };
};


//Add Youtube Playlist

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

// Add Youtube Videos

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

//Update Youtube Video

export const updateYoutubeVideos = (subject, user) => {
    return dispatch => {
        dispatch (youtubeVideosUpdateStart());
        

        if (subject === 'Accounting') {
            const Admin = {
                user: user
            };
            axios.put('/api/youtube_accounting_video', Admin)
            .then( res => {
                if (res.data.length >= 1) {
                    dispatch(youtubeVideosUpdated(res.data, res.data.length));
                } else {
                    dispatch(youtubeVideosUpdateFailed( 'error!'))
                }
            }).catch(err => 
                dispatch(youtubeVideosUpdateFailed(err.name))               
            );  
        }
    }
};

export const youtubeVideosUpdateStart = () => {
    return {
        type: actionTypes.YOUTUBE_VIDEOS_UPDATE_START
    };
};

export const youtubeVideosUpdated = ( updatedVideos, updateCount ) => {
    return {
        type: actionTypes.YOUTUBE_VIDEOS_UPDATED,
        updatedVideos: updatedVideos,
        updateCount: updateCount
    };
};

export const youtubeVideosUpdateFailed = ( error ) => {
    return {
        type: actionTypes.YOUTUBE_VIDEOS_UPDATE_FAILED,
        error: error
    };
};

//Update Youtube Playlists

export const updateYoutubePlaylists = (subject, user) => {
    return dispatch => {
        dispatch (youtubePlaylistsUpdateStart());
        

        if (subject === 'Accounting') {
            const Admin = {
                user: user
            };
            axios.put('/api/youtube_accounting_playlist', Admin)
            .then( res => {
                if (res.data.length >= 1) {
                    dispatch(youtubePlaylistsUpdated(res.data, res.data.length));
                } else {
                    dispatch(youtubePlaylistsUpdateFailed( 'error!'))
                }
            }).catch(err => 
                dispatch(youtubePlaylistsUpdateFailed(err.name))               
            );  
        }
    }
};

export const youtubePlaylistsUpdateStart = () => {
    return {
        type: actionTypes.YOUTUBE_PLAYLISTS_UPDATE_START
    };
};

export const youtubePlaylistsUpdated = ( updatedPlaylists, updateCount ) => {
    return {
        type: actionTypes.YOUTUBE_PLAYLISTS_UPDATED,
        updatedPlaylists: updatedPlaylists,
        updateCount: updateCount
    };
};

export const youtubePlaylistsUpdateFailed = ( error ) => {
    return {
        type: actionTypes.YOUTUBE_PLAYLISTS_UPDATE_FAILED,
        error: error
    };
};