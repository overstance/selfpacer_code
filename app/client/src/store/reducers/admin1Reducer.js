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
    
    removeAdminLoading: false,
    removeAdminError: null,
    removeAdminSuccessInfo: null,

    removeFacilitatorLoading: false,
    removeFacilitatorError: null,
    removeFacilitatorSuccessInfo: null
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

//Remove Admin User

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
};

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

// clear all admin add messages

const clearAllAdminMessages = ( state, action ) => {
    return updateObject( state, {
    addAdminError: null,
    editSubjectSuccessInfo: null,
    editSubjectError: null,
    removeAdminError: null,
    removeAdminSuccessInfo: null,
    fetchSubjectToEditError: null,
    addFacilitatorSuccessInfo: null,
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
        case actionTypes.ADD_ADMIN_SUCCESS: return addAdminSuccess( state, action );
        case actionTypes.ADD_ADMIN_START: return addAdminStart( state, action );
        case actionTypes.ADD_ADMIN_FAIL: return addAdminFail( state, action );

        case actionTypes.ADD_FACILITATOR_START: return addFacilitatorStart( state, action );
        case actionTypes.ADD_FACILITATOR_SUCCESS: return addFacilitatorSuccess( state, action );
        case actionTypes.ADD_FACILITATOR_FAIL: return addFacilitatorFail( state, action );

        case actionTypes.REMOVE_ADMIN_START: return removeAdminStart( state, action );
        case actionTypes.REMOVE_ADMIN_SUCCESS: return removeAdminSuccess( state, action );
        case actionTypes.REMOVE_ADMIN_FAIL: return removeAdminFail( state, action );

        case actionTypes.REMOVE_FACILITATOR_START: return removeFacilitatorStart( state, action );
        case actionTypes.REMOVE_FACILITATOR_SUCCESS: return removeFacilitatorSuccess( state, action );
        case actionTypes.REMOVE_FACILITATOR_FAIL: return removeFacilitatorFail( state, action );

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
        
        

        case actionTypes.CLEAR_ALL_ADMIN_MESSAGES: return clearAllAdminMessages( state, action );

        case actionTypes.CLEAR_EDIT_SUBJECT_INFO: return clearEditSubjectInfo( state, action );

        default: return state;
    }
};



export default reducer;