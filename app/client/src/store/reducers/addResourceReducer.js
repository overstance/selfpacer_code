import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: null,
    successMessage: null
};

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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_RESOURCE_START: return addResourceStart( state, action );
        case actionTypes.ADD_RESOURCE_SUCCESS: return addResourceSuccess( state, action );
        case actionTypes.ADD_RESOURCE_FAIL: return addResourceFail( state, action );
        default: return state;
    }
};

export default reducer;