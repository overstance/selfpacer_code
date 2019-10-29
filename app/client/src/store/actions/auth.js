import axios from 'axios';

import { SET_USER, LOGOUT_USER } from './actionTypes';
import * as actionTypes from './actionTypes';

export const setUserRecentlyViewed = ( userRecentlyViewed ) => {
    return {
        type: actionTypes.SET_USER_RECENTLY_VIEWED,
        userRecentlyViewed: userRecentlyViewed
    };
};

export const setUserLikeCount = ( userLikeCount ) => {
    return {
        type: actionTypes.SET_USER_LIKE_COUNT,
        userLikeCount: userLikeCount
    };
};

export const setUserPinnedCollections = ( collectionIds ) => {
    return {
        type: actionTypes.SET_USER_PINNED_COLLECTION,
        collectionIds: collectionIds
    };
};

export const setUserSavedBlogs = ( userSavedBlogs ) => {
    return {
        type: actionTypes.SET_USER_SAVED_BLOGS,
        userSavedBlogs: userSavedBlogs
    };
};

export const fetchRecentlyViewedSuccess = ( resources ) => {
    return {
        type: actionTypes.FETCH_RECENTLY_VIEWED_SUCCESS,
        resources: resources
    }
}

export const setAuthentication = () => {
    return {
        type: actionTypes.SET_AUTHENTICATION
    }
}

export const clearInit = () => {
    return {
        type: actionTypes.CLEAR_INIT
    }
}

export const clearAuth = () => {
    return {
        type: actionTypes.CLEAR_AUTH
    }
}

export const clearAllAuthMessages = () => {
    return {
        type: actionTypes.CLEAR_ALL_AUTH_MESSAGES
    }
}

export const setIsBlogPage = () => {
    return {
        type: actionTypes.SET_IS_BLOG_PAGE
    }
}

export const unsetIsBlogPage = () => {
    return {
        type: actionTypes.UNSET_IS_BLOG_PAGE
    }
}



// initialize(fetch) user asset count

export const fetchUserAssetCountStart = () => {
    return {
        type: actionTypes.FETCH_USER_ASSET_COUNT_START
    }
}

export const fetchUserAssetCountSuccess = ( assetCount ) => {
    return {
        type: actionTypes.FETCH_USER_ASSET_COUNT_SUCCESS,
        assetCount: assetCount
    }
}

export const fetchUserAssetCountFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_USER_ASSET_COUNT_FAIL,
        error: error
    }
}

// initialize(fetch) user Collections

export const fetchUserCollectionsSuccess = ( collections ) => {
    return {
        type: actionTypes.FETCH_USER_COLLECTIONS_SUCCESS,
        collections: collections
    };
};

export const fetchUserCollectionsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_USER_COLLECTIONS_FAIL,
        error: error
    };
};

export const fetchUserCollectionsStart = () => {
    return {
        type: actionTypes.FETCH_USER_COLLECTIONS_START
    };
};

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    if (res.data._id) {
        let userId = res.data._id
        dispatch({ type: SET_USER, payload: res.data });
        dispatch(setUserRecentlyViewed(res.data.recentlyViewed));
        dispatch(setUserLikeCount(res.data.likeCount));
        dispatch(setUserPinnedCollections(res.data.pinnedCollections));
        dispatch(setUserSavedBlogs(res.data.blogSaves));

        if ( res.data.recentlyViewed.length > 0 ) {
            // let userId = res.data._id;

            // const res2 = await axios.get(`/api/recently_viewed/${userId}`);

            const res2 = await axios.get('/api/recently_viewed', { params: {userId: userId}} );
    
            if ( res2.data.resources) {
                dispatch(fetchRecentlyViewedSuccess(res2.data.resources));
                // console.log(res2.data.resources);
            }
        }

        if ( res.data.accountType === 'Head Administrator' || res.data.accountType === 'Senior Administrator' || res.data.accountType === 'Administrator' || res.data.accountType === 'Facilitator') {
            dispatch(fetchUserAssetCountStart());
            let accountType = res.data.accountType
            // const res3 = await axios.get(`/api/user_asset_count/${userId}/${accountType}`)
            const res3 = await axios.get('/api/user_asset_count', { params: {
             userId: userId,
             accountType: accountType   
            }});
            // console.log(res3.data.assetCount);
            if (res3.data.assetCount >= 0) {
                dispatch(fetchUserAssetCountSuccess(res3.data.assetCount));
            } else if (res3.data.error)  {
                // console.log(res.data)
                dispatch(fetchUserAssetCountFailed( res3.data.error ));
            } 
        }

        dispatch(fetchUserCollectionsStart());
        const res4 = await axios.get('/api/user_collections', { params: {userId: userId}});

        if (res4.data.collections) {
            dispatch(fetchUserCollectionsSuccess(res4.data.collections));
        } else {
            dispatch(fetchUserCollectionsFail(res4.data));
        }
        
    } else {
        localStorage.removeItem('token');
        dispatch(clearAuth());
    }

};

export const logout = () => async (dispatch) => {
    const res = await axios.get('/api/logout');
    
    localStorage.removeItem('token');
    localStorage.removeItem('spec');
    localStorage.removeItem('useContext');
    localStorage.removeItem('viewed');

    dispatch({ type: LOGOUT_USER, payload: res.data });
    dispatch(clearInit());
};

export const googleAuth = () => async (dispatch) => {
    await axios.get('/auth/google');
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const authSuccess = (user, useContext) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user,
        useContext: useContext
    };
};

export const registerSuccess = (info) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        info: info
    };
};

export const emailVerifySuccess = (info) => {
    return {
        type: actionTypes.EMAIL_VERIFY_SUCCESS,
        info: info
    };
};

export const verificationRequired = (email) => {
    return {
        type: actionTypes.VERIFIFICATION_REQUIRED,
        email: email
    };
};


export const ValidationErrors = (errors) => {
    return {
        type: actionTypes.VALIDATION_ERRORS,
        errors: errors
    };
};


export const clearErrors = () => {
    return {
        type: actionTypes.CLEAR_ERRORS
    };
}

export const emailVerified = ( token ) => async dispatch => {
    dispatch( authStart() );

    console.log(token);

    const res = await axios.get('/api/email_verified', { params: {token: token}});

    if (res.data._id) {
        console.log(res.data);
        dispatch( emailVerifySuccess( 'E-mail succesfully verified.' ));
    } else {
        dispatch( authFail(res.data));
    }
}


export const registerUser = (spec, name, email, password, password2, history) => {
    return dispatch => {
        dispatch(authStart());
        const newUser = {
            spec: spec,
            name: name,
            username: email,
            email: email,
            password: password,
            password2: password2
        };

        axios.post('/api/register', newUser)
            .then(res => {

                if (res.data === 'An e-mail has been sent to ' +
                email +
                '. Please check your inbox and verify to complete your sign up.') {
                    dispatch(registerSuccess(res.data));
                    // history.push('/');
                    return;
                }

                if (res.data.name === 'UserExistsError') {
                    // let error = res.data
                    dispatch(authFail(res.data.message))
                    return
                }
                dispatch(ValidationErrors(res.data));
                return;
            })
            .catch(error => dispatch(authFail(error.message))
            );

    }
};

export const loginUser = (email, password, history) => {
   
    return dispatch => {
        dispatch(authStart());
        const user = {
            username: email,
            password: password,
        };

        axios.post('/api/login', user)
        .then( res => {
            if (res.data.info === 'Please verify your email') {
                dispatch(verificationRequired(res.data.emailToVerify));
                history.push('/reverify_email');
                return;   
            }
    
            if (res.data._id) {
                let useContext ='0';
                // console.log(res.data.accountType);
                if (res.data.accountType === 'Facilitator') {
                    useContext = '1'
                } else if (res.data.accountType === 'Editor') {
                    useContext = '2'
                } else if (res.data.accountType === 'Administrator' && res.data.isUserManager) {
                    useContext = '3.1'
                } else if (res.data.accountType === 'Administrator' && res.data.isAssetManager) {
                    useContext = '3.2'
                } else if (res.data.accountType === 'Administrator' && res.data.isEditor) {
                    useContext = '3.3'
                } else if (res.data.accountType === 'Senior Administrator') {
                    useContext = '4'
                } else if (res.data.accountType === 'Head Administrator') {
                    useContext = '5'
                };

                localStorage.setItem("token", res.data._id);
                localStorage.setItem("spec", res.data.specialization);
                localStorage.setItem("useContext", useContext);

                dispatch(authSuccess(res.data, useContext));
                dispatch(setUserRecentlyViewed(res.data.recentlyViewed));
                dispatch(setUserLikeCount(res.data.likeCount));
                dispatch(setUserPinnedCollections(res.data.pinnedCollections));
                history.push('/');
                return;
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('spec');
                localStorage.removeItem('useContext');
            };
    
            if (res.data.username || res.data.password) {
                dispatch(ValidationErrors(res.data));
                return;
            };
        })
        .catch(error => dispatch(authFail(error.message)));   
    }
};

// Forgot Password
export const clearForgetPasswordError = () => {
    return {
        type: actionTypes.CLEAR_FORGOT_PASSWORD_ERROR
    }
}

export const forgotPasswordStart = () => {
    return {
        type: actionTypes.FORGOT_PASSWORD_START
    }
}

export const resetEmailSent = ( emailSentInfo ) => {
    return {
        type: actionTypes.RESET_EMAIL_SENT,
        emailSentInfo: emailSentInfo
    }
}

export const resetEmailFailed = ( sendFailedInfo ) => {
    return {
        type: actionTypes.RESET_EMAIL_FAILED,
        sendFailedInfo: sendFailedInfo
    }
}

export const forgotPassword = ( email ) => async dispatch => {
    dispatch(forgotPasswordStart());

    const userEmail = {
        email: email
    }

    const res = await axios.post('/api/forgot_password', userEmail);

    if (res.data === 'An e-mail has been sent to ' + email + ' with further instructions.') {
        dispatch(resetEmailSent( res.data ));
    } else {
        dispatch(resetEmailFailed(res.data));
    }
}

// Confirm reset password token

export const confirmResetTokenStart = () => {
    return {
        type: actionTypes.CONFIRM_RESET_TOKEN_START
    }
}

export const confirmResetTokenSuccess = ( user ) => {
    return {
        type: actionTypes.CONFIRM_RESET_TOKEN_SUCCESS,
        user: user
    }
}

export const confirmResetTokenFailed = ( error ) => {
    return {
        type: actionTypes.CONFIRM_RESET_TOKEN_FAILED,
        error: error
    }
}

export const confirmResetToken = (token) => async dispatch => {
    dispatch(confirmResetTokenStart());

    const res = await axios.get('/api/reset_password', { params: { token: token}});
    // const res = await axios.get(`/api/user_assets/${userId}`);

    // console.log(res.data);

    if(res.data.user) {
        dispatch(confirmResetTokenSuccess(res.data));
    } else {
        dispatch(confirmResetTokenFailed(res.data)); 
    }
}

// RESET PASSWORD

export const resetPasswordStart = () => {
    return {
        type: actionTypes.RESET_PASSWORD_START
    }
}

export const resetPasswordSuccess = ( info ) => {
    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS,
        info: info
    }
}

export const resetPasswordFailed = ( error ) => {
    return {
        type: actionTypes.RESET_PASSWORD_FAILED,
        error: error
    }
}

export const resetPassword = ( newPassword, token ) => async dispatch => {
    dispatch( resetPasswordStart());

    const userInfo = {
        newPassword: newPassword,
        token: token
    }

    const res = await axios.post('/api/reset_password', userInfo);

    if ( res.data.user ) {
        dispatch( resetPasswordSuccess('Password reset successful.'));
    } else {
        dispatch( resetPasswordFailed(res.data));
    }
}

// REVERIFY EMAIL

export const clearReverifyEmailError = () => {
    return {
        type: actionTypes.CLEAR_REVERIFY_EMAIL_ERROR
    }
}

export const reverifyEmailStart = () => {
    return {
        type: actionTypes.REVERIFY_EMAIL_START
    }
}

export const reverifyEmailSent = ( emailSentInfo ) => {
    return {
        type: actionTypes.REVERIFY_EMAIL_SENT,
        emailSentInfo: emailSentInfo
    }
}

export const reverifyEmailFailed = ( sendFailedInfo ) => {
    return {
        type: actionTypes.REVERIFY_EMAIL_FAILED,
        sendFailedInfo: sendFailedInfo
    }
}


export const reverifyEmail = ( email ) => async dispatch => {
    dispatch(reverifyEmailStart());

    const userInfo = {
        email: email
    };

    const res = await axios.post('/api/reverify_email', userInfo);

    if (res.data === 'An e-mail has been sent to ' +
    email +
    '. Please check your inbox and verify to complete your sign up.') {
        dispatch(reverifyEmailSent( res.data ));
    } else {
        dispatch(reverifyEmailFailed(res.data));
    }
}

export const setIsSiteHome = () => ({
    type: actionTypes.SET_IS_SITE_HOME
});

export const unsetIsSiteHome = () => ({
    type: actionTypes.UNSET_IS_SITE_HOME
});

// set visitor skill spec

export const dispatchVisitorSpecialization = (skill) => ({
    type: actionTypes.SET_VISITOR_SPECIALIZATION,
    skill: skill
});

export const setVisitorSpecialization = (skill) => dispatch => {
    localStorage.setItem("spec", skill);

    dispatch(dispatchVisitorSpecialization(skill));
}



