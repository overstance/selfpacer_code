import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    updatedUser: {},
    adminAddError: null,
    userAddedFeedback: null,

    subjectToEditPath: '',
    subjectToEditCurriculum: '',

    editSubjectSuccessInfo: null,
    editSubjectError: null,
    
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

const fetchSubjectToEditSuccess = ( state, action ) => {
    return updateObject( state, {
        subjectToEditPath: action.path,
        subjectToEditCurriculum: action.curriculum
    });
}

// Edit Subject path and curriculum

const editSubjectStart = ( state, action ) => {
    return updateObject( state, {
        editSubjectError: null,
        editSubjectSuccessInfo: null,
        subjectToEditPath: null,
        subjectToEditCurriculum: null
    });
}

const editSubjectSuccess = ( state, action ) => {
    return updateObject( state, {
        editSubjectSuccessInfo: action.successInfo
    });
}

const editSubjectFail = ( state, action ) => {
    return updateObject( state, {
        editSubjectError: 'error: ' + action.error
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
    addYoutubePlaylistError: null,
    youtubePlaylistAddedFeedback: null,
    updateYoutubePlaylistsError: null,
    youtubePlaylistsUpdatedFeedback: null,
    addYoutubeVideoError: null,
    youtubeVideoAddedFeedback: null,
    updateYoutubeVideosError: null,
    youtubeVideosUpdatedFeedback: null,
    addMoocSucessInfo: null,
    addMoocError: null,
    addBooksSucessInfo: null,
    addBooksError: null
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

        case actionTypes.FETCH_SUBJECT_TO_EDIT_SUCCESS: return fetchSubjectToEditSuccess( state, action );

        case actionTypes.EDIT_SUBJECT_START: return editSubjectStart( state, action );
        case actionTypes.EDIT_SUBJECT_SUCCESS: return editSubjectSuccess( state, action );
        case actionTypes.EDIT_SUBJECT_FAIL: return editSubjectFail( state, action );

        case actionTypes.CLEAR_ADD_MESSAGES: return clearAddMessages( state, action );

        default: return state;
    }
};



export default reducer;