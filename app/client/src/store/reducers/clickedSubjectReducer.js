import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    subject: [],
    loading: false,

    clickedSubjectTitle: '',
    error: null,

    allLoading: false,
    fetchAllResourcesError: null,

    allResources: [],

    fetchMoreLoading: false,
    fetchMoreError: null,

    latestFetchLength: 0  
};

const fetchClickedSubjectStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchClickedSubjectSuccess = ( state, action ) => {
    return updateObject( state, {
        subject: action.clickedSubject,
        clickedSubjectTitle: action.clickedSubject[0].title,
        loading: false
    } );
};

const fetchClickedSubjectFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

// fetch all

const fetchAllStart = ( state, action ) => {
    return updateObject( state, { allLoading: true, allResources: [] } );
};

const fetchAllSuccess = ( state, action ) => {
    return updateObject( state, {
        allResources: action.resources,
        allLoading: false,
        latestFetchLength: action.resourceLength
    } );
};

const fetchAllFail = ( state, action ) => {
    return updateObject( state, { allLoading: false, fetchAllResourcesError: action.error } );
};

// fetch all

const fetchMoreStart = ( state, action ) => {
    return updateObject( state, { fetchMoreLoading: true } );
};

const fetchMoreSuccess = ( state, action ) => {
    return updateObject( state, {
        allResources: action.resources,
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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CLICKEDSUBJECT_START: return fetchClickedSubjectStart( state, action );
        case actionTypes.FETCH_CLICKEDSUBJECT_SUCCESS: return fetchClickedSubjectSuccess( state, action );
        case actionTypes.FETCH_CLICKEDSUBJECT_FAIL: return fetchClickedSubjectFail( state, action );

        case actionTypes.FETCH_ALL_START: return fetchAllStart( state, action );
        case actionTypes.FETCH_ALL_SUCCESS: return fetchAllSuccess( state, action );
        case actionTypes.FETCH_ALL_FAILED: return fetchAllFail( state, action );

        case actionTypes.FETCH_MORE_START: return fetchMoreStart( state, action );
        case actionTypes.FETCH_MORE_SUCCESS: return fetchMoreSuccess( state, action );
        case actionTypes.FETCH_MORE_FAILED: return fetchMoreFail( state, action );

        default: return state;
    }
}; 


export default reducer;