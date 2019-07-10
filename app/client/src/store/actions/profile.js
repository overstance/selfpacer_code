import axios from 'axios';
import * as actionTypes from './actionTypes';

// Add Youtube Videos

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


// Edit Profile

export const editProfile = (name, specialization1, user) => {
    return dispatch => {
        dispatch (profileEditStart());

        const editInfo = {
            user: user,
            name: name,
            specialization1: specialization1
        };

        // console.log(editInfo);

        axios.post('/api/edit_profile', editInfo)
        .then( res => {
            // console.log(res.data);
            if (res.data.user._id === user._id) {
                dispatch(profileEditSuccess('Profile Edited'));
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
        user: user
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
    console.log(res.data);

    if (res.data.user._id === userId) {
        dispatch(becomeFacilitatorSuccess('Application successful!'));
    } else if (res.data.error) {
        dispatch(becomeFacilitatorFailed(res.data.error));
    }
};


