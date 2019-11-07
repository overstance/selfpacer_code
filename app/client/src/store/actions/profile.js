import axios from 'axios';
import * as actionTypes from './actionTypes';


// Edit Profile

export const profileEditStart = () => {
    return {
        type: actionTypes.EDIT_PROFILE_START
    };
};

export const profileEditSuccess = ( successInfo ) => {
    return {
        type: actionTypes.EDIT_PROFILE_SUCCESS,
        successInfo: successInfo
    };
};

export const updateAuthOnProfileUpdate = ( user ) => ({
    type: actionTypes.UPDATE_AUTH_ON_PROFILE_UPDATE,
    user: user
})

export const profileEditFailed = ( error ) => {
    return {
        type: actionTypes.EDIT_PROFILE_FAILED,
        error: error
    };
};
   
export const resetEditProfileMessages = () => {
    return {
        type: actionTypes.RESET_EDIT_PROFILE_MESSAGES
    }
}


export const editProfile = (name, specialization1, user, userSpecLocalStorage) => {
    return dispatch => {
        dispatch (profileEditStart());

        const editInfo = {
            userId: user._id,
            name: name,
            specialization1: specialization1
        };

        // console.log(editInfo);

        axios.post('/api/edit_profile', editInfo)
        .then( res => {
            // console.log(res.data);
            if (res.data.user._id === user._id) {
                // console.log(res.data.user.specialization, userSpecLocalStorage)
                dispatch(profileEditSuccess('Profile Edited'));
                dispatch(updateAuthOnProfileUpdate(res.data.user))
                if(res.data.user.specialization !== userSpecLocalStorage) {
                    // console.log(res.data.user.specialization, user.specialization)
                    localStorage.setItem("spec", res.data.user.specialization);
                }
            } else {
                dispatch(profileEditFailed( 'error!'))
            }
        }).catch(err => 
            dispatch(profileEditFailed(err.name))               
        );  
    }
};

// Change Password

export const changePasswordStart = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD_START
    }
}

export const changePasswordSuccess = ( successMessage ) => {
    return {
        type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        successMessage: successMessage
    }
}

export const changePasswordFailed = ( error ) => {
    return {
        type: actionTypes.CHANGE_PASSWORD_FAILED,
        error: error
    }
}

export const changePassword = (oldPassword, newPassword, user) => async (dispatch) => {
    dispatch(changePasswordStart());

    const info = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        userId: user._id
    };

    const res = await axios.post('/api/change_password', info);
    
    if (res.data === 'password changed') {
        dispatch(changePasswordSuccess(res.data));
    } else {
        dispatch(changePasswordFailed(res.data));
    }
};

// become a facilitator application

export const becomeFacilitatorStart = () => {
    return {
        type: actionTypes.BECOME_FACILITATOR_START
    }
}

export const becomeFacilitatorSuccess = ( successMessage ) => {
    return {
        type: actionTypes.BECOME_FACILITATOR_SUCCESS,
        successMessage: successMessage
    }
}

export const becomeFacilitatorFailed = ( error ) => {
    return {
        type: actionTypes.BECOME_FACILITATOR_FAILED,
        error: error
    }
}

export const becomeFacilitator = (workUrl1, workUrl2, userId) => async dispatch => {
    dispatch(becomeFacilitatorStart());

    let secondUrl = workUrl2;

    if ( workUrl2 === '' ) {
        secondUrl = undefined;
    }


 
    let info = {
        workUrl1: workUrl1,
        secondUrl: secondUrl,
        userId: userId
    };

    const res = await axios.put('/api/become_facilitator', info);
    // console.log(res.data);

    if (res.data.user._id === userId) {
        dispatch(becomeFacilitatorSuccess('Application successful!'));
    } else if (res.data.error) {
        dispatch(becomeFacilitatorFailed(res.data.error));
    }
};

// delete own account

export const deleteOwnAccountStart = () => {
    return {
        type: actionTypes.DELETE_OWN_ACCOUNT_START
    }
}

export const deleteOwnAccountSuccess = ( successInfo ) => {
    return {
        type: actionTypes.DELETE_OWN_ACCOUNT_SUCCESS,
        successInfo: successInfo
    }
}

export const deleteOwnAccountFail = ( error ) => {
    return {
        type: actionTypes.DELETE_OWN_ACCOUNT_FAIL,
        error: error
    }
}

export const deleteOwnAccount = (userId) => async (dispatch) => {
    dispatch(deleteOwnAccountStart());

    const res = await axios.delete('/api/delete_own_account', {params: {userId: userId}});
    
    if (res.data.successInfo === 'user own account successfully deleted') {
        dispatch(deleteOwnAccountSuccess(res.data.successInfo));
    } else if (res.data.error) {
        dispatch(deleteOwnAccountFail(res.data.error));
    }
};


