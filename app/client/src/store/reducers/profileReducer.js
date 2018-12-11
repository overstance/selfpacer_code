import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    profileEditSuccessFeedback: null,
    profileEditError: null,
    profileEditLoading: false,
    changePasswordError: null,
    changePasswordSuccessFeedback: null,
    changePasswordLoading: false
}

const profileEditSuccess = ( state, action ) => {
    return updateObject( state, {
        profileEditSuccessFeedback: action.successInfo,
        profileEditError: null,
        profileEditLoading: false      
    } );
};

const profileEditStart = ( state, action ) => {
    return updateObject( state, {
        profileEditSuccessFeedback: null,
        profileEditError: null,
        profileEditLoading: true
    } );
};

const profileEditFailed = ( state, action ) => {
    return updateObject( state, {
        profileEditError: action.error,
        profileEditLoading: false
    } );
};

const changePasswordStart = ( state, action ) => {
    return updateObject( state, {
        changePasswordError: null,
        changePasswordLoading: true
    });
}

const changePasswordSuccess = ( state, action ) => {
    return updateObject( state, {
        changePasswordSuccessFeedback: action.successMessage,
        changePasswordLoading: false
    });
}

const changePasswordFailed = ( state, action ) => {
    return updateObject( state, {
        changePasswordError: action.error,
        changePasswordLoading: false
    });
}

const resetEditProfileMessages = ( state, action ) => {
    return updateObject( state, {
        changePasswordError: null,
        changePasswordSuccessFeedback: null,
        profileEditSuccessFeedback: null,
        profileEditError: null
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.EDIT_PROFILE_START: return profileEditStart( state, action);
        case actionTypes.EDIT_PROFILE_SUCCESS: return profileEditSuccess( state, action);
        case actionTypes.EDIT_PROFILE_FAILED: return profileEditFailed( state, action);

        case actionTypes.CHANGE_PASSWORD_START: return changePasswordStart( state, action);
        case actionTypes.CHANGE_PASSWORD_SUCCESS: return changePasswordSuccess( state, action);
        case actionTypes.CHANGE_PASSWORD_FAILED: return changePasswordFailed( state, action);

        case actionTypes.RESET_EDIT_PROFILE_MESSAGES: return resetEditProfileMessages( state, action);

        default: return state;
    }
};

export default reducer;
