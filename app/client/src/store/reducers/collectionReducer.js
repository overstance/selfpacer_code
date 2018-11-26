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
    addResourceToCollectionError: null
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

// Clear Add to Collection messages

const clearAddToCollectionMessages = ( state, action ) => {
    return updateObject( state, { addResourceToCollectionError: null, addResourceToCollectionSuccessMessage: null } );
};



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

        case actionTypes.CLEAR_ADD_TO_COLLECTION_MESSAGES: return clearAddToCollectionMessages( state, action );

        default: return state;
    }
};

export default reducer;