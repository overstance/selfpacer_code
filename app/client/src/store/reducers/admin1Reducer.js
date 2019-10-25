import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    addAdminUserLoading: false,
    addAdminError: null,
    addAdminSuccessInfo: null,

    addFacilitatorLoading: false,
    addFacilitatorSuccessInfo: null,
    addFacilitatorError: null,

    fetchSubjectToEditError: null,

    subjectToEditPath: '',
    subjectToEditCurriculum: '',
    subjectToEditIconPath: '',

    editSubjectSuccessInfo: null,
    editSubjectError: null,
    editSubjectLoading: false,

    addSubjectSuccessInfo: null,
    addSubjectError: null,
    addSubjectLoading: false,

    deleteSubjectSuccessInfo: null,
    deleteSubjectError: null,
    deleteSubjectLoading: false,

    addSubjectIconLoading: false,
    addSubjectIconError: null,
    addSubjectIconSuccessInfo: null,

    removeFacilitatorLoading: false,
    removeFacilitatorError: null,
    removeFacilitatorSuccessInfo: null,

    facilitateApplicants: [],
    fetchFacilitateApplicantsLoading: false,
    latestFetchFaciliteApplicantLength: 0,
    fetchMoreFacilitateApplicantsLoading: false,
    fetchFacilitateApplicantsError: null,

    approveFacilitateApplicantLoading: false,
    approveFacilitateApplicantError: null,
    applicantToApproveId: null,

    disapproveFacilitateApplicantLoading: false,
    disapproveFacilitateApplicantError: null,
    applicantToDisapproveId: null,

    fetchUserByAttributeSuccessInfo: null,
    fetchUserByAttributeError: null,
    fetchUserByAttributeLoading: false,
    fetchedUser: [],

    addAdminTypeSuccessInfo: null,
    addAdminTypeError: null,
    addAdminTypeLoading: false,

    removeAdminTypeSuccessInfo: null,
    removeAdminTypeError: null,
    removeAdminTypeLoading: false,

    deleteInspireTextLoading: false,
    deleteInspireTextError: null,
    inspireTextToDeleteId: null,

    fetchInspireTextsError: null,
    fetchInspireTextsLoading: false,
    inspireTexts: [],

    addNewInspireTextLoading: false,
    addNewInspireTextError: null,
    addNewInspireTextSuccessMessage: null,
    newInspireTextId: null,

    reportAbuseLoading: false,
    reportAbuseSuccessInfo: null,
    reportAbuseError: null,
    latestAbuseReportId: null,

    deleteAbuseReportLoading: false,
    deleteAbuseReportError: null,
    abuseReportToDeleteId: null,

    
    fetchAbuseReportsError: null,
    fetchAbuseReportsLoading: false,
    abuseReports: [],
};

// Add Admin User 
const addAdminStart = ( state, action ) => {
    return updateObject( state, {
        addAdminUserLoading: true,
        addAdminSuccessInfo: null,
        addAdminError: null
    } );
};

const addAdminSuccess = ( state, action ) => {
    return updateObject( state, {
        addAdminUserLoading: false,
        addAdminSuccessInfo: action.successInfo,      
    } );
};

const addAdminFail = ( state, action ) => {
    return updateObject( state, {
        addAdminUserLoading: false,
        addAdminError: "Failed!: " + action.error
    } );
};

// report abuse

const reportAbuseStart = ( state, action ) => {
    return updateObject( state, {
        reportAbuseLoading: true,
        reportAbuseSuccessInfo: null,
        reportAbuseError: null,
    } );
};

const reportAbuseSuccess = ( state, action ) => {
    return updateObject( state, {
        reportAbuseLoading: false,
        reportAbuseSuccessInfo: 'abuse reported, thank you',
        latestAbuseReportId: action.reportId     
    } );
};

const reportAbuseFail = ( state, action ) => {
    return updateObject( state, {
        reportAbuseLoading: false,
        reportAbuseError:  "Failed!: " + action.error
    } );
};

//  fetch abuse reports

const fetchAbuseReportsStart = ( state, action ) => {
    return updateObject( state, {
        fetchAbuseReportsLoading: true,
        fetchAbuseReportsError: null
    } );
};

const fetchAbuseReportsSuccess = ( state, action ) => {
    return updateObject( state, {
        fetchAbuseReportsLoading: false,
        abuseReports: action.abuseReports      
    } );
};

const fetchAbuseReportsFail = ( state, action ) => {
    return updateObject( state, {
        fetchAbuseReportsLoading: false,
        fetchAbuseReportsError: action.error
    } );
};

// delete abuse report

const deleteAbuseReportStart = ( state, action ) => {
    return updateObject( state, {
        deleteAbuseReportLoading: true,
        deleteAbuseReportError: null,
        abuseReportToDeleteId: action.reportId
    } );
};

const deleteAbuseReportSuccess = ( state, action ) => {
    return updateObject( state, {
        deleteAbuseReportLoading: false,
        abuseReportToDeleteId: null,
        abuseReports: action.updatedAbuseReports      
    } );
};

const deleteAbuseReportFail = ( state, action ) => {
    return updateObject( state, {
        deleteAbuseReportLoading: false,
        deleteAbuseReportError: action.error
    } );
};

const clearReportAbuseMessage = ( state, action ) => {
    return updateObject( state, {
        reportAbuseLoading: false,
        reportAbuseSuccessInfo: null,
        reportAbuseError: null,
        latestAbuseReportId: null,
        deleteAbuseReportLoading: false,
        deleteAbuseReportError: null,
        abuseReportToDeleteId: null,
        fetchAbuseReportsError: null,
        fetchAbuseReportsLoading: false
    } );
};

// Add facilitator

const addFacilitatorStart = ( state, action ) => {
    return updateObject( state, {
        addFacilitatorLoading: true,
        addFacilitatorSuccessInfo: null,
        addFacilitatorError: null,
    } );
};

const addFacilitatorSuccess = ( state, action ) => {
    return updateObject( state, {
        addFacilitatorLoading: false,
        addFacilitatorSuccessInfo: action.successInfo     
    } );
};

const addFacilitatorFail = ( state, action ) => {
    return updateObject( state, {
        addFacilitatorLoading: false,
        addFacilitatorError:  "Failed!: " + action.error
    } );
};

// approve facilitate applicant

const approveFacilitateApplicantStart = ( state, action ) => {
    return updateObject( state, {
        approveFacilitateApplicantLoading: true,
        approveFacilitateApplicantError: null,
        applicantToApproveId: action.userId
    } );
};

const approveFacilitateApplicantSuccess = ( state, action ) => {
    return updateObject( state, {
        approveFacilitateApplicantLoading: false,
        facilitateApplicants: action.updatedApplicants,
        applicantToApproveId: null     
    } );
};

const approveFacilitateApplicantFail = ( state, action ) => {
    return updateObject( state, {
        approveFacilitateApplicantLoading: false,
        approveFacilitateApplicantError: action.error
    } );
};

// disapprove facilitate applicant

const disapproveFacilitateApplicantStart = ( state, action ) => {
    return updateObject( state, {
        disapproveFacilitateApplicantLoading: true,
        disapproveFacilitateApplicantError: null,
        applicantToDisapproveId: action.userId
    } );
};

const disapproveFacilitateApplicantSuccess = ( state, action ) => {
    return updateObject( state, {
        disapproveFacilitateApplicantLoading: false,
        facilitateApplicants: action.updatedApplicants,
        applicantToDisapproveId: null     
    } );
};

const disapproveFacilitateApplicantFail = ( state, action ) => {
    return updateObject( state, {
        disapproveFacilitateApplicantLoading: false,
        disapproveFacilitateApplicantError: action.error
    } );
};

/* //Remove Admin User

const removeAdminSuccess = ( state, action ) => {
    return updateObject( state, {
        removeAdminLoading: false,
        removeAdminSuccessInfo: action.successInfo     
    } );
};

const removeAdminStart = ( state, action ) => {
    return updateObject( state, {
        removeAdminLoading: true,
        removeAdminSuccessInfo: null,
        removeAdminError: null
    } );
};

const removeAdminFail = ( state, action ) => {
    return updateObject( state, {
        removeAdminError: "Failed!: " + action.error,
        removeAdminLoading: false
    } );
}; */

// remove facilitator

const removeFacilitatorSuccess = ( state, action ) => {
    return updateObject( state, {
        removeFacilitatorLoading: false,
        removeFacilitatorSuccessInfo: action.successInfo     
    } );
};

const removeFacilitatorStart = ( state, action ) => {
    return updateObject( state, {
        removeFacilitatorLoading: true,
        removeFacilitatorSuccessInfo: null,
        removeFacilitatorError: null
    } );
};

const removeFacilitatorFail = ( state, action ) => {
    return updateObject( state, {
        removeFacilitatorError: "Failed!: " + action.error,
        removeFacilitatorLoading: false
    } );
};

// Fetch subject to edit path and curricula
const fetchSubjectToEditStart = ( state, action ) => {
    return updateObject( state, {
        fetchSubjectToEditError: null
    });
}

const fetchSubjectToEditFail = ( state, action ) => {
    return updateObject( state, {
        fetchSubjectToEditError: action.error
    });
}

const fetchSubjectToEditSuccess = ( state, action ) => {
    return updateObject( state, {
        subjectToEditPath: action.path,
        subjectToEditCurriculum: action.curriculum,
        subjectToEditIconPath: action.iconPath
    });
}

// Edit Subject path and curriculum

const editSubjectStart = ( state, action ) => {
    return updateObject( state, {
        editSubjectLoading: true,
        editSubjectError: null,
        editSubjectSuccessInfo: null,
        subjectToEditPath: null,
        subjectToEditCurriculum: null
    });
}

const editSubjectSuccess = ( state, action ) => {
    return updateObject( state, {
        editSubjectLoading: false,
        editSubjectSuccessInfo: action.successInfo
    });
}

const editSubjectFail = ( state, action ) => {
    return updateObject( state, {
        editSubjectLoading: false,
        editSubjectError: 'error: ' + action.error
    });
}

// add subject icon

const addSubjectIconStart = ( state, action ) => {
    return updateObject( state, {
        addSubjectIconLoading: true
    });
}

const addSubjectIconSuccess = ( state, action ) => {
    return updateObject( state, {
        addSubjectIconLoading: false,
        addSubjectIconSuccessInfo: action.info,
    });
}

const addSubjectIconFail = ( state, action ) => {
    return updateObject( state, {
        addSubjectIconLoading: false,
        addSubjectIconError: action.error
    });
}

const resetAddSubjectIconState = ( state, action ) => {
    return updateObject( state, {
        addSubjectIconLoading: false,
        addSubjectIconError: null,
        addSubjectIconSuccessInfo: null,
    });
}

// add new subject
const addSubjectStart = ( state, action ) => {
    return updateObject( state, {
        addSubjectSuccessInfo: null,
        addSubjectError: null,
        addSubjectLoading: true,
    });
}

const addSubjectSuccess = ( state, action ) => {
    return updateObject( state, {
        addSubjectSuccessInfo: action.successInfo,
        addSubjectLoading: false,
    });
}

const addSubjectFail = ( state, action ) => {
    return updateObject( state, {
        addSubjectError: action.error,
        addSubjectLoading: false,
    });
}

const clearAddSubjectState = ( state, action ) => {
    return updateObject( state, {
        addSubjectSuccessInfo: null,
        addSubjectError: null,
        addSubjectLoading: false,
    });
}

// delete new subject
const deleteSubjectStart = ( state, action ) => {
    return updateObject( state, {
        deleteSubjectSuccessInfo: null,
        deleteSubjectError: null,
        deleteSubjectLoading: true,
    });
}

const deleteSubjectSuccess = ( state, action ) => {
    return updateObject( state, {
        deleteSubjectSuccessInfo: action.successInfo,
        deleteSubjectLoading: false,
    });
}

const deleteSubjectFail = ( state, action ) => {
    return updateObject( state, {
        deleteSubjectError: action.error,
        deleteSubjectLoading: false,
    });
}

const clearDeleteSubjectInfo = ( state, action ) => {
    return updateObject( state, {
        deleteSubjectSuccessInfo: null,
        deleteSubjectError: null,
        deleteSubjectLoading: false,
    });
}

// fetch facilitate applicants

const fetchFacilitateApplicantsStart = ( state, action ) => {
    return updateObject( state, {
        fetchFacilitateApplicantsLoading: true,
        fetchFacilitateApplicantsError: null
    });
}

const fetchFacilitateApplicantsSuccess = ( state, action ) => {
    return updateObject( state, {
        facilitateApplicants: action.applicants,
        fetchFacilitateApplicantsLoading: false,
        latestFetchFaciliteApplicantLength: action.applicantsLength
    });
}

const fetchFacilitateApplicantsFail = ( state, action ) => {
    return updateObject( state, {
        fetchFacilitateApplicantsLoading: false,
        fetchFacilitateApplicantsError: action.error
    });
}

// fetch more facilitate applicants

const fetchMoreFacilitateApplicantsStart = ( state, action ) => {
    return updateObject( state, {
        fetchMoreFacilitateApplicantsLoading: true,
        fetchFacilitateApplicantsError: null
    });
}

const fetchMoreFacilitateApplicantsSuccess = ( state, action ) => {
    return updateObject( state, {
        facilitateApplicants: action.applicants,
        fetchMoreFacilitateApplicantsLoading: false,
        latestFetchFaciliteApplicantLength: action.applicantsLength
    });
}

const fetchMoreFacilitateApplicantsFail = ( state, action ) => {
    return updateObject( state, {
        fetchMoreFacilitateApplicantsLoading: false,
        fetchFacilitateApplicantsError: action.error
    });
}

// clear all admin add messages

const clearAllAdminMessages = ( state, action ) => {
    return updateObject( state, {
    addAdminError: null,
    editSubjectSuccessInfo: null,
    editSubjectError: null,
    fetchSubjectToEditError: null,
    addFacilitatorSuccessInfo: null,
    deleteSubjectSuccessInfo: null,
    deleteSubjectError: null,
    addSubjectIconError: null,
    addSubjectIconSuccessInfo: null,
    removeFacilitatorError: null,
    removeFacilitatorSuccessInfo: null,
    fetchFacilitateApplicantsError: null,
    approveFacilitateApplicantError: null,
    applicantToDisapproveId: null,
    fetchUserByAttributeSuccessInfo: null,
    fetchUserByAttributeError: null,
    addAdminTypeSuccessInfo: null,
    addAdminTypeError: null,
    removeAdminTypeSuccessInfo: null,
    removeAdminTypeError: null,
    });
}



// clear edit subject info

const clearEditSubjectInfo = ( state, action ) => {
    return updateObject( state, {
        subjectToEditPath: '',
        subjectToEditCurriculum: '',
        subjectToEditIconPath: '',
    });
}

// fetch user by attribute
const fetchUserByAttributeStart = ( state, action ) => {
    return updateObject( state, {
        fetchUserByAttributeSuccessInfo: null,
        fetchUserByAttributeError: null,
        fetchUserByAttributeLoading: true,
    });
}

const fetchUserByAttributeSuccess = ( state, action ) => {
    return updateObject( state, {
        fetchUserByAttributeSuccessInfo: action.successInfo,
        fetchUserByAttributeLoading: false,
        fetchedUser: action.user
    });
}

const fetchUserByAttributeFail = ( state, action ) => {
    return updateObject( state, {
        fetchUserByAttributeError: action.error,
        fetchUserByAttributeLoading: false,
    });
}

const clearFetchUserByAttributeInfo = ( state, action ) => {
    return updateObject( state, {
        fetchUserByAttributeSuccessInfo: null,
        fetchUserByAttributeError: null,
    });
}

// add author or editor
const addAdminTypeStart = ( state, action ) => {
    return updateObject( state, {
        addAdminTypeSuccessInfo: null,
        addAdminTypeError: null,
        addAdminTypeLoading: true,
    });
}

const addAdminTypeSuccess = ( state, action ) => {
    return updateObject( state, {
        addAdminTypeSuccessInfo: action.successInfo,
        addAdminTypeLoading: false
    });
}

const addAdminTypeFail = ( state, action ) => {
    return updateObject( state, {
        addAdminTypeError: action.error,
        addAdminTypeLoading: false,
    });
}

const clearAddAuthorOrEditorInfo = ( state, action ) => {
    return updateObject( state, {
        addAdminTypeSuccessInfo: null,
        addAdminTypeError: null,
    });
}

// add author or editor
const removeAdminTypeStart = ( state, action ) => {
    return updateObject( state, {
        removeAdminTypeSuccessInfo: null,
        removeAdminTypeError: null,
        removeAdminTypeLoading: true,
    });
}

const removeAdminTypeSuccess = ( state, action ) => {
    return updateObject( state, {
        removeAdminTypeSuccessInfo: action.successInfo,
        removeAdminTypeLoading: false
    });
}

const removeAdminTypeFail = ( state, action ) => {
    return updateObject( state, {
        removeAdminTypeError: action.error,
        removeAdminTypeLoading: false,
    });
}

const clearRemoveAdminTypeInfo = ( state, action ) => {
    return updateObject( state, {
        removeAdminTypeSuccessInfo: null,
        removeAdminTypeError: null,
    });
}

// add inspire text

const addNewInspireTextStart = ( state, action ) => {
    return updateObject( state, {
        addNewInspireTextLoading: true,
        addNewInspireTextSuccessMessage: null,
        addNewInspireTextError: null
    } );
};

const addNewInspireTextSuccess = ( state, action ) => {
    return updateObject( state, {
        addNewInspireTextLoading: false,
        addNewInspireTextSuccessMessage: "text added succesfully",
        newInspireTextId: action.newInspireTextId,
        inspireTexts: action.updatedInspiredTexts      
    } );
};

const addNewInspireTextFail = ( state, action ) => {
    return updateObject( state, {
        addNewInspireTextLoading: false,
        addNewInspireTextError: "Failed!: " + action.error
    } );
};


//  fetch inspire texts

const fetchInspireTextsStart = ( state, action ) => {
    return updateObject( state, {
        fetchInspireTextsLoading: true,
        fetchInspireTextsError: null
    } );
};

const fetchInspireTextsSuccess = ( state, action ) => {
    return updateObject( state, {
        fetchInspireTextsLoading: false,
        inspireTexts: action.inspireTexts      
    } );
};

const fetchInspireTextsFail = ( state, action ) => {
    return updateObject( state, {
        fetchInspireTextsLoading: false,
        fetchInspireTextsError: action.error
    } );
};

// delete inspire text

const deleteInspireTextStart = ( state, action ) => {
    return updateObject( state, {
        deleteInspireTextLoading: true,
        deleteInspireTextError: null,
        inspireTextToDeleteId: action.textId
    } );
};

const deleteInspireTextSuccess = ( state, action ) => {
    return updateObject( state, {
        deleteInspireTextLoading: false,
        inspireTextToDeleteId: null,
        inspireTexts: action.updatedInspireTexts      
    } );
};

const deleteInspireTextFail = ( state, action ) => {
    return updateObject( state, {
        deleteInspireTextLoading: false,
        deleteInspireTextError: action.error
    } );
};

const clearInspireTextState = ( state, action ) => {
    return updateObject( state, {
        deleteInspireTextLoading: false,
        deleteInspireTextError: null,
        inspireTextToDeleteId: null,
        fetchInspireTextError: null,
        fetchInspireTextLoading: false,
        addNewInspireTextLoading: false,
        addNewInspireTextError: null,
        addNewInspireTextSuccessMessage: null,
        newInspireTextId: null
    } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_NEW_INSPIRE_TEXT_SUCCESS: return addNewInspireTextSuccess( state, action );
        case actionTypes.ADD_NEW_INSPIRE_TEXT_START: return addNewInspireTextStart( state, action );
        case actionTypes.ADD_NEW_INSPIRE_TEXT_FAIL: return addNewInspireTextFail( state, action );

        case actionTypes.FETCH_INSPIRE_TEXTS_SUCCESS: return fetchInspireTextsSuccess( state, action );
        case actionTypes.FETCH_INSPIRE_TEXTS_START: return fetchInspireTextsStart( state, action );
        case actionTypes.FETCH_INSPIRE_TEXTS_FAIL: return fetchInspireTextsFail( state, action );

        case actionTypes.DELETE_INSPIRE_TEXT_SUCCESS: return deleteInspireTextSuccess( state, action );
        case actionTypes.DELETE_INSPIRE_TEXT_START: return deleteInspireTextStart( state, action );
        case actionTypes.DELETE_INSPIRE_TEXT_FAIL: return deleteInspireTextFail( state, action );

        case actionTypes.CLEAR_INSPIRE_TEXT_STATE: return clearInspireTextState( state, action );

        case actionTypes.REPORT_ABUSE_SUCCESS: return reportAbuseSuccess( state, action );
        case actionTypes.REPORT_ABUSE_START: return reportAbuseStart( state, action );
        case actionTypes.REPORT_ABUSE_FAIL: return reportAbuseFail( state, action );

        case actionTypes.FETCH_ABUSE_REPORTS_SUCCESS: return fetchAbuseReportsSuccess( state, action );
        case actionTypes.FETCH_ABUSE_REPORTS_START: return fetchAbuseReportsStart( state, action );
        case actionTypes.FETCH_ABUSE_REPORTS_FAIL: return fetchAbuseReportsFail( state, action );

        case actionTypes.DELETE_ABUSE_REPORT_SUCCESS: return deleteAbuseReportSuccess( state, action );
        case actionTypes.DELETE_ABUSE_REPORT_START: return deleteAbuseReportStart( state, action );
        case actionTypes.DELETE_ABUSE_REPORT_FAIL: return deleteAbuseReportFail( state, action );

        case actionTypes.CLEAR_REPORT_ABUSE_MESSAGE: return clearReportAbuseMessage( state, action );
        
        case actionTypes.ADD_ADMIN_SUCCESS: return addAdminSuccess( state, action );
        case actionTypes.ADD_ADMIN_START: return addAdminStart( state, action );
        case actionTypes.ADD_ADMIN_FAIL: return addAdminFail( state, action );

        case actionTypes.ADD_FACILITATOR_START: return addFacilitatorStart( state, action );
        case actionTypes.ADD_FACILITATOR_SUCCESS: return addFacilitatorSuccess( state, action );
        case actionTypes.ADD_FACILITATOR_FAIL: return addFacilitatorFail( state, action );

        case actionTypes.APPROVE_FACILITATE_APPLICANT_START: return approveFacilitateApplicantStart( state, action );
        case actionTypes.APPROVE_FACILITATE_APPLICANT_SUCCESS: return approveFacilitateApplicantSuccess( state, action );
        case actionTypes.APPROVE_FACILITATE_APPLICANT_FAIL: return approveFacilitateApplicantFail( state, action );

        case actionTypes.DISAPPROVE_FACILITATE_APPLICANT_START: return disapproveFacilitateApplicantStart( state, action );
        case actionTypes.DISAPPROVE_FACILITATE_APPLICANT_SUCCESS: return disapproveFacilitateApplicantSuccess( state, action );
        case actionTypes.DISAPPROVE_FACILITATE_APPLICANT_FAIL: return disapproveFacilitateApplicantFail( state, action );

        /* case actionTypes.REMOVE_ADMIN_START: return removeAdminStart( state, action );
        case actionTypes.REMOVE_ADMIN_SUCCESS: return removeAdminSuccess( state, action );
        case actionTypes.REMOVE_ADMIN_FAIL: return removeAdminFail( state, action ); */

        case actionTypes.REMOVE_FACILITATOR_START: return removeFacilitatorStart( state, action );
        case actionTypes.REMOVE_FACILITATOR_SUCCESS: return removeFacilitatorSuccess( state, action );
        case actionTypes.REMOVE_FACILITATOR_FAIL: return removeFacilitatorFail( state, action );

        case actionTypes.FETCH_SUBJECT_TO_EDIT_START: return fetchSubjectToEditStart( state, action );
        case actionTypes.FETCH_SUBJECT_TO_EDIT_SUCCESS: return fetchSubjectToEditSuccess( state, action );
        case actionTypes.FETCH_SUBJECT_TO_EDIT_FAIL: return fetchSubjectToEditFail( state, action );

        case actionTypes.EDIT_SUBJECT_START: return editSubjectStart( state, action );
        case actionTypes.EDIT_SUBJECT_SUCCESS: return editSubjectSuccess( state, action );
        case actionTypes.EDIT_SUBJECT_FAIL: return editSubjectFail( state, action );

        case actionTypes.FETCH_FACILITATE_APPLICANTS_START: return fetchFacilitateApplicantsStart( state, action );
        case actionTypes.FETCH_FACILITATE_APPLICANTS_SUCCESS: return fetchFacilitateApplicantsSuccess( state, action );
        case actionTypes.FETCH_FACILITATE_APPLICANTS_FAIL: return fetchFacilitateApplicantsFail( state, action );

        case actionTypes.FETCH_MORE_FACILITATE_APPLICANTS_START: return fetchMoreFacilitateApplicantsStart( state, action );
        case actionTypes.FETCH_MORE_FACILITATE_APPLICANTS_SUCCESS: return fetchMoreFacilitateApplicantsSuccess( state, action );
        case actionTypes.FETCH_MORE_FACILITATE_APPLICANTS_FAIL: return fetchMoreFacilitateApplicantsFail( state, action );

        case actionTypes.ADD_SUBJECT_START: return addSubjectStart( state, action );
        case actionTypes.ADD_SUBJECT_SUCCESS: return addSubjectSuccess( state, action );
        case actionTypes.ADD_SUBJECT_FAIL: return addSubjectFail( state, action );
        case actionTypes.CLEAR_ADD_SUBJECT_STATE: return clearAddSubjectState( state, action );

        case actionTypes.DELETE_SUBJECT_START: return deleteSubjectStart( state, action );
        case actionTypes.DELETE_SUBJECT_SUCCESS: return deleteSubjectSuccess( state, action );
        case actionTypes.DELETE_SUBJECT_FAIL: return deleteSubjectFail( state, action );
        case actionTypes.CLEAR_DELETE_SUBJECT_INFO: return clearDeleteSubjectInfo( state, action );

        case actionTypes.ADD_SUBJECT_ICON_START: return addSubjectIconStart( state, action );
        case actionTypes.ADD_SUBJECT_ICON_SUCCESS: return addSubjectIconSuccess( state, action );
        case actionTypes.ADD_SUBJECT_ICON_FAIL: return addSubjectIconFail( state, action );
        case actionTypes.RESET_ADD_SUBJECT_ICON_STATE: return resetAddSubjectIconState( state, action );
        
        case actionTypes.FETCH_USER_BY_ATTRIBUTE_START: return fetchUserByAttributeStart( state, action );
        case actionTypes.FETCH_USER_BY_ATTRIBUTE_SUCCESS: return fetchUserByAttributeSuccess( state, action );
        case actionTypes.FETCH_USER_BY_ATTRIBUTE_FAIL: return fetchUserByAttributeFail( state, action );
        case actionTypes.CLEAR_FETCH_USER_BY_ATTRIBUTE_INFO: return clearFetchUserByAttributeInfo( state, action );

        case actionTypes.ADD_ADMIN_TYPE_START: return addAdminTypeStart( state, action );
        case actionTypes.ADD_ADMIN_TYPE_SUCCESS: return addAdminTypeSuccess( state, action );
        case actionTypes.ADD_ADMIN_TYPE_FAIL: return addAdminTypeFail( state, action );
        case actionTypes.CLEAR_ADD_ADMIN_TYPE_INFO: return clearAddAuthorOrEditorInfo( state, action );

        case actionTypes.REMOVE_ADMIN_TYPE_START: return removeAdminTypeStart( state, action );
        case actionTypes.REMOVE_ADMIN_TYPE_SUCCESS: return removeAdminTypeSuccess( state, action );
        case actionTypes.REMOVE_ADMIN_TYPE_FAIL: return removeAdminTypeFail( state, action );
        case actionTypes.CLEAR_REMOVE_ADMIN_TYPE_INFO: return clearRemoveAdminTypeInfo( state, action );

        case actionTypes.CLEAR_ALL_ADMIN_MESSAGES: return clearAllAdminMessages( state, action );

        case actionTypes.CLEAR_EDIT_SUBJECT_INFO: return clearEditSubjectInfo( state, action );

        default: return state;
    }
};



export default reducer;