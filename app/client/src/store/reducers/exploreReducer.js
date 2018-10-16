import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    subjects: [],
    loading: false,
    error: null
};

const fetchSubjectsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchSubjectsSuccess = ( state, action ) => {
    return updateObject( state, {
        subjects: action.subjects,
        loading: false
    } );
};

const fetchSubjectsFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SUBJECTS_START: return fetchSubjectsStart( state, action );
        case actionTypes.FETCH_SUBJECTS_SUCCESS: return fetchSubjectsSuccess( state, action );
        case actionTypes.FETCH_SUBJECTS_FAIL: return fetchSubjectsFail( state, action );
        default: return state;
    }
};

export default reducer;

