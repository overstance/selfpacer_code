import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    youtubeResources: [],
    moocResources: [],
    webResources: [],
    bookResources: [],
    loading: false,
    error: null,
    clickedResource: {},
    clickedResourcePlatform: null
};

const fetchYoutubeAccountingStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchYoutubeAccountingSuccess = ( state, action ) => {
    return updateObject( state, {
        youtubeResources: action.resources,
        loading: false
    } );
};

const fetchYoutubeAccountingFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

//Set Clicked Platform

const setClickedPlatform = ( state, action ) => {
    return updateObject( state, { clickedResourcePlatform: action.platform } );
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

//Reducer

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_YOUTUBE_ACCOUNTING_START: return fetchYoutubeAccountingStart( state, action );
        case actionTypes.FETCH_YOUTUBE_ACCOUNTING_SUCCESS: return fetchYoutubeAccountingSuccess( state, action );
        case actionTypes.FETCH_YOUTUBE_ACCOUNTING_FAIL: return fetchYoutubeAccountingFail( state, action );

        case actionTypes.SET_CLICKED_PLATFORM: return setClickedPlatform( state, action );

        case actionTypes.FETCH_RESOURCE_BY_ID_START: return fetchResourceByIdStart( state, action );
        case actionTypes.FETCH_RESOURCE_BY_ID_SUCCESS: return fetchResourceByIdSuccess( state, action );
        case actionTypes.FETCH_RESOURCE_BY_ID_FAIL: return fetchResourceByIdFail( state, action );

        default: return state;
    }
};

export default reducer;