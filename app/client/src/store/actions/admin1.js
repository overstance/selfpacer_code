import axios from 'axios';
import * as actionTypes from './actionTypes';

//Add AdminUser or Facilitator

export const AdminAddStart = () => {
    return {
        type: actionTypes.ADD_ADMIN_START
    };
};

export const adminUserAdded = ( successInfo ) => {
    return {
        type: actionTypes.ADD_ADMIN_SUCCESS,
        successInfo: successInfo
    };
};

export const adminAddFailed = ( error ) => {
    return {
        type: actionTypes.ADD_ADMIN_FAIL,
        error: error
    };
};

export const addFacilitatorStart = () => {
    return {
        type: actionTypes.ADD_FACILITATOR_START
    };
};

export const addFacilitatorSuccess = ( successInfo ) => {
    return {
        type: actionTypes.ADD_FACILITATOR_SUCCESS,
        successInfo: successInfo
    };
};

export const addFacilitatorFail = ( error ) => {
    return {
        type: actionTypes.ADD_FACILITATOR_FAIL,
        error: error
    };
}

export const addAdminOrFacilitator = (user_id, newAccountType) => async dispatch => {
    if (newAccountType === 'Administrator') {
        dispatch (AdminAddStart());
    } else if (newAccountType === 'Facilitator') {
        dispatch (addFacilitatorStart());
    }
    
    const info = {
        userId: user_id,
        newAccountType: newAccountType
    };

    const res = await axios.post('/api/add_admin_or_facilitator', info)
    if (res.data.updatedUser && newAccountType === 'Administrator' ) {
        dispatch(adminUserAdded('Admin User Added'));
    } else if (res.data.updatedUser && newAccountType === 'Facilitator') {
        dispatch(addFacilitatorSuccess('Facilitator Added'));
    } else if (res.data.error && newAccountType === 'Administrator') {
        dispatch(adminAddFailed(res.data.error))
    } else if (res.data.error && newAccountType === 'Facilitator') {
        dispatch(addFacilitatorFail(res.data.error))
    }
};

// Remove Admin user

export const removeAdminStart = () => {
    return {
        type: actionTypes.REMOVE_ADMIN_START
    };
};

export const removeAdminSuccess = ( successInfo ) => {
    return {
        type: actionTypes.REMOVE_ADMIN_SUCCESS,
        successInfo: successInfo
    };
};

export const removeAdminFail = ( error ) => {
    return {
        type: actionTypes.REMOVE_ADMIN_FAIL,
        error: error
    };
};

export const removeAdmin = (userId) => async dispatch => {

    dispatch(removeAdminStart());
    const res = await axios.post('/api/remove_admin', { userId: userId });
    if (res.data.updatedUser) {
        dispatch(removeAdminSuccess('Admin Removed'));
    } else if (res.data.error) {    
        dispatch(removeAdminFail(res.data.error));
    } 

};

// Remove Facilitator

export const removeFacilitatorStart = () => {
    return {
        type: actionTypes.REMOVE_FACILITATOR_START
    };
};

export const removeFacilitatorSuccess = ( successInfo ) => {
    return {
        type: actionTypes.REMOVE_FACILITATOR_SUCCESS,
        successInfo: successInfo
    };
};

export const removeFacilitatorFail = ( error ) => {
    return {
        type: actionTypes.REMOVE_FACILITATOR_FAIL,
        error: error
    };
};

export const removeFacilitator = (userId) => async dispatch => {

    dispatch(removeFacilitatorStart());
    const res = await axios.post('/api/remove_facilitator', { userId: userId });
    if (res.data.updatedUser) {
        dispatch(removeFacilitatorSuccess('Facilitator Removed'));
    } else if (res.data.error) {    
        dispatch(removeFacilitatorFail(res.data.error));
    }

};

// Add subject Icon

export const addSubjectIconStart = () => {
    return {
        type: actionTypes.ADD_SUBJECT_ICON_START
    };
};

export const addSubjectIconSuccess = ( info ) => {
    return {
        type: actionTypes.ADD_SUBJECT_ICON_SUCCESS,
        info: info
    };
};

export const addSubjectIconFailed = ( error ) => {
    return {
        type: actionTypes.ADD_SUBJECT_ICON_FAIL,
        error: error
    };
};

export const resetAddSubjectIconState = () => {
    return {
        type: actionTypes.RESET_ADD_SUBJECT_ICON_STATE
    }
}



export const addSubjectIcon = ( file ) => async dispatch => {  

    dispatch(addSubjectIconStart());

    let data = new FormData();   
    data.append('file', file);
    const res = await axios.post('/api/upload_subjectIcon', data);
    // console.log(res.data);
    
    if (res.data === 'file added') {
        // console.log(res.data);
        dispatch(addSubjectIconSuccess('Add icon successful'));
    } else {
        // console.log(res.data);
        dispatch(addSubjectIconFailed('error'));
    }    
  }

//   fetch subject path and curricula info
export const fetchSubjectToEditStart = () => {
    return {
        type: actionTypes.FETCH_SUBJECT_TO_EDIT_START
    };
};

export const fetchSubjectToEditSuccess = ( path, curriculum, iconPath ) => {
    return {
        type: actionTypes.FETCH_SUBJECT_TO_EDIT_SUCCESS,
        path: path,
        curriculum: curriculum,
        iconPath: iconPath
    }
}

export const fetchSubjectToEditFail = (error) => {
    return {
        type: actionTypes.FETCH_SUBJECT_TO_EDIT_FAIL,
        error: error
    };
};

export const fetchSelectSubjectInfo = ( subject ) => async dispatch => {
    dispatch(fetchSubjectToEditStart());
     const res = await axios.get('/api/fetch_subject_info', { params: { subject: subject}})


     if(res.data.title === subject) {
        //  console.log(res.data);
         const path = res.data.paths.join();
         const curriculum = res.data.curriculum.join();
        //  const title = res.data.title
         const iconPath = res.data.src;

         dispatch( fetchSubjectToEditSuccess( path, curriculum, iconPath));
     } else if (res.data.error) {
        dispatch(fetchSubjectToEditFail(res.data.error));
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

export const clearEditSubjectInfo = () => {
    return {
        type: actionTypes.CLEAR_EDIT_SUBJECT_INFO
    }
}

export const editSubject = ( subject, path, curriculum, iconPath ) => async dispatch => {
    dispatch( editSubjectStart());

    const pathArray = path.split(',');
    const curriculumArray = curriculum.split(',');

    const info = {
        subject: subject,
        path: pathArray,
        curriculum: curriculumArray,
        iconPath: iconPath
    }

    const res = await axios.post('/api/edit_subject', info)

    if (res.data.title === subject) {
        dispatch( editSubjectSuccess('subject edited'));
    } else if (res.data.error){
        dispatch( editSubjectFail(res.data.error));
    }
}

//  add new subject
export const addSubjectStart = () => {
    return {
        type: actionTypes.ADD_SUBJECT_START,
    }
}

export const addSubjectSuccess = ( successInfo ) => {
    return {
        type: actionTypes.ADD_SUBJECT_SUCCESS,
        successInfo: successInfo
    }
}

export const addSubjectFail = ( error) => {
    return {
        type: actionTypes.ADD_SUBJECT_FAIL,
        error: error
    }
}

export const clearAddSubjectState = () => {
    return {
        type: actionTypes.CLEAR_ADD_SUBJECT_STATE
    }
}

export const addSubject = ( subjectTitle, category, iconPath, iconAlt, path, curriculum ) => async dispatch => {
    dispatch( addSubjectStart());

    const pathArray = path.split(',');
    const curriculumArray = curriculum.split(',');

    const info = {
        subjectTitle: subjectTitle,
        category: category,
        iconPath: iconPath,
        iconAlt: iconAlt,
        path: pathArray,
        curriculum: curriculumArray
    }

    const res = await axios.post('/api/add_subject', info)

    if (res.data.subject) {
        dispatch( addSubjectSuccess('subject added'));
    } else if (res.data.error){
        dispatch( addSubjectFail(res.data.error));
    }
}

//  delete subject
export const deleteSubjectStart = () => {
    return {
        type: actionTypes.DELETE_SUBJECT_START,
    }
}

export const deleteSubjectSuccess = ( successInfo ) => {
    return {
        type: actionTypes.DELETE_SUBJECT_SUCCESS,
        successInfo: successInfo
    }
}

export const deleteSubjectFail = ( error) => {
    return {
        type: actionTypes.DELETE_SUBJECT_FAIL,
        error: error
    }
}

export const clearDeleteSubjectInfo = () => {
    return {
        type: actionTypes.CLEAR_DELETE_SUBJECT_INFO
    }
}

export const deleteSubject = ( subjectTitle ) => async dispatch => {
    dispatch( deleteSubjectStart());

    const res = await axios.delete('/api/delete_subject', {params: { subjectTitle: subjectTitle }});

    if (res.data.subject) {
        // console.log(res.data.subject)
        dispatch( deleteSubjectSuccess('subject deleted'));
    } else if (res.data.error){
        dispatch( deleteSubjectFail(res.data.error));
    }
}

//  fetch facilitate applicants
export const fetchFacilitateApplicantsStart = () => {
    return {
        type: actionTypes.FETCH_FACILITATE_APPLICANTS_START,
    }
}

export const fetchFacilitateApplicantsSuccess = ( applicants, applicantsLength ) => {
    return {
        type: actionTypes.FETCH_FACILITATE_APPLICANTS_SUCCESS,
        applicants: applicants,
        applicantsLength: applicantsLength
    }
}

export const fetchFacilitateApplicantsFail = ( error) => {
    return {
        type: actionTypes.FETCH_FACILITATE_APPLICANTS_FAIL,
        error: error
    }
}

export const fetchFacilitateApplicants = (pageIndex) => async dispatch => {
    dispatch( fetchFacilitateApplicantsStart());

    const res = await axios.get('/api/fetch_facilitator_applicants', { params: { pageIndex: pageIndex}});

    if (res.data.applicants) {
        let applicantsLength = res.data.applicants.length
        dispatch( fetchFacilitateApplicantsSuccess(res.data.applicants, applicantsLength));
    } else if (res.data.error){
        dispatch( fetchFacilitateApplicantsFail(res.data.error));
    }
}

// fetch more facilitate applicants

export const fetchMoreFacilitateApplicantsStart = () => {
    return {
        type: actionTypes.FETCH_MORE_FACILITATE_APPLICANTS_START,
    }
}

export const fetchMoreFacilitateApplicantsSuccess = ( applicants, applicantsLength ) => {
    return {
        type: actionTypes.FETCH_MORE_FACILITATE_APPLICANTS_SUCCESS,
        applicants: applicants,
        applicantsLength: applicantsLength
    }
}

export const fetchMoreFacilitateApplicantsFail = ( error) => {
    return {
        type: actionTypes.FETCH_MORE_FACILITATE_APPLICANTS_FAIL,
        error: error
    }
}

export const fetchMoreFacilitateApplicants = (pageIndex, facilitateApplicants) => async dispatch => {
    dispatch( fetchMoreFacilitateApplicantsStart());

    const res = await axios.get('/api/fetch_facilitator_applicants', { params: { pageIndex: pageIndex}});

    if (res.data.applicants) {
        let UpdatedApplicants = [...facilitateApplicants, ...res.data.applicants]
        let applicantsLength = res.data.applicants.length
        dispatch( fetchMoreFacilitateApplicantsSuccess(UpdatedApplicants, applicantsLength));
    } else if (res.data.error){
        dispatch( fetchMoreFacilitateApplicantsFail(res.data.error));
    }
}

// approve facilitate applicant

export const approveFacilitateApplicantStart = (userId) => {
    return {
        type: actionTypes.APPROVE_FACILITATE_APPLICANT_START,
        userId: userId
    };
};

export const approveFacilitateApplicantSuccess = (updatedApplicants) => {
    return {
        type: actionTypes.APPROVE_FACILITATE_APPLICANT_SUCCESS,
        updatedApplicants: updatedApplicants
    };
};

export const approveFacilitateApplicantFail = ( error ) => {
    return {
        type: actionTypes.APPROVE_FACILITATE_APPLICANT_FAIL,
        error: error
    };
}

export const approveFacilitateApplicant = (userId, facilitateApplicants) => async dispatch => {
    
    dispatch(approveFacilitateApplicantStart(userId));
    const info = {
        userId: userId,
        newAccountType: 'Facilitator'
    };

    const res = await axios.post('/api/add_admin_or_facilitator', info)
    if (res.data.updatedUser._id === userId) {
        let updatedApplicants = facilitateApplicants.filter( applicant => applicant._id !== userId)
        dispatch(approveFacilitateApplicantSuccess(updatedApplicants));
    }  else if (res.data.error) {
        dispatch(approveFacilitateApplicantFail(res.data.error))
    }
};

// disapprove facilitate applicant

export const disapproveFacilitateApplicantStart = (userId) => {
    return {
        type: actionTypes.DISAPPROVE_FACILITATE_APPLICANT_START,
        userId: userId
    };
};

export const disapproveFacilitateApplicantSuccess = (updatedApplicants) => {
    return {
        type: actionTypes.DISAPPROVE_FACILITATE_APPLICANT_SUCCESS,
        updatedApplicants: updatedApplicants
    };
};

export const disapproveFacilitateApplicantFail = ( error ) => {
    return {
        type: actionTypes.DISAPPROVE_FACILITATE_APPLICANT_FAIL,
        error: error
    };
}

export const disapproveFacilitateApplicant = (userId, facilitateApplicants) => async dispatch => {
    
    dispatch(disapproveFacilitateApplicantStart(userId));
    
    const res = await axios.post('/api/remove_facilitator', { userId: userId })
    if (res.data.updatedUser._id === userId) {
        let updatedApplicants = facilitateApplicants.filter( applicant => applicant._id !== userId)
        dispatch(disapproveFacilitateApplicantSuccess(updatedApplicants));
    }  else if (res.data.error) {
        dispatch(disapproveFacilitateApplicantFail(res.data.error))
    }
};


// clear all add messages

export const clearAllAdminMessages = () => {
    return {
        type: actionTypes.CLEAR_ALL_ADMIN_MESSAGES
    }
}


