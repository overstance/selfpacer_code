import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    fetchResourceByIdError: null,
    fetchedResource: null,
    fetchResourceByIdLoading: false,

    clickedResourcePlatform: null,
    userRecentlyViewed: [],

    unconfirmedResources: [],
    unconfirmedLoading: false, 
    fetchMoreUnconfirmedLoading: false,
    unconfirmedLatestFetchLength: 0,

    confirmResourceLoading: false,
    confirmResourceError: null,
    confirmingResourceId: null,

    deleteUnconfirmedLoading: false,
    deleteUnconfirmedError: null,
    deletingUnconfirmedId: null,

    /* recentlyViewedResources: [], */

    userAssetCountLoading: false,
    userAssetCount: 0,
    userAssetCountError: null,
    
    userAssets: [],
    fetchAssetError: null,

    fetchMoreLoading: false,
    fetchMoreError: null,
    latestFetchLength: 0,

    addYoutubePlaylistLoading: false,
    addedYoutubePlaylist: {},
    addYoutubePlaylistError: null,
    youtubePlaylistAddedFeedback: null,

    updateYoutubePlaylistsLoading: false,
    updateYoutubePlaylistsError: null,
    updateYoutubePlaylistsFeedback: null,
    
    addYoutubeVideoLoading: false,
    addedYoutubeVideo: {},
    addYoutubeVideoError: null,
    youtubeVideoAddedFeedback: null,

    updateYoutubeVideosLoading: false,
    updateYoutubeVideosError: null,
    youtubeVideosUpdatedFeedback: null,

    addMoocLoading: false,
    addMoocSucessInfo: null,
    addMoocError: null,

    addBooksLoading: false,
    addBooksSucessInfo: null,
    addBooksError: null,

    assetToUpdateFields: {
        duration: '',
        enrollees: '',
        videoCount: '',
        level: '',
        avgRating: '',
        lastUpdated: ''
    },
    updateAssetLoading: false,
    updateAssetSuccessInfo: null,
    updateAssetError: null,

    updatingYoutubeAssetId: null,
    updateYoutubeAssetLoading: false,
    updatedYoutubeAsset: null,
    updateFailedYoutubeAsset: null,

    deleteAssetLoading: false,
    deleteAssetSuccessInfo: null,
    deleteAssetError: null
};


// detect user asset count

const userAssetCountStart = ( state, action ) => {
    return updateObject( state, { 
        userAssetCountLoading: true,
        userAssetCountError: null 
    } );
};

const userAssetCountSuccess = ( state, action ) => {
    return updateObject( state, {
        userAssetCount: action.assetCount,
        userAssetCountLoading: false
    } );
};

const userAssetCountFail = ( state, action ) => {
    return updateObject( state, { 
        userAssetCountLoading: false,
        userAssetCountError: action.error 
    } );
};



// Add user resource

const addResourceStart = ( state, action ) => {
    return updateObject( state, { error: null, successMessage: null } );
};

const addResourceSuccess = ( state, action ) => {
    return updateObject( state, {
        successMessage: action.message,
        error: null
    } );
};

const addResourceFail = ( state, action ) => {
    return updateObject( state, { error: action.error } );
};

//Fetch Clicked Resource By ID

const fetchResourceByIdStart = ( state, action ) => {
    return updateObject( state, { 
        fetchResourceByIdLoading: true 
    } );
};

const fetchResourceByIdSuccess = ( state, action ) => {
    return updateObject( state, {
        fetchedResource: action.resource,
        fetchResourceByIdLoading: false
    } );
};

const fetchResourceByIdFail = ( state, action ) => {
    return updateObject( state, { 
        fetchResourceByIdLoading: false, 
        fetchResourceByIdError: action.error 
    } );
};

const clearFetchResouceByIdMessages = ( state, action ) => {
    return updateObject( state, { 
        fetchResourceByIdLoading: false, 
        fetchResourceByIdError: null,
        fetchedResource: null 
    } );
};


//Set Clicked Platform

const setClickedPlatform = ( state, action ) => {
    return updateObject( state, { clickedResourcePlatform: action.platform } );
};

// Set user liked resources

const setUserRecentlyViewed = ( state, action ) => {
    return updateObject( state, { userRecentlyViewed: action.userRecentlyViewed } );
};

// update user liked resources

const updateUserRecentlyViewedResources = ( state, action ) => {
    return updateObject( state, { userRecentlyViewed: action.recentlyViewed } );
};

const fetchUserAssetStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchUserAssetSuccess = ( state, action ) => {
    return updateObject( state, {
        userAssets: action.userAssets,
        loading: false,
        latestFetchLength: action.resourceLength
    } );
};

const fetchUserAssetFailed = ( state, action ) => {
    return updateObject( state, { loading: false, fetchAssetError: action.error } );
};

// fetch more assets

const fetchMoreStart = ( state, action ) => {
    return updateObject( state, { fetchMoreLoading: true } );
};

const fetchMoreSuccess = ( state, action ) => {
    return updateObject( state, {
        userAssets: action.userAssets,
        fetchMoreLoading: false,
        latestFetchLength: action.resourceLength
    } );
};

const fetchMoreFail = ( state, action ) => {
    return updateObject( state, { 
        fetchMoreLoading: false,
        fetchMoreError: action.error 
    } );
};



// fetch user recently viewed resources

/* const fetchRecentlyViewedResources = ( state, action ) => {
    return updateObject( state, { recentlyViewedResources: action.resources } );
}; */

// fetch unconfirmed resources

const fetchUnconfirmedStart = ( state, action ) => {
    return updateObject( state, { unconfirmedLoading: true } );
};

const fetchUnconfirmedSuccess = ( state, action ) => {
    return updateObject( state, {
        unconfirmedResources: action.resources,
        unconfirmedLatestFetchLength: action.resourceLength,
        unconfirmedLoading: false
    } );
};

const fetchUnconfirmedFail = ( state, action ) => {
    return updateObject( state, { unconfirmedLoading: false } );
};

// fetch more unconfirmed resources

const fetchMoreUnconfirmedStart = ( state, action ) => {
    return updateObject( state, { fetchMoreUnconfirmedLoading: true } );
};

const fetchMoreUnconfirmedSuccess = ( state, action ) => {
    return updateObject( state, {
        unconfirmedResources: action.resources,
        unconfirmedLatestFetchLength: action.resourceLength,
        fetchMoreUnconfirmedLoading: false
    } );
};

const fetchMoreUnconfirmedFail = ( state, action ) => {
    return updateObject( state, { fetchMoreUnconfirmedLoading: false } );
};

// Confirm Resource

const confirmResourceStart = ( state, action ) => {
    return updateObject( state, { 
        confirmResourceLoading: true,
        confirmingResourceId: action.resourceId,
        confirmResourceError: null 
    } );
};

const confirmResourceSuccess = ( state, action ) => {
    return updateObject( state, {
        unconfirmedResources: action.updatedResources,
        confirmResourceLoading: false,
        confirmingResourceId: null
    } );
};

const confirmResourceFail = ( state, action ) => {
    return updateObject( state, { 
        confirmResourceLoading: false,
        confirmResourceError: action.error
    } );
};

// Delete Unconfirmed 

const deleteUnconfirmedStart = ( state, action ) => {
    return updateObject( state, { 
        deleteUnconfirmedLoading: true,
        deletingUnconfirmedId: action.resourceId,
        deleteUnconfirmedError: null
    } );
};

const deleteUnconfirmedSuccess = ( state, action ) => {
    return updateObject( state, {
        unconfirmedResources: action.updatedResources,
        deleteUnconfirmedLoading: false
    } );
};

const deleteUnconfirmedFail = ( state, action ) => {
    return updateObject( state, { 
        deleteUnconfirmedLoading: false,
        deleteUnconfirmedError: action.error
    } );
};


// set asset to update fields

const setAssetToupdateFields = ( state, action ) => {
    return updateObject( state, { assetToUpdateFields: action.assetToUpdateFields } );
};

//Add Youtube Playlist

const youtubePlaylistAddStart = ( state, action ) => {
    return updateObject( state, {
        addYoutubePlaylistError: null,
        youtubePlaylistAddedFeedback: null,
        addYoutubePlaylistLoading: true
    } );
};

const youtubePlaylistAdded = ( state, action ) => {
    return updateObject( state, {
        youtubePlaylistAddedFeedback: action.addCount + ' item(s) added',
        addedYoutubePlaylist: action.playlists,
        addYoutubePlaylistLoading: false
    } );
};

const youtubePlaylistAddFailed = ( state, action ) => {
    return updateObject( state, {
        addYoutubePlaylistError: 'Failed!: ' + action.error,
        addYoutubePlaylistLoading: false
    } );
};

//Update Youtube Playlist

const youtubePlaylistsUpdateStart = ( state, action ) => {
    return updateObject( state, {
        updateYoutubePlaylistsLoading: true,
        updateYoutubePlaylistsError: null,
        updateYoutubePlaylistsFeedback: null
    } );
};

const youtubePlaylistsUpdated = ( state, action ) => {
    return updateObject( state, {
        updateYoutubePlaylistsLoading: false,
        updateYoutubePlaylistsFeedback: action.updateCount + ' Playlists updated',
    } );
};

const youtubePlaylistsUpdatedFailed = ( state, action ) => {
    return updateObject( state, {
        updateYoutubePlaylistsLoading: false,
        updateYoutubePlaylistsError: 'Update Failed!: ' + action.error
    } );
};

//Add Yotube Videos

const youtubeVideoAddStart = ( state, action ) => {
    return updateObject( state, {
        addYoutubeVideoError: null,
        youtubeVideoAddedFeedback: null,
        addYoutubeVideoLoading: true
    } );
};

const youtubeVideoAdded = ( state, action ) => {
    return updateObject( state, {
        youtubeVideoAddedFeedback: action.addCount + ' item(s) added',
        addedYoutubeVideo: action.videos,
        addYoutubeVideoLoading: false
    } );
};

const youtubeVideoAddFailed = ( state, action ) => {
    return updateObject( state, {
        addYoutubeVideoError: 'Failed!: ' + action.error,
        addYoutubeVideoLoading: false
    } );
};

//Update Youtube Videos

const youtubeVideosUpdateStart = ( state, action ) => {
    return updateObject( state, {
        updateYoutubeVideosLoading: true,
        updateYoutubeVideosError: null,
        youtubeVideosUpdatedFeedback: null,
    } );
};

const youtubeVideosUpdated = ( state, action ) => {
    return updateObject( state, {
        updateYoutubeVideosLoading: false,
        youtubeVideosUpdatedFeedback: action.updateCount + ' videos updated',
    } );
};

const youtubeVideosUpdatedFailed = ( state, action ) => {
    return updateObject( state, {
        updateYoutubeVideosLoading: false,
        updateYoutubeVideosError: 'Update Failed!: ' + action.error
    } );
};

// ADD MOOC RESOURCE

const addMoocStart = ( state, action ) => {
    return updateObject( state, {
        addMoocSucessInfo: null,
        addMoocError: null,
        addMoocLoading: true
    });
}

const addMoocSuccess = ( state, action ) => {
    return updateObject( state, {
        addMoocSucessInfo: action.info,
        addMoocLoading: false
    });
}

const addMoocFailed = ( state, action ) => {
    return updateObject( state, {
        addMoocError: 'add failed!:' + action.error,
        addMoocLoading: false
    });
}

// ADD BOOKS RESOURCE

const addBooksStart = ( state, action ) => {
    return updateObject( state, {
        addBooksLoading: true,
        addBooksSucessInfo: null,
        addBooksError: null
    });
}

const addBooksSuccess = ( state, action ) => {
    return updateObject( state, {
        addBooksSucessInfo: action.info,
        addBooksLoading: false,
    });
}

const addBooksFailed = ( state, action ) => {
    return updateObject( state, {
        addBooksError: 'add failed!:' + action.error,
        addBooksLoading: false,
    });
}

// update youtube asset

const updateYoutubeAssetStart = ( state, action ) => {
    return updateObject( state,  { 
        updateYoutubeAssetLoading: true,
        updatingYoutubeAssetId: action.resourceId
    });
};

const updateYoutubeAssetSuccess = ( state, action ) => {
    return updateObject( state, {
        updateYoutubeAssetLoading: false,
        updatingYoutubeAssetId: null,
        updatedYoutubeAsset: action.resourceId,
        userAssets: action.updatedAssets
    } );
};

const updateYoutubeAssetFail = ( state, action ) => {
    return updateObject( state, {
        updateYoutubeAssetLoading: false,
        updatingYoutubeAssetId: null,
        updateFailedYoutubeAsset: action.resourceId
    } );
};

// update mooc asset

const updateMoocAssetStart = ( state, action ) => {
    return updateObject( state, { updateAssetLoading: true } );
};

const updateMoocAssetSuccess = ( state, action ) => {
    return updateObject( state, {
        updateAssetSuccessInfo: action.info,
        userAssets: action.updatedAssets,
        updateAssetLoading: false
    } );
};

const updateMoocAssetFail = ( state, action ) => {
    return updateObject( state, { updateAssetLoading: false, updateAssetError: action.error } );
};

// update book asset

const updateBookAssetStart = ( state, action ) => {
    return updateObject( state, { updateAssetLoading: true } );
};

const updateBookAssetSuccess = ( state, action ) => {
    return updateObject( state, {
        updateAssetSuccessInfo: action.info,
        userAssets: action.updatedAssets,
        updateAssetLoading: false
    } );
};

const updateBookAssetFail = ( state, action ) => {
    return updateObject( state, { updateAssetLoading: false, updateAssetError: action.error } );
};

// clear update asset message

const clearUpdateAssetMessages = ( state, action ) => {
    return updateObject( state, { 
        updateAssetError: null,
        updateAssetSuccessInfo: null,
        deleteAssetError: null,
        deleteAssetSuccessInfo: null  
    });
};

// delete asset

const deleteAssetStart = ( state, action ) => {
    return updateObject( state, { deleteAssetLoading: true } );
};

const deleteAssetSuccess = ( state, action ) => {
    return updateObject( state, {
        deleteAssetSuccessInfo: action.info,
        userAssets: action.resources,
        deleteAssetLoading: false
    } );
};

const deleteAssetFail = ( state, action ) => {
    return updateObject( state, { deleteAssetLoading: false, deleteAssetError: action.error } );
};

// clear all add resource messages

const clearAddResourceMessages = ( state, action ) => {
    return updateObject( state, { 
        addYoutubePlaylistError: null,
        youtubePlaylistAddedFeedback: null,
        addYoutubeVideoError: null,
        youtubeVideoAddedFeedback: null,
        addMoocSucessInfo: null,
        addMoocError: null,
        addBooksSucessInfo: null,
        addBooksError: null 
    } );
};







const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_USER_ASSET_COUNT_START: return userAssetCountStart( state, action );
        case actionTypes.FETCH_USER_ASSET_COUNT_SUCCESS: return userAssetCountSuccess( state, action );
        case actionTypes.FETCH_USER_ASSET_COUNT_FAIL: return userAssetCountFail( state, action );

        case actionTypes.ADD_RESOURCE_START: return addResourceStart( state, action );
        case actionTypes.ADD_RESOURCE_SUCCESS: return addResourceSuccess( state, action );
        case actionTypes.ADD_RESOURCE_FAIL: return addResourceFail( state, action );

        case actionTypes.FETCH_RESOURCE_BY_ID_START: return fetchResourceByIdStart( state, action );
        case actionTypes.FETCH_RESOURCE_BY_ID_SUCCESS: return fetchResourceByIdSuccess( state, action );
        case actionTypes.FETCH_RESOURCE_BY_ID_FAIL: return fetchResourceByIdFail( state, action );
        case actionTypes.CLEAR_FETCH_RESOURCE_BY_ID_MESSAGES: return clearFetchResouceByIdMessages(state, action);

        case actionTypes.FETCH_USER_ASSET_START: return fetchUserAssetStart( state, action );
        case actionTypes.FETCH_USER_ASSET_SUCCESS: return fetchUserAssetSuccess( state, action );
        case actionTypes.FETCH_USER_ASSET_FAILED: return fetchUserAssetFailed( state, action );
        
        case actionTypes.FETCH_MORE_ASSETS_START: return fetchMoreStart( state, action );
        case actionTypes.FETCH_MORE_ASSETS_SUCCESS: return fetchMoreSuccess( state, action );
        case actionTypes.FETCH_MORE_ASSETS_FAILED: return fetchMoreFail( state, action );

        case actionTypes.SET_CLICKED_PLATFORM: return setClickedPlatform( state, action );

        case actionTypes.SET_USER_RECENTLY_VIEWED: return setUserRecentlyViewed( state, action );
        case actionTypes.UPDATE_USER_RECENTLY_VIEWED: return updateUserRecentlyViewedResources( state, action );

        // case actionTypes.FETCH_RECENTLY_VIEWED_SUCCESS: return fetchRecentlyViewedResources( state, action );

        case actionTypes.FETCH_UNCONFIRMED_RESOURCES_START: return fetchUnconfirmedStart( state, action );
        case actionTypes.FETCH_UNCONFIRMED_RESOURCES_SUCCESS: return fetchUnconfirmedSuccess( state, action );
        case actionTypes.FETCH_UNCONFIRMED_RESOURCES_FAIL: return fetchUnconfirmedFail( state, action );

        case actionTypes.FETCH_MORE_UNCONFIRMED_RESOURCES_START: return fetchMoreUnconfirmedStart( state, action );
        case actionTypes.FETCH_MORE_UNCONFIRMED_RESOURCES_SUCCESS: return fetchMoreUnconfirmedSuccess( state, action );
        case actionTypes.FETCH_MORE_UNCONFIRMED_RESOURCES_FAIL: return fetchMoreUnconfirmedFail( state, action );

        case actionTypes.CONFIRM_RESOURCE_START: return confirmResourceStart( state, action );
        case actionTypes.CONFIRM_RESOURCE_SUCCESS: return confirmResourceSuccess( state, action );
        case actionTypes.CONFIRM_RESOURCE_FAIL: return confirmResourceFail( state, action );

        case actionTypes.DELETE_UNCONFIRMED_START: return deleteUnconfirmedStart( state, action );
        case actionTypes.DELETE_UNCONFIRMED_SUCCESS: return deleteUnconfirmedSuccess( state, action );
        case actionTypes.DELETE_UNCONFIRMED_FAIL: return deleteUnconfirmedFail( state, action );

        case actionTypes.SET_ASSET_TO_UPDATE_FIELDS: return setAssetToupdateFields( state, action );

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
        case actionTypes.ADD_MOOC_START: return addMoocStart( state, action );

        case actionTypes.ADD_BOOKS_SUCCESS: return addBooksSuccess( state, action );
        case actionTypes.ADD_BOOKS_FAILED: return addBooksFailed( state, action );
        case actionTypes.ADD_BOOKS_START: return addBooksStart( state, action );

        case actionTypes.UPDATE_YOUTUBE_ASSET_START: return updateYoutubeAssetStart( state, action );
        case actionTypes.UPDATE_YOUTUBE_ASSET_SUCCESS: return updateYoutubeAssetSuccess( state, action );
        case actionTypes.UPDATE_YOUTUBE_ASSET_FAIL: return updateYoutubeAssetFail( state, action );

        case actionTypes.UPDATE_MOOC_ASSET_START: return updateMoocAssetStart( state, action );
        case actionTypes.UPDATE_MOOC_ASSET_SUCCESS: return updateMoocAssetSuccess( state, action );
        case actionTypes.UPDATE_MOOC_ASSET_FAIL: return updateMoocAssetFail( state, action );

        case actionTypes.UPDATE_BOOK_ASSET_START: return updateBookAssetStart( state, action );
        case actionTypes.UPDATE_BOOK_ASSET_SUCCESS: return updateBookAssetSuccess( state, action );
        case actionTypes.UPDATE_BOOK_ASSET_FAIL: return updateBookAssetFail( state, action );

        case actionTypes.DELETE_ASSET_START: return deleteAssetStart( state, action );
        case actionTypes.DELETE_ASSET_SUCCESS: return deleteAssetSuccess( state, action );
        case actionTypes.DELETE_ASSET_FAIL: return deleteAssetFail( state, action );

        case actionTypes.CLEAR_UPDATE_ASSET_MESSAGE: return clearUpdateAssetMessages( state, action );

        case actionTypes.CLEAR_ADD_RESOURCE_MESSAGES: return clearAddResourceMessages( state, action );

        default: return state;
    }
};

export default reducer;