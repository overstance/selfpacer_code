import axios from 'axios';
import * as actionTypes from './actionTypes';

//Add AdminUser

export const addAdminUser = (user_id, newAccountType) => {
    return dispatch => {
        dispatch (AdminAddStart());
        const newAdminUser = {
            userId: user_id,
            newAccountType: newAccountType
        };

        axios.post('/api/add_admin_user', newAdminUser)
            .then(res => {

                if (res.data.updatedUser) {
                    dispatch(adminUserAdded(res.data.updatedUser));
                    // history.push('/profile');
                    // return;
                } else {
                    dispatch(adminAddFailed(res.data));
                }
            })
            .catch(err => 
                dispatch(adminAddFailed(err))               
            );        
    }
};

export const AdminAddStart = () => {
    return {
        type: actionTypes.ADMIN_ADD_START
    };
};

export const adminUserAdded = ( updatedUser ) => {
    return {
        type: actionTypes.ADMIN_USER_ADDED,
        updatedUser: updatedUser
    };
};

export const adminAddFailed = ( error ) => {
    return {
        type: actionTypes.ADMIN_ADD_FAILED,
        error: error
    };
};

// Remove Admin user

export const removeAdminUser = (user_id) => {
    return dispatch => {
        dispatch (adminUserRemoveStart());
        const adminUser = {
            userId: user_id
        };

        axios.post('/api/remove_admin_user', adminUser)
            .then(res => {

                if (res.data.updatedUser) {
                    dispatch(adminUserRemoved(res.data.updatedUser));
                    // history.push('/profile');
                    // return;
                } else {
                    console.log(res.data);
                    dispatch(adminUserRemoveFailed(res.data));
                }
            })
            .catch(err => 
                dispatch(adminUserRemoveFailed(err))               
            );        
    }
};

export const adminUserRemoveStart = () => {
    return {
        type: actionTypes.ADMIN_USER_REMOVE_START
    };
};

export const adminUserRemoved = ( updatedUser ) => {
    return {
        type: actionTypes.ADMIN_USER_REMOVED,
        updatedUser: updatedUser
    };
};

export const adminUserRemoveFailed = ( error ) => {
    return {
        type: actionTypes.ADMIN_USER_REMOVED_FAILED,
        error: error
    };
};

// Add subject Icon

export const onAddSubjectIcon = ( file ) => async dispatch => {  

    let data = new FormData();
    
    data.append('file', file);
  
    const res = await axios.post('/api/upload_subjectIcon', data);

    console.log(res.data);
       
  }

//   fetch subject path and curricula info

export const fetchSubjectToEditSuccess = ( path, curriculum ) => {
    return {
        type: actionTypes.FETCH_SUBJECT_TO_EDIT_SUCCESS,
        path: path,
        curriculum: curriculum
    }
}

export const fetchSelectSubjectInfo = ( subject ) => async dispatch => {
     const res = await axios.get(`/api/fetch_subject_info/${subject}`)

     if(res.data.title === subject) {
         const path = res.data.paths.join();
         const curriculum = res.data.curriculum.join();
         const title = res.data.title

         dispatch( fetchSubjectToEditSuccess( path, curriculum, title));
     }
}

// Post Edited subject path, curriculum

export const editSubjectStart = () => {
    return {
        type: actionTypes.EDIT_SUBJECT_START,
    }
}

export const editSubjectSuccess = ( successInfo ) => {
    return {
        type: actionTypes.EDIT_SUBJECT_SUCCESS,
        successInfo: successInfo
    }
}

export const editSubjectFail = ( error) => {
    return {
        type: actionTypes.EDIT_SUBJECT_FAIL,
        error: error
    }
}

export const editSubject = ( subject, path, curriculum ) => async dispatch => {
    dispatch( editSubjectStart());

    const pathArray = path.split(',');
    const curriculumArray = curriculum.split(',');

    const info = {
        subject: subject,
        path: pathArray,
        curriculum: curriculumArray
    }

    const res = await axios.post('/api/edit_subject', info)

    if (res.data.title === subject) {
        dispatch( editSubjectSuccess('subject edited'));
    } else {
        dispatch( editSubjectFail(res.data));
    }
}

// clear all add messages

export const clearAddMessages = () => {
    return {
        type: actionTypes.CLEAR_ADD_MESSAGES
    }
}

