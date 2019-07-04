import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    updatedUser: {},
    adminAddError: null,
    userAddedFeedback: null,

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
    
    removedUser: {},
    adminUserRemoveError: null,
    adminUserRemovedFeedback: null,
};

// Add Admin User 

const adminUserAdded = ( state, action ) => {
    return updateObject( state, {
        updatedUser: action.updatedUser,
        userAddedFeedback: "User added!",      
    } );
};

const adminAddStart = ( state, action ) => {
    return updateObject( state, {
        userAddedFeedback: null,
        adminAddError: null
    } );
};

const adminAddFailed = ( state, action ) => {
    return updateObject( state, {
        adminAddError: "Failed!: " + action.error
    } );
};

//Remove Admin User

const adminUserRemoved = ( state, action ) => {
    return updateObject( state, {
        removedUser: action.updatedUser,
        adminUserRemovedFeedback: "User removed!",      
    } );
};

const adminUserRemoveStart = ( state, action ) => {
    return updateObject( state, {
        adminUserRemovedFeedback: null,
        adminUserRemoveError: null
    } );
};

const adminUserRemoveFailed = ( state, action ) => {
    return updateObject( state, {
        adminUserRemoveError: "Failed!: " + action.error
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

// clear all admin add messages

const clearAddMessages = ( state, action ) => {
    return updateObject( state, {
    adminAddError: null,
    editSubjectSuccessInfo: null,
    editSubjectError: null,
    adminUserRemoveError: null,
    adminUserRemovedFeedback: null,
    fetchSubjectToEditError: null
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


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADMIN_USER_ADDED: return adminUserAdded( state, action );
        case actionTypes.ADMIN_ADD_START: return adminAddStart( state, action );
        case actionTypes.ADMIN_ADD_FAILED: return adminAddFailed( state, action );

        case actionTypes.ADMIN_USER_REMOVE_START: return adminUserRemoveStart( state, action );
        case actionTypes.ADMIN_USER_REMOVED: return adminUserRemoved( state, action );
        case actionTypes.ADMIN_USER_REMOVED_FAILED: return adminUserRemoveFailed( state, action );

        case actionTypes.FETCH_SUBJECT_TO_EDIT_START: return fetchSubjectToEditStart( state, action );
        case actionTypes.FETCH_SUBJECT_TO_EDIT_SUCCESS: return fetchSubjectToEditSuccess( state, action );
        case actionTypes.FETCH_SUBJECT_TO_EDIT_FAIL: return fetchSubjectToEditFail( state, action );

        case actionTypes.EDIT_SUBJECT_START: return editSubjectStart( state, action );
        case actionTypes.EDIT_SUBJECT_SUCCESS: return editSubjectSuccess( state, action );
        case actionTypes.EDIT_SUBJECT_FAIL: return editSubjectFail( state, action );

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
        
        

        case actionTypes.CLEAR_ADD_MESSAGES: return clearAddMessages( state, action );

        case actionTypes.CLEAR_EDIT_SUBJECT_INFO: return clearEditSubjectInfo( state, action );

        default: return state;
    }
};



export default reducer;