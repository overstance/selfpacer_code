import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setToCollectResource = ( resourceId, image, title ) => {
    return {
        type: actionTypes.SET_TO_COLLECT_RESOURCE,
        resource: {
            id: resourceId,
            title: title,
            img: image
        }
    };
};

// fetch user Collections

export const fetchUserCollectionsSuccess = ( collections ) => {
    return {
        type: actionTypes.FETCH_USER_COLLECTIONS_SUCCESS,
        collections: collections
    };
};

export const fetchUserCollectionsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_USER_COLLECTIONS_FAIL,
        error: error
    };
};

export const fetchUserCollectionsStart = () => {
    return {
        type: actionTypes.FETCH_USER_COLLECTIONS_START
    };
};

export const fetchUserCollections = ( userId ) => async dispatch => {

    dispatch(fetchUserCollectionsStart());

    const res = await axios.get(`/api/collections/${userId}`);

    if (res.data.collections) {
        dispatch(fetchUserCollectionsSuccess(res.data.collections));
    } else {
        dispatch(fetchUserCollectionsFail(res.data));
    } 

};

// fetch shared collections

export const fetchSharedCollectionsSuccess = ( collections ) => {
    return {
        type: actionTypes.FETCH_SHARED_COLLECTIONS_SUCCESS,
        collections: collections
    };
};

export const fetchSharedCollectionsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_SHARED_COLLECTIONS_FAIL,
        error: error
    };
};

export const fetchSharedCollectionsStart = () => {
    return {
        type: actionTypes.FETCH_SHARED_COLLECTIONS_START
    };
};

export const fetchSharedCollections = () => async dispatch => {

    dispatch(fetchSharedCollectionsStart());

    const res = await axios.get('/api/shared_collections');

    if (res.data.collections) {
        console.log(res.data.collections);
        dispatch(fetchSharedCollectionsSuccess(res.data.collections));
    } else {
        dispatch(fetchSharedCollectionsFail(res.data));
    } 

};

// Create new Collection

export const createCollectionSuccess = ( message ) => {
    return {
        type: actionTypes.CREATE_COLLECTION_SUCCESS,
        message: message
    };
};

export const createCollectionFail = ( error ) => {
    return {
        type: actionTypes.CREATE_COLLECTION_FAIL,
        error: error
    };
};

export const createCollectionStart = () => {
    return {
        type: actionTypes.CREATE_COLLECTION_START
    };
};

export const createCollection = ( title, user, resourceToAdd ) => async dispatch => {

        dispatch(createCollectionStart());

        const collection = {
            title: title,
            resourceId: resourceToAdd,
            userId: user._id
        }

        const res = await axios.post( '/api/create_collection', collection)

                if (res.data === 'Collection created!') {
                    dispatch(createCollectionSuccess(res.data));

                    const res2 = await axios.post(`/api/increase_collect_count/${resourceToAdd}`);
                    if (res2.data) {
                        // console.log(res2.data);
                        return;
                    }
                } else {
                    dispatch(createCollectionFail(res.data));
                } 


};

// Reset Collection form feedBack Messages

export const resetCollectionMessages = () => {
    return {
        type: actionTypes.RESET_COLLECTION_MESSAGES
    };
};

// Add resource to collection

export const addResourceToCollectionSuccess = ( message ) => {
    return {
        type: actionTypes.ADD_RESOURCE_TO_COLLECTION_SUCCESS,
        message: message
    };
};

export const addResourceToCollectionFail = ( error ) => {
    return {
        type: actionTypes.ADD_RESOURCE_TO_COLLECTION_FAIL,
        error: error
    };
};

/* export const addResourceToCollectionStart = () => {
    return {
        type: actionTypes.ADD_RESOURCE_TO_COLLECTION_START
    };
}; */

export const addResourceToCollection = ( collectionId, collectionResources, resourceToAdd ) => async dispatch => {

    const temp = collectionResources;

    temp.push(resourceToAdd);

    const updatedCollectionResources = temp;

    const collectionInfo = {
        updatedCollectionResources: updatedCollectionResources,
        collectionId: collectionId
    }

    const res = await axios.post( '/api/add_resource_to_collection', collectionInfo);

        if (res.data === 'Resource Collected!') {
            dispatch(addResourceToCollectionSuccess(res.data));

            const res2 = await axios.post(`/api/increase_collect_count/${resourceToAdd}`);
            if (res2.data) {
                // console.log(res2.data);
                return;
            }
        } else {
            dispatch(addResourceToCollectionFail(res.data));
        } 
};

// resource already contained(added) to/in collection

export const resourceAlreadyAdded = ( collectionTitle ) => {
    return {
        type: actionTypes.RESOURCE_ALREADY_ADDED,
        collectionTitle: collectionTitle
    }
} 

// clear add to collection messages

export const clearAddToCollectionMessages = () => {
    return {
        type: actionTypes.CLEAR_ADD_TO_COLLECTION_MESSAGES
    };
};

// set clicked collection attributes( title and date)

export const setClickedCollectionAttributes = ( attributes ) => {
    return {
        type: actionTypes.SET_CLICKED_COLLECTION_ATTRIBUTES,
        attributes: attributes
    }
}

// fetch collection Resources by Id

export const fetchCollectionByIdStart = () => {
    return {
        type: actionTypes.FETCH_COLLECTION_BY_ID_START
    }
}

export const fetchCollectionByIdSuccess = ( resources ) => {
    return {
        type: actionTypes.FETCH_COLLECTION_BY_ID_SUCCESS,
        resources: resources
    }
}

export const fetchCollectionByIdFail = ( error ) => {
    return {
        type: actionTypes.FETCH_COLLECTION_BY_ID_FAIL,
        error: error
    }
}

export const fetchCollectionById = ( id ) => async dispatch => {
    dispatch (fetchCollectionByIdStart());

    const res = await axios.get(`/api/fetch_collection/${id}`);

    // console.log(res.data);
    if (res.data.resources) {
        dispatch(fetchCollectionByIdSuccess(res.data.resources));
    } else {
        dispatch(fetchCollectionByIdFail(res.data));
    }
}

// Delete a collection Item

/* export const deleteCollectionItemStart = () => {
    return {
        type: actionTypes.DELETE_COLLECTION_ITEM_START
    }
} */

/* export const deleteCollectionItemSuccess = () => {
    return {
        type: actionTypes.DELETE_COLLECTION_ITEM_SUCCESS
    }
}
 */

export const deleteCollectionItemFail = ( error ) => {
    return {
        type: actionTypes.DELETE_COLLECTION_ITEM_FAIL,
        error: error
    }
}

export const deleteCollectionItem = ( resourceId, collectionId, history) => async dispatch => {
    // dispatch(deleteCollectionItemStart());

    const info = {
        resourceId: resourceId,
        collectionId: collectionId
    }

    const res = await axios.post('/api/delete_collection_item', info); 

    if ( res.data.collection._id === collectionId ) {
        dispatch(fetchCollectionByIdStart());
        // console.log('second route starts');
        const id = collectionId;

        const res2 = await axios.get(`/api/fetch_collection/${id}`);

        if (res2.data.resources) {
            // console.log('second route successful');
            // console.log(res2.data);
            dispatch(fetchCollectionByIdSuccess(res2.data.resources));
        } else {
            dispatch(deleteCollectionItemFail(res2.data));
        }
    } 
}

// Edit Collection

export const editCollectionStart = () => {
    return {
        type: actionTypes.EDIT_COLLECTION_START
    }
}

export const editCollectionSuccess = (successInfo, attributes) => {
    return {
        type: actionTypes.EDIT_COLLECTION_SUCCESS,
        successInfo: successInfo,
        attributes: attributes
    }
}

export const editCollectionFail = ( error ) => {
    return {
        type: actionTypes.EDIT_COLLECTION_FAIL,
        error: error
    }
}

export const editCollection = ( title, description, collectionId) => async dispatch => {
    dispatch(editCollectionStart());

    // let checkedDescription = description;

    /* if ( description === '') {
        checkedDescription = undefined;
    } */

    const info = {
        title: title,
        description: description,
        id: collectionId
    }

    // console.log(info);

    const res = await axios.post('/api/edit_collection', info);

    if (res.data.collection._id === collectionId ) {

        const attributes = {
            title: res.data.collection.title,
            id: res.data.collection._id,
            description: res.data.collection.description,
            public: res.data.collection.public
        }
        
        dispatch(editCollectionSuccess('edit successful', attributes));
    } else {
        dispatch(editCollectionFail(res.data));
    }
}

// Clear Edit Collection messages 

export const clearEditCollectionMessages = () => {
    return {
        type: actionTypes.CLEAR_EDIT_COLLECTION_MESSAGES
    }
}

// publish Collection

export const publishCollectionStart = () => {
    return {
        type: actionTypes.PUBLISH_COLLECTION_START
    }
}

export const publishCollectionSuccess = ( successInfo, attributes ) => {
    return {
        type: actionTypes.PUBLISH_COLLECTION_SUCCESS,
        successInfo: successInfo,
        attributes: attributes
    }
}

export const publishCollectionFail = ( error ) => {
    return {
        type: actionTypes.PUBLISH_COLLECTION_FAIL,
        error: error
    }
}

export const publishCollection = ( collectionId, description ) => async dispatch => {
    dispatch(publishCollectionStart());

    const info = {
        id: collectionId,
        description: description
    }

    const res = await axios.post('/api/publish_collection', info);

    if ( res.data.collection._id === collectionId ) {
        // console.log(res.data.collection);

        const attributes = {
            title: res.data.collection.title,
            id: res.data.collection._id,
            description: res.data.collection.description,
            public: res.data.collection.public
        }

        dispatch(publishCollectionSuccess('Collection Published', attributes));
    } else {
        dispatch(publishCollectionFail(res.data));
    }
}

// unpublish collection

export const unpublishCollection = ( collectionId ) => async dispatch => {
    dispatch(publishCollectionStart());

    const info = {
        id: collectionId
    }

    const res = await axios.post('/api/unpublish_collection', info);

    if ( res.data.collection._id === collectionId ) {
        // console.log(res.data.collection);

        const attributes = {
            title: res.data.collection.title,
            id: res.data.collection._id,
            description: res.data.collection.description,
            public: res.data.collection.public
        }

        dispatch(publishCollectionSuccess('collection unpublished', attributes));
    } else {
        dispatch(publishCollectionFail(res.data));
    }
}


// clear publish collection messages

export const clearPublishCollectionMessages = () => {
    return {
        type: actionTypes.CLEAR_PUBLISH_COLLECTION_MESSAGES
    }
}

// delete collection

export const deleteCollectionStart = () => {
    return {
        type: actionTypes.DELETE_COLLECTION_START
    }
}

export const deleteCollectionSuccess = ( successInfo ) => {
    return {
        type: actionTypes.DELETE_COLLECTION_SUCCESS,
        successInfo: successInfo
    }
}

export const deleteCollectionFail = ( error ) => {
    return {
        type: actionTypes.DELETE_COLLECTION_FAIL,
        error: error
    }
}

export const deleteCollection = ( collectionId ) => async dispatch => {
    dispatch(deleteCollectionStart());

    const info = {
        id: collectionId
    }

    const res = await axios.post('/api/delete_collection', info);

    if ( res.data.collection._id === collectionId ) {
        // console.log(res.data.collection);

        dispatch(deleteCollectionSuccess('collection deleted'));
    } else {
        dispatch(deleteCollectionFail(res.data));
    }
}

// clear delete collection messages

export const clearDeleteCollectionMessages = () => {
    return {
        type: actionTypes.CLEAR_DELETE_COLLECTION_MESSAGES
    }
}





