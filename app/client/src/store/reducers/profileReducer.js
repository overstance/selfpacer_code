import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    updatedUser: {},
    adminAddError: null,
    userAddedFeedback: null,
    addedYoutubePlaylist: {},
    addYoutubePlaylistError: null,
    youtubePlaylistAddedFeedback: null,
    addedYoutubeVideo: {},
    addYoutubeVideoError: null,
    youtubeVideoAddedFeedback: null
};

const adminUserAdded = ( state, action ) => {
    return updateObject( state, {
        updatedUser: action.updatedUser,
        userAddedFeedback: "User added!",      
    } );
};

const adminAddStart = ( state, action ) => {
    return updateObject( state, {
        userAddedFeedback: null,
        adminAddError: null
    } );
};

const adminAddFailed = ( state, action ) => {
    return updateObject( state, {
        adminAddError: "Failed!: " + action.error
    } );
};

const youtubePlaylistAddStart = ( state, action ) => {
    return updateObject( state, {
        addYoutubePlaylistError: null,
        youtubePlaylistAddedFeedback: null
    } );
};

const youtubePlaylistAdded = ( state, action ) => {
    return updateObject( state, {
        youtubePlaylistAddedFeedback: action.addCount + ' item(s) added',
        addedYoutubePlaylist: action.playlists
    } );
};

const youtubePlaylistAddFailed = ( state, action ) => {
    return updateObject( state, {
        addYoutubePlaylistError: 'Failed!: ' + action.error
    } );
};

const youtubeVideoAddStart = ( state, action ) => {
    return updateObject( state, {
        addYoutubeVideoError: null,
        youtubeVideoAddedFeedback: null
    } );
};

const youtubeVideoAdded = ( state, action ) => {
    return updateObject( state, {
        youtubeVideoAddedFeedback: action.addCount + ' item(s) added',
        addedYoutubeVideo: action.videos
    } );
};

const youtubeVideoAddFailed = ( state, action ) => {
    return updateObject( state, {
        addYoutubeVideoError: 'Failed!: ' + action.error
    } );
};



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADMIN_USER_ADDED: return adminUserAdded( state, action );
        case actionTypes.ADMIN_ADD_START: return adminAddStart( state, action );
        case actionTypes.ADMIN_ADD_FAILED: return adminAddFailed( state, action );

        case actionTypes.YOUTUBE_PLAYLIST_ADDED: return youtubePlaylistAdded( state, action );
        case actionTypes.YOUTUBE_PLAYLIST_ADD_START: return youtubePlaylistAddStart( state, action );
        case actionTypes.YOUTUBE_PLAYLIST_ADD_FAILED: return youtubePlaylistAddFailed( state, action );

        case actionTypes.YOUTUBE_VIDEO_ADDED: return youtubeVideoAdded( state, action );
        case actionTypes.YOUTUBE_VIDEO_ADD_START: return youtubeVideoAddStart( state, action );
        case actionTypes.YOUTUBE_VIDEO_ADD_FAILED: return youtubeVideoAddFailed( state, action );
        default: return state;
    }
};

export default reducer;