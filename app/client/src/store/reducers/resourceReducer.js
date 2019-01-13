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
    fetchAssetError: null
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

        default: return state;
    }
};

export default reducer;