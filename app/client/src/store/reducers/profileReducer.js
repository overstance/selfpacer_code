import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    profileEditSuccessFeedback: null,
    profileEditError: null,
    profileEditLoading: false,

    changePasswordError: null,
    changePasswordSuccessFeedback: null,
    changePasswordLoading: false,

    becomeFacilitatorError: null,
    becomeFacilitatorSuccessInfo: null,
    becomeFacilitatorLoading: false,

    deleteOwnAccountLoading: false,
    deleteOwnAccountSuccessInfo: null,
    deleteOwnAccountError: null
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

// become a facilitator application

const becomeFacilitatorStart = ( state, action ) => {
    return updateObject( state, {
        becomeFacilitatorError: null,
        becomeFacilitatorLoading: true
    });
}

const becomeFacilitatorSuccess = ( state, action ) => {
    return updateObject( state, {
        becomeFacilitatorSuccessInfo: action.successMessage,
        becomeFacilitatorLoading: false
    });
}

const becomeFacilitatorFailed = ( state, action ) => {
    return updateObject( state, {
        becomeFacilitatorError: action.error,
        becomeFacilitatorLoading: false
    });
}

const resetEditProfileMessages = ( state, action ) => {
    return updateObject( state, {
        changePasswordError: null,
        changePasswordSuccessFeedback: null,
        profileEditSuccessFeedback: null,
        profileEditError: null,
        becomeFacilitatorError: null,
        becomeFacilitatorSuccessInfo: null
    });
}

// delete own account

const deleteOwnAccountStart = ( state, action ) => {
    return updateObject( state, {
        deleteOwnAccountError: null,
        deleteOwnAccountLoading: true
    });
}

const deleteOwnAccountSuccess = ( state, action ) => {
    return updateObject( state, {
        deleteOwnAccountSuccessInfo: action.successInfo,
        deleteOwnAccountLoading: false
    });
}

const deleteOwnAccountFail = ( state, action ) => {
    return updateObject( state, {
        deleteOwnAccountError: action.error,
        deleteOwnAccountLoading: false
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

        case actionTypes.BECOME_FACILITATOR_START: return becomeFacilitatorStart( state, action);
        case actionTypes.BECOME_FACILITATOR_SUCCESS: return becomeFacilitatorSuccess( state, action);
        case actionTypes.BECOME_FACILITATOR_FAILED: return becomeFacilitatorFailed( state, action);

        case actionTypes.DELETE_OWN_ACCOUNT_START: return deleteOwnAccountStart( state, action);
        case actionTypes.DELETE_OWN_ACCOUNT_SUCCESS: return deleteOwnAccountSuccess( state, action);
        case actionTypes.DELETE_OWN_ACCOUNT_FAIL: return deleteOwnAccountFail( state, action);

        case actionTypes.RESET_EDIT_PROFILE_MESSAGES: return resetEditProfileMessages( state, action);

        default: return state;
    }
};

export default reducer;
