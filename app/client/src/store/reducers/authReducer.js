import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import isEmpty from './validation/isEmpty';


const initialState = {
    isAuthenticated: false,
    user: {},
    error: null,
    loading: false,
    errors: {},
};

const fetchUser = (state, action) => {
    return updateObject(state, { user: action.payload, isAuthenticated: !isEmpty(action.payload) });
};

const authLogout = (state, action) => {
    return updateObject(state, { user: action.payload, userId: null, isAuthenticated: false });
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const validationErrors = (state, action) => {
    return updateObject(state, { errors: action.errors, loading: false });
}

const clearErrors = (state, action) => {
    return updateObject(state, { errors: null, error: null });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        error: null,
        loading: false,
        isAuthenticated: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER: return fetchUser(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.VALIDATION_ERRORS: return validationErrors(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.CLEAR_ERRORS: return clearErrors(state, action);
        case actionTypes.LOGOUT_USER: return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;