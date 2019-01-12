import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    updatedUser: {},
    adminAddError: null,
    userAddedFeedback: null,

    subjectToEditPath: null,
    subjectToEditCurriculum: null,

    editSubjectSuccessInfo: null,
    editSubjectError: null,
    
    removedUser: {},
    adminUserRemoveError: null,
    adminUserRemovedFeedback: null,
    
    youtubePlaylistLoading: false,
    addedYoutubePlaylist: {},
    addYoutubePlaylistError: null,
    youtubePlaylistAddedFeedback: null,

    updatedYoutubePlaylists: null,
    updateYoutubePlaylistsError: null,
    youtubePlaylistsUpdatedFeedback: null,
    
    addedYoutubeVideo: {},
    addYoutubeVideoError: null,
    youtubeVideoAddedFeedback: null,

    updatedYoutubeVideos: null,
    updateYoutubeVideosError: null,
    youtubeVideosUpdatedFeedback: null,

    addMoocSucessInfo: null,
    addMoocError: null,

    addBooksSucessInfo: null,
    addBooksError: null
};

// Add Admin User 

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

//Remove Admin User

const adminUserRemoved = ( state, action ) => {
    return updateObject( state, {
        removedUser: action.updatedUser,
        adminUserRemovedFeedback: "User removed!",      
    } );
};

const adminUserRemoveStart = ( state, action ) => {
    return updateObject( state, {
        adminUserRemovedFeedback: null,
        adminUserRemoveError: null
    } );
};

const adminUserRemoveFailed = ( state, action ) => {
    return updateObject( state, {
        adminUserRemoveError: "Failed!: " + action.error
    } );
};

//Add Youtube Playlist

const youtubePlaylistAddStart = ( state, action ) => {
    return updateObject( state, {
        addYoutubePlaylistError: null,
        youtubePlaylistAddedFeedback: null,
        youtubePlaylistLoading: true
    } );
};

const youtubePlaylistAdded = ( state, action ) => {
    return updateObject( state, {
        youtubePlaylistAddedFeedback: action.addCount + ' item(s) added',
        addedYoutubePlaylist: action.playlists,
        youtubePlaylistLoading: false
    } );
};

const youtubePlaylistAddFailed = ( state, action ) => {
    return updateObject( state, {
        addYoutubePlaylistError: 'Failed!: ' + action.error,
        youtubePlaylistLoading: false
    } );
};

//Update Youtube Playlist

const youtubePlaylistsUpdateStart = ( state, action ) => {
    return updateObject( state, {
        updateYoutubePlaylistsError: null,
        youtubePlaylistsUpdatedFeedback: null
    } );
};

const youtubePlaylistsUpdated = ( state, action ) => {
    return updateObject( state, {
        youtubePlaylistsUpdatedFeedback: action.updateCount + ' Playlists updated',
        updatedYoutubePlaylists: action.updatedPlaylists
    } );
};

const youtubePlaylistsUpdatedFailed = ( state, action ) => {
    return updateObject( state, {
        updateYoutubePlaylistsError: 'Update Failed!: ' + action.error
    } );
};

//Add Yotube Videos

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

//Update Youtube Videos

const youtubeVideosUpdateStart = ( state, action ) => {
    return updateObject( state, {
        updateYoutubeVideosError: null,
        youtubeVideosUpdatedFeedback: null
    } );
};

const youtubeVideosUpdated = ( state, action ) => {
    return updateObject( state, {
        youtubeVideosUpdatedFeedback: action.updateCount + ' videos updated',
        updatedYoutubeVideos: action.updatedVideos
    } );
};

const youtubeVideosUpdatedFailed = ( state, action ) => {
    return updateObject( state, {
        updateYoutubeVideosError: 'Update Failed!: ' + action.error
    } );
};

// ADD MOOC RESOURCE

const addMoocSuccess = ( state, action ) => {
    return updateObject( state, {
        addMoocSucessInfo: action.info
    });
}

const addMoocFailed = ( state, action ) => {
    return updateObject( state, {
        addMoocError: 'add failed!:' + action.error
    });
}

const clearAddMoocFeedbacks = ( state, action ) => {
    return updateObject( state, {
        addMoocError: null,
        addMoocSucessInfo: null
    });
}

// ADD BOOKS RESOURCE

const addBooksSuccess = ( state, action ) => {
    return updateObject( state, {
        addBooksSucessInfo: action.info
    });
}

const addBooksFailed = ( state, action ) => {
    return updateObject( state, {
        addBooksError: 'add failed!:' + action.error
    });
}

const clearAddBooksFeedbacks = ( state, action ) => {
    return updateObject( state, {
        addBooksError: null,
        addBooksSucessInfo: null
    });
}

// Fetch subject to edit path and curricula

const fetchSubjectToEditSuccess = ( state, action ) => {
    return updateObject( state, {
        subjectToEditPath: action.path,
        subjectToEditCurriculum: action.curriculum
    });
}

// Edit Subject path and curriculum

const editSubjectStart = ( state, action ) => {
    return updateObject( state, {
        editSubjectError: null,
        editSubjectSuccessInfo: null,
        subjectToEditPath: null,
        subjectToEditCurriculum: null
    });
}

const editSubjectSuccess = ( state, action ) => {
    return updateObject( state, {
        editSubjectSuccessInfo: action.successInfo
    });
}

const editSubjectFail = ( state, action ) => {
    return updateObject( state, {
        editSubjectError: 'error: ' + action.error
    });
}

// clear all admin add messages

const clearAddMessages = ( state, action ) => {
    return updateObject( state, {
    adminAddError: null,
    editSubjectSuccessInfo: null,
    editSubjectError: null,
    adminUserRemoveError: null,
    adminUserRemovedFeedback: null,
    addYoutubePlaylistError: null,
    youtubePlaylistAddedFeedback: null,
    updateYoutubePlaylistsError: null,
    youtubePlaylistsUpdatedFeedback: null,
    addYoutubeVideoError: null,
    youtubeVideoAddedFeedback: null,
    updateYoutubeVideosError: null,
    youtubeVideosUpdatedFeedback: null,
    addMoocSucessInfo: null,
    addMoocError: null,
    addBooksSucessInfo: null,
    addBooksError: null
    });
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADMIN_USER_ADDED: return adminUserAdded( state, action );
        case actionTypes.ADMIN_ADD_START: return adminAddStart( state, action );
        case actionTypes.ADMIN_ADD_FAILED: return adminAddFailed( state, action );

        case actionTypes.ADMIN_USER_REMOVE_START: return adminUserRemoveStart( state, action );
        case actionTypes.ADMIN_USER_REMOVED: return adminUserRemoved( state, action );
        case actionTypes.ADMIN_USER_REMOVED_FAILED: return adminUserRemoveFailed( state, action );

        case actionTypes.FETCH_SUBJECT_TO_EDIT_SUCCESS: return fetchSubjectToEditSuccess( state, action );

        case actionTypes.EDIT_SUBJECT_START: return editSubjectStart( state, action );
        case actionTypes.EDIT_SUBJECT_SUCCESS: return editSubjectSuccess( state, action );
        case actionTypes.EDIT_SUBJECT_FAIL: return editSubjectFail( state, action );

        case actionTypes.YOUTUBE_PLAYLIST_ADDED: return youtubePlaylistAdded( state, action );
        case actionTypes.YOUTUBE_PLAYLIST_ADD_START: return youtubePlaylistAddStart( state, action );
        case actionTypes.YOUTUBE_PLAYLIST_ADD_FAILED: return youtubePlaylistAddFailed( state, action );

        case actionTypes.YOUTUBE_PLAYLISTS_UPDATED: return youtubePlaylistsUpdated( state, action );
        case actionTypes.YOUTUBE_PLAYLISTS_UPDATE_START: return youtubePlaylistsUpdateStart( state, action );
        case actionTypes.YOUTUBE_PLAYLISTS_UPDATE_FAILED: return youtubePlaylistsUpdatedFailed( state, action );

        case actionTypes.YOUTUBE_VIDEO_ADDED: return youtubeVideoAdded( state, action );
        case actionTypes.YOUTUBE_VIDEO_ADD_START: return youtubeVideoAddStart( state, action );
        case actionTypes.YOUTUBE_VIDEO_ADD_FAILED: return youtubeVideoAddFailed( state, action );

        case actionTypes.YOUTUBE_VIDEOS_UPDATED: return youtubeVideosUpdated( state, action );
        case actionTypes.YOUTUBE_VIDEOS_UPDATE_START: return youtubeVideosUpdateStart( state, action );
        case actionTypes.YOUTUBE_VIDEOS_UPDATE_FAILED: return youtubeVideosUpdatedFailed( state, action );

        case actionTypes.ADD_MOOC_SUCCESS: return addMoocSuccess( state, action );
        case actionTypes.ADD_MOOC_FAILED: return addMoocFailed( state, action );
        case actionTypes.CLEAR_ADD_MOOC_FEEDBACKS: return clearAddMoocFeedbacks( state, action );

        case actionTypes.ADD_BOOKS_SUCCESS: return addBooksSuccess( state, action );
        case actionTypes.ADD_BOOKS_FAILED: return addBooksFailed( state, action );
        case actionTypes.CLEAR_ADD_BOOKS_FEEDBACKS: return clearAddBooksFeedbacks( state, action );

        case actionTypes.CLEAR_ADD_MESSAGES: return clearAddMessages( state, action );

        default: return state;
    }
};



export default reducer;