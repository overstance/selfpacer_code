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
        allLoading: false
    } );
};

const fetchAllFail = ( state, action ) => {
    return updateObject( state, { allLoading: false, fetchAllResourcesError: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CLICKEDSUBJECT_START: return fetchClickedSubjectStart( state, action );
        case actionTypes.FETCH_CLICKEDSUBJECT_SUCCESS: return fetchClickedSubjectSuccess( state, action );
        case actionTypes.FETCH_CLICKEDSUBJECT_FAIL: return fetchClickedSubjectFail( state, action );

        case actionTypes.FETCH_ALL_START: return fetchAllStart( state, action );
        case actionTypes.FETCH_ALL_SUCCESS: return fetchAllSuccess( state, action );
        case actionTypes.FETCH_ALL_FAILED: return fetchAllFail( state, action );

        default: return state;
    }
}; 


export default reducer;