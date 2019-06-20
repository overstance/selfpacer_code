import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    activeMenu: 'mine',
    error: null,
    successMessage: null,
    resourceToCollect: { id: ''},

    userCollections: [],
    userCollectionsFetchErrors: null,
    loading: null,

    sharedCollections: [],
    sharedCollectionsFetchErrors: null,
    sharedCollectionsLoading: null,

    addResourceToCollectionSuccessMessage: null,
    addResourceToCollectionError: null,

    resourceAlreadyCollectedTitle: null,

    clickedCollectionAttributes: {id: ''},

    collectedResources: [],
    fetchcollectedResourceError: null,

    deleteCollectionItemError: null,

    editCollectionLoading: false,
    editCollectionSuccessInfo: null,
    editCollectionError: null,

    publishCollectionLoading: false,
    publishCollectionSuccessInfo: null,
    publishCollectionError: null,

    deleteCollectionLoading: false,
    deleteCollectionSuccessInfo: null,
    deleteCollectionError: null,

    pinnedCollectionIds: [],

    pinCollectionLoading: false,
    pinCollectionSuccessInfo: null,
    pinCollectionError: null,

    featureCollectionLoading: false,
    featureCollectionSuccessinfo: null,
    featureCollectionError: null,

    fetchUserPinnedCollectionsLoading: false,
    fetchUserPinnedCollectionsError: null,
    userPinnedCollections: []
};

// set active or selected menu

const setSelectedMenu = ( state, action ) => {
    return updateObject( state, { activeMenu: action.menu } );
}

//Set Resource to Collect

const setToCollectResource = ( state, action ) => {
    return updateObject( state, { resourceToCollect: action.resource } );
};

// create collection

const createCollectionStart = ( state, action ) => {
    return updateObject( state, { error: null, successMessage: null, loading: true } );
};

const createCollectionSuccess = ( state, action ) => {
    return updateObject( state, {
        successMessage: action.message,
        error: null,
        loading: false
    } );
};

const createCollectionFail = ( state, action ) => {
    return updateObject( state, { error: action.error, loading: false } );
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

// Fetch user collections

const fetchSharedCollectionsStart = ( state, action ) => {
    return updateObject( state, { sharedCollectionsLoading: true } );
};

const fetchSharedCollectionsFail = ( state, action ) => {
    return updateObject( state, { sharedCollectionsFetchErrors: action.error, sharedCollectionsLoading: false } );
};

const fetchSharedCollectionsSuccess = ( state, action ) => {
    return updateObject( state, {
        sharedCollections: action.collections,
        sharedCollectionsFetchErrors: null,
        sharedCollectionsLoading: false
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
            fetchUserPinnedCollectionsError: null,
            userCollectionsFetchErrors: null,
            sharedCollectionsFetchErrors: null
            // clickedCollectionAttributes: null 
        } 
    );
};

// clear resource to add on collection create success

const clearResourceToCollect = ( state, action ) => {
    return updateObject( state, { resourceToCollect: { id: ''} });
};

// Set clicked collection attributes

const setClickedCollectionAttributes = ( state, action ) => {
    return updateObject( state, { clickedCollectionAttributes: action.attributes});
};

const setCollectionAttributeOnReload = ( state, action ) => {
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

// publish collection

const publishCollectionStart = ( state, action) => {
    return updateObject( state, { publishCollectionLoading: true});
}

const publishCollectionSuccess = ( state, action) => {
    return updateObject( state, { publishCollectionLoading: false, publishCollectionSuccessInfo: action.successInfo, clickedCollectionAttributes: action.attributes});
}

const publishCollectionFail = ( state, action) => {
    return updateObject( state, { publishCollectionLoading: false, publishCollectionError: action.error });
}

// Clear publish Collection messages 

const clearPublishCollectionMessages = ( state, action) => {
    return updateObject( state, { publishCollectionSuccessInfo: null, publishCollectionError: null });
}

// delete collection

const deleteCollectionStart = ( state, action) => {
    return updateObject( state, { deleteCollectionLoading: true});
}

const deleteCollectionSuccess = ( state, action) => {
    return updateObject( state, { deleteCollectionLoading: false, deleteCollectionSuccessInfo: action.successInfo});
}

const deleteCollectionFail = ( state, action) => {
    return updateObject( state, { deleteCollectionLoading: false, deleteCollectionError: action.error });
}

// Clear delete Collection messages 

const clearDeleteCollectionMessages = ( state, action) => {
    return updateObject( state, { deleteCollectionSuccessInfo: null, deleteCollectionError: null });
}

// 

const setPinnedCollections = ( state, action) => {
    return updateObject( state, { pinnedCollectionIds: action.collectionIds });
}

// Pin or unpin collection

const pinCollectionStart = ( state, action) => {
    return updateObject( state, { pinCollectionLoading: true });
}

const pinCollectionFail = ( state, action) => {
    return updateObject( state, 
        {   pinCollectionLoading: false,
            pinCollectionError: action.error
        });
}

const pinCollectionSuccess = ( state, action) => {
    return updateObject( state, 
        {   pinCollectionLoading: false, 
            pinnedCollectionIds: action.collectionIds,
            pinCollectionSuccessInfo: 'success' 
        });
}

const clearPinCollectionMessages = ( state, action) => {
    return updateObject( state, 
        { 
            pinCollectionError: null,
            pinCollectionSuccessInfo: null 
        });
}

// fetch user pinned collections

const fetchUserPinnedCollectionsStart = ( state, action) => {
    return updateObject( state, { fetchUserPinnedCollectionsLoading: true});
}

const fetchUserPinnedCollectionsSuccess = ( state, action) => {
    return updateObject( state, { fetchUserPinnedCollectionsLoading: false, userPinnedCollections: action.pinnedCollections});
}

const fetchUserPinnedCollectionsFail = ( state, action) => {
    return updateObject( state, { fetchUserPinnedCollectionsLoading: false, fetchUserPinnedCollectionsError: action.error });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_SELECTED_MENU: return setSelectedMenu( state, action );
        
        case actionTypes.CREATE_COLLECTION_START: return createCollectionStart( state, action );
        case actionTypes.CREATE_COLLECTION_SUCCESS: return createCollectionSuccess( state, action );
        case actionTypes.CREATE_COLLECTION_FAIL: return createCollectionFail( state, action );

        case actionTypes.SET_TO_COLLECT_RESOURCE: return setToCollectResource( state, action );

        case actionTypes.RESET_COLLECTION_MESSAGES: return resetCollectionMessages( state, action );

        case actionTypes.FETCH_USER_COLLECTIONS_START: return fetchUserCollectionsStart( state, action );
        case actionTypes.FETCH_USER_COLLECTIONS_FAIL: return fetchUserCollectionsFail( state, action );
        case actionTypes.FETCH_USER_COLLECTIONS_SUCCESS: return fetchUserCollectionsSuccess( state, action );

        case actionTypes.FETCH_SHARED_COLLECTIONS_START: return fetchSharedCollectionsStart( state, action );
        case actionTypes.FETCH_SHARED_COLLECTIONS_FAIL: return fetchSharedCollectionsFail( state, action );
        case actionTypes.FETCH_SHARED_COLLECTIONS_SUCCESS: return fetchSharedCollectionsSuccess( state, action );

        case actionTypes.ADD_RESOURCE_TO_COLLECTION_FAIL: return addResourceToCollectionFail( state, action );
        case actionTypes.ADD_RESOURCE_TO_COLLECTION_SUCCESS: return addResourceToCollectionSuccess( state, action );

        case actionTypes.RESOURCE_ALREADY_ADDED: return resourceAlreadyAdded( state, action );

        case actionTypes.CLEAR_ADD_TO_COLLECTION_MESSAGES: return clearAddToCollectionMessages( state, action );

        case actionTypes.CLEAR_RESOURCE_TO_COLLECT: return clearResourceToCollect( state, action);

        case actionTypes.SET_CLICKED_COLLECTION_ATTRIBUTES: return setClickedCollectionAttributes( state, action );

        case actionTypes.FETCH_COLLECTION_BY_ID_START: return fetchCollectionByIdStart( state, action );
        case actionTypes.FETCH_COLLECTION_BY_ID_SUCCESS: return fetchCollectionByIdSuccess( state, action );
        case actionTypes.FETCH_COLLECTION_BY_ID_FAIL: return fetchCollectionByIdFail( state, action );

        case actionTypes.FETCH_COLLECTION_ATTRIBUTES_SUCCESS: return setCollectionAttributeOnReload( state, action );

        case actionTypes.DELETE_COLLECTION_ITEM_FAIL: return deleteCollectionItemFail( state, action );

        case actionTypes.EDIT_COLLECTION_START: return editCollectionStart( state, action );
        case actionTypes.EDIT_COLLECTION_SUCCESS: return editCollectionSuccess( state, action );
        case actionTypes.EDIT_COLLECTION_FAIL: return editCollectionFail( state, action );

        case actionTypes.CLEAR_EDIT_COLLECTION_MESSAGES: return clearEditCollectionMessages( state, action );

        case actionTypes.PUBLISH_COLLECTION_START: return publishCollectionStart( state, action );
        case actionTypes.PUBLISH_COLLECTION_SUCCESS: return publishCollectionSuccess( state, action );
        case actionTypes.PUBLISH_COLLECTION_FAIL: return publishCollectionFail( state, action );

        case actionTypes.CLEAR_PUBLISH_COLLECTION_MESSAGES: return clearPublishCollectionMessages( state, action );

        case actionTypes.DELETE_COLLECTION_START: return deleteCollectionStart( state, action );
        case actionTypes.DELETE_COLLECTION_SUCCESS: return deleteCollectionSuccess( state, action );
        case actionTypes.DELETE_COLLECTION_FAIL: return deleteCollectionFail( state, action );

        case actionTypes.CLEAR_DELETE_COLLECTION_MESSAGES: return clearDeleteCollectionMessages( state, action );

        case actionTypes.SET_USER_PINNED_COLLECTION: return setPinnedCollections( state, action );

        case actionTypes.PIN_COLLECTION_START: return pinCollectionStart( state, action );
        case actionTypes.PIN_COLLECTION_FAIL: return pinCollectionFail( state, action );
        case actionTypes.PIN_COLLECTION_SUCCESS: return pinCollectionSuccess( state, action );
        case actionTypes.CLEAR_PIN_COLLECTION_MESSAGES: return clearPinCollectionMessages( state, action );

        case actionTypes.FETCH_USER_PINNED_COLLECTION_START: return fetchUserPinnedCollectionsStart( state, action );
        case actionTypes.FETCH_USER_PINNED_COLLECTION_SUCCESS: return fetchUserPinnedCollectionsSuccess( state, action );
        case actionTypes.FETCH_USER_PINNED_COLLECTION_FAIL: return fetchUserPinnedCollectionsFail( state, action );

        default: return state;
    }
};

export default reducer;