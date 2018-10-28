import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    subject: [],
    loading: false,
    error: null
};

const fetchClickedSubjectStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchClickedSubjectSuccess = ( state, action ) => {
    return updateObject( state, {
        subject: action.clickedSubject,
        loading: false
    } );
};

const fetchClickedSubjectFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CLICKEDSUBJECT_START: return fetchClickedSubjectStart( state, action );
        case actionTypes.FETCH_CLICKEDSUBJECT_SUCCESS: return fetchClickedSubjectSuccess( state, action );
        case actionTypes.FETCH_CLICKEDSUBJECT_FAIL: return fetchClickedSubjectFail( state, action );
        default: return state;
    }
};

export default reducer;