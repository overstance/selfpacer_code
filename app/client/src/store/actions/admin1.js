import axios from 'axios';
import * as actionTypes from './actionTypes';

//Add AdminUser

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

export const addAdminUser = (user_id, newAccountType) => async dispatch => {
    dispatch (AdminAddStart());
    
    const info = {
        userId: user_id,
        newAccountType: newAccountType
    };

    const res = await axios.put('/api/add_admin_user', info)
    if (res.data.updatedUser) {
        dispatch(adminUserAdded(`${newAccountType + ' '} User Added`));
    } else if (res.data.error) {
        dispatch(adminAddFailed(res.data.error))
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

/* export const removeAdmin = (user_id, newAccountType) => async dispatch => {

    dispatch(removeAdminStart());
    const res = await axios.put('/api/remove_admin_user', { userId: user_id, newAccountType: newAccountType });
    if (res.data.updatedUser) {
        dispatch(removeAdminSuccess(`${'User Added as ' + newAccountType }`));
    } else if (res.data.error) {    
        dispatch(removeAdminFail(res.data.error));
    } 

}; */

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

export const addFacilitator = (user_id) => async dispatch => {
    dispatch (addFacilitatorStart());

    const res = await axios.put('/api/add_facilitator', {userId: user_id})

    if (res.data.updatedUser) {
        dispatch(addFacilitatorSuccess('Facilitator Added'));
    } else if (res.data.error) {
        dispatch(addFacilitatorFail(res.data.error))
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
    const res = await axios.put('/api/remove_facilitator', { userId: userId });
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
    
    if (res.data.path) {
        console.log(res.data.path);
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
        userId: userId
    };

    const res = await axios.put('/api/add_facilitator', info)
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
    
    const res = await axios.put('/api/remove_facilitator', { userId: userId })
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

// fetch user by attribute

export const fetchUserByAttributeStart = () => {
    return {
        type: actionTypes.FETCH_USER_BY_ATTRIBUTE_START
    };
};

export const fetchUserByAttributeSuccess = (user, successInfo) => {
    return {
        type: actionTypes.FETCH_USER_BY_ATTRIBUTE_SUCCESS,
        user: user,
        successInfo: successInfo
    };
};

export const fetchUserByAttributeFail = ( error ) => {
    return {
        type: actionTypes.FETCH_USER_BY_ATTRIBUTE_FAIL,
        error: error
    };
}

export const fetchUserByAttribute = (type, attribute) => async dispatch => {
    
    dispatch(fetchUserByAttributeStart());
    
    const res = await axios.get('/api/fetch_user_by_attribute', { params: {type: type, attribute: attribute}})
    if (res.data.user) { 
        if (res.data.user.length === 0) {
            dispatch(fetchUserByAttributeSuccess([], 'No User Found!'));
        } else {
            dispatch(fetchUserByAttributeSuccess(res.data.user, 'fetch successful'));
        }    
    }  else if (res.data.error) {
        dispatch(fetchUserByAttributeFail(res.data.error))
    }
};

export const clearFetchUserByAttributeInfo = () => {
    return {
        type: actionTypes.CLEAR_FETCH_USER_BY_ATTRIBUTE_INFO
    }
}

// add author or editor

export const addAdminTypeStart = () => {
    return {
        type: actionTypes.ADD_ADMIN_TYPE_START
    };
};

export const addAdminTypeSuccess = (successInfo) => {
    return {
        type: actionTypes.ADD_ADMIN_TYPE_SUCCESS,
        successInfo: successInfo
    };
};

export const addAdminTypeFail = ( error ) => {
    return {
        type: actionTypes.ADD_ADMIN_TYPE_FAIL,
        error: error
    };
}

export const addAdminType = (type, userId, twitterUrl/* , facebookUrl, linkedinUrl */) => async dispatch => {
    
    dispatch(addAdminTypeStart());

    /* let twitter = twitterUrl; 
    let facebook = facebookUrl;
    let linkedin = linkedinUrl;
    
    if (twitterUrl === '') {
        twitter = undefined
    }

    if (facebookUrl === '') {
        facebook = undefined
    }

    if ( linkedinUrl === '') {
        linkedin = undefined
    } */

    // console.log(type, userId, twitter, facebook, linkedin);
    
    const res = await axios.put('/api/add_admin_type', { type: type, userId: userId, twitterUrl: twitterUrl/* , facebookUrl: facebook, linkedinUrl: linkedin */})
    if (res.data.user) { 
        // console.log(res.data.user);
        dispatch(addAdminTypeSuccess('user role updated'));    
    }  else if (res.data.error) {
        dispatch(addAdminTypeFail(res.data.error))
    }
};

export const clearAddAuthorOrEditorInfo = () => {
    return {
        type: actionTypes.CLEAR_ADD_ADMIN_TYPE_INFO
    }
}

// remove author or editor

export const removeAdminTypeStart = () => {
    return {
        type: actionTypes.REMOVE_ADMIN_TYPE_START
    };
};

export const removeAdminTypeSuccess = (successInfo) => {
    return {
        type: actionTypes.REMOVE_ADMIN_TYPE_SUCCESS,
        successInfo: successInfo
    };
};

export const removeAdminTypeFail = ( error ) => {
    return {
        type: actionTypes.REMOVE_ADMIN_TYPE_FAIL,
        error: error
    };
}

export const removeAdminType = (type, userId) => async dispatch => {
    
    dispatch(removeAdminTypeStart());

    // console.log(type, userId);
    
    const res = await axios.put('/api/remove_admin_type', { type: type, userId: userId})
    if (res.data.user) { 
        // console.log(res.data.user);
        dispatch(removeAdminTypeSuccess('user role updated'));    
    }  else if (res.data.error) {
        dispatch(removeAdminTypeFail(res.data.error))
    }
};

export const clearRemoveAdminTypeInfo = () => {
    return {
        type: actionTypes.CLEAR_REMOVE_ADMIN_TYPE_INFO
    }
}

// add new inspire text

export const addNewInspireTextStart = () => ({
    type: actionTypes.ADD_NEW_INSPIRE_TEXT_START 
});

export const addNewInspireTextSuccess = (updatedInspiredTexts, newInspireTextId) => ({
    type: actionTypes.ADD_NEW_INSPIRE_TEXT_SUCCESS,
    updatedInspiredTexts: updatedInspiredTexts,
    newInspireTextId: newInspireTextId 
});

export const addNewInspireTextFail = (error) => ({
    type: actionTypes.ADD_NEW_INSPIRE_TEXT_FAIL,
    error: error 
});

export const addNewInspireText = (textValue, inspireTexts) => async dispatch => {
    dispatch(addNewInspireTextStart());

    const res = await axios.post('/api/add_new_inspire_text', {textValue: textValue});

    if(res.data.newInspireText) {
        let updatedInspiredTexts = [res.data.newInspireText, ...inspireTexts];
        let newInspireTextId = res.data.newInspireText._id;

        dispatch(addNewInspireTextSuccess(updatedInspiredTexts, newInspireTextId));
    } else if (res.data.error) {
        dispatch(addNewInspireTextFail(res.data.error));
    }
};

// fetch Inspire texts

export const fetchInspireTextsStart = () => ({
    type: actionTypes.FETCH_INSPIRE_TEXTS_START 
});

export const fetchInspireTextsSuccess = (inspireTexts) => ({
    type: actionTypes.FETCH_INSPIRE_TEXTS_SUCCESS,
    inspireTexts: inspireTexts 
});

export const fetchInspireTextsFail = (error) => ({
    type: actionTypes.FETCH_INSPIRE_TEXTS_FAIL,
    error: error 
});

export const fetchInspireTexts = () => async dispatch => {
    dispatch(fetchInspireTextsStart());

    const res = await axios.get('/api/fetch_inspire_text');

    if(res.data.inspireTexts) {
        dispatch(fetchInspireTextsSuccess(res.data.inspireTexts));
    } else if (res.data.error) {
        dispatch(fetchInspireTextsFail(res.data.error));
    }
};

// delete inspire text

export const deleteInspireTextStart = (textId) => ({
    type: actionTypes.DELETE_INSPIRE_TEXT_START,
    textId: textId 
});

export const deleteInspireTextSuccess = (updatedInspireTexts) => ({
    type: actionTypes.DELETE_INSPIRE_TEXT_SUCCESS,
    updatedInspireTexts: updatedInspireTexts 
});

export const deleteInspireTextFail = (error) => ({
    type: actionTypes.DELETE_INSPIRE_TEXT_FAIL,
    error: error 
});

export const deleteInspireText = (textId, inspireTexts) => async dispatch => {
    dispatch(deleteInspireTextStart(textId));
    const res = await axios.delete('/api/delete_inspire_text', {params: {textId: textId}});

    if(res.data.message === 'delete successful') {
        let updatedInspireTexts = inspireTexts.filter(text => text._id !== textId);
        dispatch(deleteInspireTextSuccess(updatedInspireTexts));
    } else if (res.data.error) {
        dispatch(deleteInspireTextFail(res.data.error));
    }
};

// clear inspire texts messages

export const clearInspireTextState = () => ({
    type: actionTypes.CLEAR_INSPIRE_TEXT_STATE 
});

// fetch abuse reports

export const fetchAbuseReportsStart = () => ({
    type: actionTypes.FETCH_ABUSE_REPORTS_START 
});

export const fetchAbuseReportsSuccess = (abuseReports) => ({
    type: actionTypes.FETCH_ABUSE_REPORTS_SUCCESS,
    abuseReports: abuseReports 
});

export const fetchAbuseReportsFail = (error) => ({
    type: actionTypes.FETCH_ABUSE_REPORTS_FAIL,
    error: error 
});

export const fetchAbuseReports = () => async dispatch => {
    dispatch(fetchAbuseReportsStart());

    const res = await axios.get('/api/fetch_abuse_reports');

    if(res.data.abuseReports) {
        dispatch(fetchAbuseReportsSuccess(res.data.abuseReports));
    } else if (res.data.error) {
        dispatch(fetchAbuseReportsFail(res.data.error));
    }
};

// delete inspire text

export const deleteAbuseReportStart = (reportId) => ({
    type: actionTypes.DELETE_ABUSE_REPORT_START,
    reportId: reportId 
});

export const deleteAbuseReportSuccess = (updatedAbuseReports) => ({
    type: actionTypes.DELETE_ABUSE_REPORT_SUCCESS,
    updatedAbuseReports: updatedAbuseReports 
});

export const deleteAbuseReportFail = (error) => ({
    type: actionTypes.DELETE_ABUSE_REPORT_FAIL,
    error: error 
});

export const deleteAbuseReport = (reportId, abuseReports) => async dispatch => {
    dispatch(deleteAbuseReportStart(reportId));
    const res = await axios.delete('/api/delete_abuse_report', {params: {reportId: reportId}});

    if(res.data.message === 'report deleted') {
        let updatedAbuseReports = abuseReports.filter(report => report._id !== reportId);
        dispatch(deleteAbuseReportSuccess(updatedAbuseReports));
    } else if (res.data.error) {
        dispatch(deleteAbuseReportFail(res.data.error));
    }
};


// report abuse

export const reportAbuseStart = (textId) => ({
    type: actionTypes.REPORT_ABUSE_START,
    textId: textId 
});

export const reportAbuseSuccess = (reportId) => ({
    type: actionTypes.REPORT_ABUSE_SUCCESS,
    reportId: reportId 
});

export const reportAbuseFail = (error) => ({
    type: actionTypes.REPORT_ABUSE_FAIL,
    error: error 
});

export const reportAbuse = (report, reporterId, reporter) => async dispatch => {
    dispatch(reportAbuseStart());
    const res = await axios.post('/api/report_abuse', {report: report, reporterId: reporterId, reporter: reporter});

    if(res.data.abuseReport) {
        dispatch(reportAbuseSuccess(res.data.abuseReport._id));
    } else if (res.data.error) {
        dispatch(reportAbuseFail(res.data.error));
    }
};

export const clearReportAbuseMessage = () =>  ({
    type: actionTypes.CLEAR_REPORT_ABUSE_MESSAGE 
});



