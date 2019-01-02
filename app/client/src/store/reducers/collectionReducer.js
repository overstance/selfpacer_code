import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: null,
    successMessage: null,
    resourceToCollect: {},
    userCollections: [],
    userCollectionsFetchErrors: null,
    loading: null,
    addResourceToCollectionSuccessMessage: null,
    addResourceToCollectionError: null,

    resourceAlreadyCollectedTitle: null,

    clickedCollectionAttributes: null,

    collectedResources: [],
    fetchcollectedResourceError: null,

    deleteCollectionItemError: null,

    editCollectionLoading: false,
    editCollectionSuccessInfo: null,
    editCollectionError: null
};

//Set Resource to Collect

const setToCollectResource = ( state, action ) => {
    return updateObject( state, { resourceToCollect: action.resource } );
};

const createCollectionStart = ( state, action ) => {
    return updateObject( state, { error: null, successMessage: null } );
};

const createCollectionSuccess = ( state, action ) => {
    return updateObject( state, {
        successMessage: action.message,
        error: null
    } );
};

const createCollectionFail = ( state, action ) => {
    return updateObject( state, { error: action.error } );
};

// Reset collection messages after form submit

const resetCollectionMessages = ( state, action ) => {
    return updateObject( state, { error: null, successMessage: null } );
};

// Fetch user collections

const fetchUserCollectionsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchUserCollectionsFail = ( state, action ) => {
    return updateObject( state, { userCollectionsFetchErrors: action.error, loading: false } );
};

const fetchUserCollectionsSuccess = ( state, action ) => {
    return updateObject( state, {
        userCollections: action.collections,
        userCollectionsFetchErrors: null,
        loading: false
    } );
};

// Add resource to collection

const addResourceToCollectionFail = ( state, action ) => {
    return updateObject( state, { addResourceToCollectionError: action.error } );
};

const addResourceToCollectionSuccess = ( state, action ) => {
    return updateObject( state, {
        addResourceToCollectionSuccessMessage: action.message,
    } );
};

// Resource Alraedy in collection

const resourceAlreadyAdded = ( state, action ) => {
    return updateObject( state, { resourceAlreadyCollectedTitle: action.collectionTitle} );
}

// Clear Add to Collection messages

const clearAddToCollectionMessages = ( state, action ) => {
    return updateObject( state, 
        {   addResourceToCollectionError: null, 
            addResourceToCollectionSuccessMessage: null, 
            resourceAlreadyCollectedTitle: null, 
            fetchcollectedResourceError: null, 
            // clickedCollectionAttributes: null 
        } 
    );
};

// Set clicked collection attributes

const setClickedCollectionAttributes = ( state, action ) => {
    return updateObject( state, { clickedCollectionAttributes: action.attributes});
};

// Fetch collection by id for collected resources

const fetchCollectionByIdStart = ( state, action ) => {
    return updateObject( state, { loading: true, fetchcollectedResourceError: null});
};

const fetchCollectionByIdSuccess = ( state, action ) => {
    return updateObject( state, { loading: false, collectedResources: action.resources });
};

const fetchCollectionByIdFail = ( state, action ) => {
    return updateObject( state, { loading: false, fetchcollectedResourceError: action.error});
};

const deleteCollectionItemFail = ( state, action ) => {
    return updateObject( state, { loading: false, deleteCollectionItemError: action.error});
};

// Edit collection

const editCollectionStart = ( state, action) => {
    return updateObject( state, { editCollectionLoading: true});
}

const editCollectionSuccess = ( state, action) => {
    return updateObject( state, { editCollectionLoading: false, editCollectionSuccessInfo: action.successInfo, clickedCollectionAttributes: action.attributes});
}

const editCollectionFail = ( state, action) => {
    return updateObject( state, { editCollectionLoading: false, editCollectionError: action.error });
}

// Clear edit Collection messages 

const clearEditCollectionMessages = ( state, action) => {
    return updateObject( state, { editCollectionSuccessInfo: null, editCollectionError: null });
}



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_COLLECTION_START: return createCollectionStart( state, action );
        case actionTypes.CREATE_COLLECTION_SUCCESS: return createCollectionSuccess( state, action );
        case actionTypes.CREATE_COLLECTION_FAIL: return createCollectionFail( state, action );

        case actionTypes.SET_TO_COLLECT_RESOURCE: return setToCollectResource( state, action );

        case actionTypes.RESET_COLLECTION_MESSAGES: return resetCollectionMessages( state, action );

        case actionTypes.FETCH_USER_COLLECTIONS_START: return fetchUserCollectionsStart( state, action );
        case actionTypes.FETCH_USER_COLLECTIONS_FAIL: return fetchUserCollectionsFail( state, action );
        case actionTypes.FETCH_USER_COLLECTIONS_SUCCESS: return fetchUserCollectionsSuccess( state, action );

        case actionTypes.ADD_RESOURCE_TO_COLLECTION_FAIL: return addResourceToCollectionFail( state, action );
        case actionTypes.ADD_RESOURCE_TO_COLLECTION_SUCCESS: return addResourceToCollectionSuccess( state, action );

        case actionTypes.RESOURCE_ALREADY_ADDED: return resourceAlreadyAdded( state, action );

        case actionTypes.CLEAR_ADD_TO_COLLECTION_MESSAGES: return clearAddToCollectionMessages( state, action );

        case actionTypes.SET_CLICKED_COLLECTION_ATTRIBUTES: return setClickedCollectionAttributes( state, action );

        case actionTypes.FETCH_COLLECTION_BY_ID_START: return fetchCollectionByIdStart( state, action );
        case actionTypes.FETCH_COLLECTION_BY_ID_SUCCESS: return fetchCollectionByIdSuccess( state, action );
        case actionTypes.FETCH_COLLECTION_BY_ID_FAIL: return fetchCollectionByIdFail( state, action );

        case actionTypes.DELETE_COLLECTION_ITEM_FAIL: return deleteCollectionItemFail( state, action );

        case actionTypes.EDIT_COLLECTION_START: return editCollectionStart( state, action );
        case actionTypes.EDIT_COLLECTION_SUCCESS: return editCollectionSuccess( state, action );
        case actionTypes.EDIT_COLLECTION_FAIL: return editCollectionFail( state, action );

        case actionTypes.CLEAR_EDIT_COLLECTION_MESSAGES: return clearEditCollectionMessages( state, action );

        default: return state;
    }
};

export default reducer;