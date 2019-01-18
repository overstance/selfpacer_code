import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: null,
    successMessage: null,
    loading: false,
    clickedResource: {},
    clickedResourcePlatform: null,
    userRecentlyViewed: null,

    unconfirmedResources: [], 

    recentlyViewedResources: [],
    
    userAssets: [],
    fetchAssetError: null,

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

    deleteAssetLoading: false,
    deleteAssetSuccessInfo: null,
    deleteAssetError: null
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
    return updateObject( state, { loading: true } );
};

const fetchResourceByIdSuccess = ( state, action ) => {
    return updateObject( state, {
        clickedResource: action.resource,
        loading: false
    } );
};

const fetchResourceByIdFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
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
        loading: false
    } );
};

const fetchUserAssetFailed = ( state, action ) => {
    return updateObject( state, { loading: false, fetchAssetError: action.error } );
};

// fetch user recently viewed resources

const fetchRecentlyViewedResources = ( state, action ) => {
    return updateObject( state, { recentlyViewedResources: action.resources } );
};

// fetch unconfirmed resources

const fetchUnconfirmedStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchUnconfirmedSuccess = ( state, action ) => {
    return updateObject( state, {
        unconfirmedResources: action.resources,
        loading: false
    } );
};

const fetchUnconfirmedFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

// set asset to update fields

const setAssetToupdateFields = ( state, action ) => {
    return updateObject( state, { assetToUpdateFields: action.assetToUpdateFields } );
};

// update mooc asset

const updateMoocAssetStart = ( state, action ) => {
    return updateObject( state, { updateAssetLoading: true } );
};

const updateMoocAssetSuccess = ( state, action ) => {
    return updateObject( state, {
        updateAssetSuccessInfo: action.info,
        userAssets: action.resources,
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
        userAssets: action.resources,
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






const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_RESOURCE_START: return addResourceStart( state, action );
        case actionTypes.ADD_RESOURCE_SUCCESS: return addResourceSuccess( state, action );
        case actionTypes.ADD_RESOURCE_FAIL: return addResourceFail( state, action );

        case actionTypes.FETCH_RESOURCE_BY_ID_START: return fetchResourceByIdStart( state, action );
        case actionTypes.FETCH_RESOURCE_BY_ID_SUCCESS: return fetchResourceByIdSuccess( state, action );
        case actionTypes.FETCH_RESOURCE_BY_ID_FAIL: return fetchResourceByIdFail( state, action );

        case actionTypes.FETCH_USER_ASSET_START: return fetchUserAssetStart( state, action );
        case actionTypes.FETCH_USER_ASSET_SUCCESS: return fetchUserAssetSuccess( state, action );
        case actionTypes.FETCH_USER_ASSET_FAILED: return fetchUserAssetFailed( state, action );

        case actionTypes.SET_CLICKED_PLATFORM: return setClickedPlatform( state, action );

        case actionTypes.SET_USER_RECENTLY_VIEWED: return setUserRecentlyViewed( state, action );
        case actionTypes.UPDATE_USER_RECENTLY_VIEWED: return updateUserRecentlyViewedResources( state, action );

        case actionTypes.FETCH_RECENTLY_VIEWED_SUCCESS: return fetchRecentlyViewedResources( state, action );

        case actionTypes.FETCH_UNCONFIRMED_RESOURCES_START: return fetchUnconfirmedStart( state, action );
        case actionTypes.FETCH_UNCONFIRMED_RESOURCES_SUCCESS: return fetchUnconfirmedSuccess( state, action );
        case actionTypes.FETCH_UNCONFIRMED_RESOURCES_FAIL: return fetchUnconfirmedFail( state, action );

        case actionTypes.SET_ASSET_TO_UPDATE_FIELDS: return setAssetToupdateFields( state, action );

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

        default: return state;
    }
};

export default reducer;