import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
// import isEmpty from './validation/isEmpty';


const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    registerSuccessInfo: null,
    verifyEmailSuccessinfo: null,
    emailToVerify: null,

    user: {},
    userSpecialization: '',
    useTypeContext: '0',
    error: null,
    loading: false,
    errors: {},

    emailSentInfo: null,
    emailSendFailedError: null,
    forgotPasswordLoading: false,

    reverifyEmailSentInfo: null,
    reverifyEmailFailedError: null,
    reverifyEmailLoading: false,

    confirmTokenSuccess: null,
    confirmTokenError: null,
    confirmTokenLoading: false,


    resetPasswordError: null,
    resetPasswordSuccessFeedback: null,
    resetPasswordLoading: false,

    userLikeCount: null,

    isBlogPage: false,

    isSiteHome: false
};

// initialization actions
const setAuthentication = (state, action) => {
    return updateObject(state, { isAuthenticated: true, user: { _id: action.userId } });
};

const setUserSpecialization = (state, action) => {
    return updateObject(state, {userSpecialization: action.specialization});
}

const setUseContext = (state, action) => {
    return updateObject(state, {useTypeContext: action.useTypeContext});
}

const clearInit = (state, action) => {
    return updateObject(state, {
        useTypeContext: '0',
        userSpecialization: '',
        user: {}
    });
}

const setIsBlogPage = (state, action) => {
    return updateObject(state, {
        isBlogPage: true
    });
}

const unsetIsBlogPage = (state, action) => {
    return updateObject(state, {
        isBlogPage: false
    });
}

const setIsSiteHome = (state, action) => {
    return updateObject(state, {
        isSiteHome: true
    });
}

const unsetIsSiteHome = (state, action) => {
    return updateObject(state, {
        isSiteHome: false
    });
}

// end of initialization actions

const clearAuth = ( state, action) => {
    return updateObject(state, { isAuthenticated: false, user: {} });
}

const setUser = (state, action) => {
    return updateObject(state, { user: action.payload,/*  isAuthenticated: !isEmpty(action.payload), */ isAdmin: action.payload.isAdmin });
};

const authLogout = (state, action) => {
    return updateObject(state, { user: action.payload, userId: null, isAuthenticated: false, isAdmin: false });
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

const clearAllAuthMessages = (state, action) => {
    return updateObject(state, { 
        registerSuccessInfo: null,
        verifyEmailSuccessinfo: null,
        emailToVerify: null,
        error: null,
        errors: {},
        emailSentInfo: null,
        emailSendFailedError: null,
        reverifyEmailSentInfo: null,
        reverifyEmailFailedError: null,
        confirmTokenSuccess: null,
        confirmTokenError: null,
        resetPasswordError: null,
        resetPasswordSuccessFeedback: null, 
    });
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
        isAuthenticated: true,
        useTypeContext: action.useContext
    });
};

const registerSuccess = (state, action) => {
    return updateObject(state, {
        registerSuccessInfo: action.info,
        loading: false
    });
};

const emailVerifySuccess = (state, action) => {
    return updateObject(state, {
        verifyEmailSuccessinfo: action.info,
        loading: false
    });
};

const verificationRequired = (state, action) => {
    return updateObject(state, {
        emailToVerify: action.email,
        loading: false
    });
};

// FORGOT PASSWORD

const forgotPasswordStart = (state, action) => {
    return updateObject(state, {
        forgotPasswordLoading: true
    });
}

const resetEmailSent  = (state, action) => {
    return updateObject(state, {
        forgotPasswordLoading: false,
        emailSentInfo: action.emailSentInfo
    });
}

const resetEmailFailed  = (state, action) => {
    return updateObject(state, {
        forgotPasswordLoading: false,
        emailSendFailedError: action.sendFailedInfo
    });
}

const clearForgetPasswordError = (state, action) => {
    return updateObject(state, {
        emailSentInfo: null,
        emailSendFailedError: null
    });
}

// COMFIRM TOKEN

const confirmResetTokenStart = (state, action) => {
    return updateObject(state, {
        confirmTokenSuccess: null,
        confirmTokenError: null,
        confirmTokenLoading: true
    });
}


const confirmResetTokenSuccess = (state, action) => {
    return updateObject(state, {
        confirmTokenLoading: false,
        confirmTokenSuccess: action.user
    });
}

const confirmResetTokenFailed = (state, action) => {
    return updateObject(state, {
        confirmTokenLoading: false,
        confirmTokenError: action.error
    });
}

// RESET PASSWORD

const resetPasswordStart = (state, action) => {
    return updateObject(state, {
        resetPasswordError: null,
        resetPasswordSuccessFeedback: null,
        resetPasswordLoading: true
    });
}


const resetPasswordSuccess = (state, action) => {
    return updateObject(state, {
        resetPasswordSuccessFeedback: action.info,
        resetPasswordLoading: false
    });
}

const resetPasswordFailed = (state, action) => {
    return updateObject(state, {
        resetPasswordError: action.error,
        resetPasswordLoading: false
    });
}

// REVERIFY EMAIL

const reverifyEmailStart = (state, action) => {
    return updateObject(state, {
        reverifyEmailLoading: true
    });
}

const reverifyEmailSent  = (state, action) => {
    return updateObject(state, {
        reverifyEmailLoading: false,
        reverifyEmailSentInfo: action.emailSentInfo
    });
}

const reverifyEmailFailed  = (state, action) => {
    return updateObject(state, {
        reverifyEmailLoading: false,
        reverifyEmailFailedError: action.sendFailedInfo
    });
}

const clearReverifyEmailError = (state, action) => {
    return updateObject(state, {
        reverifyEmailSentInfo: null,
        reverifyEmailFailedError: null
    });
}

// Set user like count

const setUserLikeCount = ( state, action ) => {
    return updateObject( state, { userLikeCount: action.userLikeCount } );
};

// update user liked resources

const updateUserLikedCount = ( state, action ) => {
    return updateObject( state, { userLikeCount: action.newLikeCount } );
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //initializations from local storage
        case actionTypes.SET_AUTHENTICATION: return setAuthentication(state, action);
        case actionTypes.SET_USER_SPECIALIZATION: return setUserSpecialization(state, action);
        case actionTypes.SET_USE_CONTEXT: return setUseContext(state, action);
        case actionTypes.CLEAR_INIT: return clearInit(state, action);
        // end of initializations

        case actionTypes.SET_USER: return setUser(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.VALIDATION_ERRORS: return validationErrors(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.CLEAR_ERRORS: return clearErrors(state, action);
        case actionTypes.LOGOUT_USER: return authLogout(state, action);
        case actionTypes.CLEAR_AUTH: return clearAuth(state, action);

        case actionTypes.FORGOT_PASSWORD_START: return forgotPasswordStart(state, action);
        case actionTypes.RESET_EMAIL_SENT: return resetEmailSent(state, action);
        case actionTypes.RESET_EMAIL_FAILED: return resetEmailFailed(state, action);
        case actionTypes.CLEAR_FORGOT_PASSWORD_ERROR: return clearForgetPasswordError(state, action);

        case actionTypes.CONFIRM_RESET_TOKEN_START: return confirmResetTokenStart(state, action);
        case actionTypes.CONFIRM_RESET_TOKEN_SUCCESS: return confirmResetTokenSuccess(state, action);
        case actionTypes.CONFIRM_RESET_TOKEN_FAILED: return confirmResetTokenFailed(state, action);

        case actionTypes.RESET_PASSWORD_START: return resetPasswordStart(state, action);
        case actionTypes.RESET_PASSWORD_SUCCESS: return resetPasswordSuccess(state, action);
        case actionTypes.RESET_PASSWORD_FAILED: return resetPasswordFailed(state, action);

        case actionTypes.EMAIL_VERIFY_SUCCESS: return emailVerifySuccess(state, action);
        case actionTypes.VERIFIFICATION_REQUIRED: return verificationRequired(state, action);

        case actionTypes.REVERIFY_EMAIL_START: return reverifyEmailStart(state, action);
        case actionTypes.REVERIFY_EMAIL_SENT: return reverifyEmailSent(state, action);
        case actionTypes.REVERIFY_EMAIL_FAILED: return reverifyEmailFailed(state, action);
        case actionTypes.CLEAR_REVERIFY_EMAIL_ERROR: return clearReverifyEmailError(state, action);

        case actionTypes.SET_USER_LIKE_COUNT: return setUserLikeCount( state, action );
        case actionTypes.UPDATE_USER_LIKE_COUNT: return updateUserLikedCount( state, action );

        case actionTypes.CLEAR_ALL_AUTH_MESSAGES: return clearAllAuthMessages( state, action);

        case actionTypes.SET_IS_BLOG_PAGE: return setIsBlogPage( state, action);
        case actionTypes.UNSET_IS_BLOG_PAGE: return unsetIsBlogPage( state, action);

        case actionTypes.SET_IS_SITE_HOME: return setIsSiteHome( state, action);
        case actionTypes.UNSET_IS_SITE_HOME: return unsetIsSiteHome( state, action);

        default:
            return state;
    }
};

export default reducer;