import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setSelectedMenu = ( menu ) => {
    return {
        type: actionTypes.SET_SELECTED_MENU,
        menu: menu
    }

}


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

    const res = await axios.get('/api/user_collections', { params: { userId: userId }});

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

export const fetchSharedCollectionsBySpec = ( userSpec) => async dispatch => {

    dispatch(fetchSharedCollectionsStart());

    const res = await axios.get('/api/shared_collections', { params: { userSpec: userSpec }});

    if (res.data.collections) {
        // console.log(res.data.collections);
        dispatch(fetchSharedCollectionsSuccess(res.data.collections));
    } else {
        dispatch(fetchSharedCollectionsFail(res.data));
    } 

};

// fetch featured collections by spec.

export const fetchFeaturedCollectionsSuccess = ( collections ) => {
    return {
        type: actionTypes.FETCH_FEATURED_COLLECTIONS_SUCCESS,
        collections: collections
    };
};

export const fetchFeaturedCollectionsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_FEATURED_COLLECTIONS_FAIL,
        error: error
    };
};

export const fetchFeaturedCollectionsStart = () => {
    return {
        type: actionTypes.FETCH_FEATURED_COLLECTIONS_START
    };
};

export const fetchFeaturedCollectionsBySpec = ( userSpec) => async dispatch => {

    dispatch(fetchFeaturedCollectionsStart());

    const res = await axios.get('/api/featured_collections', { params: { userSpec: userSpec }});

    if (res.data.collections) {
        dispatch(fetchFeaturedCollectionsSuccess(res.data.collections));
    } else {
        dispatch(fetchFeaturedCollectionsFail(res.data));
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

                    if (resourceToAdd !== '') {
                        const res2 = await axios.post(`/api/increase_collect_count/${resourceToAdd}`);
                        if (res2.data) {
                            // console.log(res2.data);
                            return;
                        }
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

            const res2 = await axios.post('/api/increase_collect_count', {resourceToAdd: resourceToAdd});
            
            if (res2.data) {
                // console.log(res2.data);
                const res3 = await axios.post('/api/change_update_time', {collectionId: collectionId});
                
                if (res3.data) {
                    return;
                } else {
                    return;
                }
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

// clear resource to collect after collection created

export const clearResourceToCollect = ( attributes ) => {
    return {
        type: actionTypes.CLEAR_RESOURCE_TO_COLLECT
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

    const res = await axios.get('/api/fetch_collection', {params: { id: id }});

    // console.log(res.data);
    if (res.data.resources) {
        dispatch(fetchCollectionByIdSuccess(res.data.resources));
    } else {
        dispatch(fetchCollectionByIdFail(res.data));
    }
}

// fetch collection attribute on collection page reload

/* export const fetchCollectionAttributesStart = () => {
    return {
        type: actionTypes.FETCH_COLLECTION_ATTRIBUTES_START
    }
} */

export const fetchCollectionAttributesSuccess = ( attributes ) => {
    return {
        type: actionTypes.FETCH_COLLECTION_ATTRIBUTES_SUCCESS,
        attributes: attributes
    }
}

/* export const fetchCollectionAttributesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_COLLECTION_ATTRIBUTES_FAIL,
        error: error
    }
} */

export const fetchCollectionAttributes = ( id ) => async dispatch => {
    // dispatch (fetchCollectionAttributesStart());

    const res = await axios.get('/api/fetch_collection_attributes', { params: { id: id }});

    // console.log(res.data);
    if (res.data.collection) {
        // console.log(res.data.collection)
        const collection = res.data.collection;
        const attributes = {
            title: collection.title,
            lastUpdated: collection.lastUpdated,
            id: collection._id,
            description: collection.description,
            public: collection.public,
            featured: collection.featured
        }
        dispatch(fetchCollectionAttributesSuccess(attributes));
    } /* else {
        dispatch(fetchCollectionAttributesFail(res.data));
    } */
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

        const res2 = await axios.get('/api/fetch_collection', {params: { id: id }});

        if (res2.data.resources) {
            // console.log('second route successful');
            // console.log(res2.data);
            dispatch(fetchCollectionByIdSuccess(res2.data.resources));
        } else {
            dispatch(deleteCollectionItemFail(res2.data));
        }
    } else {
        return;
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

    const res = await axios.delete('/api/delete_collection', { params: {id: collectionId} });

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

// pin collection
export const pinCollectionStart = () => {
    return {
        type: actionTypes.PIN_COLLECTION_START
    }
}

export const pinCollectionFail = (error) => {
    return {
        type: actionTypes.PIN_COLLECTION_FAIL,
        error: error
    }
}

export const pinCollectionSuccess = ( collectionIds ) => {
    return {
        type: actionTypes.PIN_COLLECTION_SUCCESS,
        collectionIds: collectionIds
    }
}

export const pinCollection = (collectionId, userId, userPinnedCollections) => async dispatch => {
    dispatch(pinCollectionStart());

    let temp = userPinnedCollections;

    temp.push(collectionId);

    const updatedUserPinnedCollections = temp;

    let info = {
        userId: userId,
        userPinnedCollections: updatedUserPinnedCollections
    }

    const res = await axios.post('/api/pin_collection', info);

    if (res.data._id === userId) {
        dispatch(pinCollectionSuccess(res.data.pinnedCollections));
    } else {
        dispatch(pinCollectionFail(res.data));
    }
}

// unpinCollection

export const unpinCollection = (collectionId, userId, userPinnedCollections) => async dispatch => {

    dispatch(pinCollectionStart());
    /* let temp = userPinnedCollections;

    temp.push(collectionId); */

    const updatedUserPinnedCollections = userPinnedCollections.filter(collection => collection !== collectionId);

    let info = {
        userId: userId,
        userPinnedCollections: updatedUserPinnedCollections
    }

    const res = await axios.post('/api/unpin_collection', info);

    if (res.data._id === userId) {
        dispatch(pinCollectionSuccess(res.data.pinnedCollections));
    } else {
        dispatch(pinCollectionFail(res.data));
    }
}

// clear pin collection messages before showing dialogue

export const clearPinCollectionMessages = () => {
    return {
        type: actionTypes.CLEAR_PIN_COLLECTION_MESSAGES
    }
}


// feature Collection by admin

export const featureCollection = ( collectionId ) => async dispatch => {

    // console.log('front featured route reached');

    const res = await axios.put('/api/feature_collection', {collectionId: collectionId});

    if (res.data.collection) {
        // console.log(res.data.collection)
        const collection = res.data.collection;
        const attributes = {
            title: collection.title,
            lastUpdated: collection.lastUpdated,
            id: collection._id,
            description: collection.description,
            public: collection.public,
            featured: collection.featured
        }
        dispatch(fetchCollectionAttributesSuccess(attributes));
    } 
}

// unfeature collection

export const unfeatureCollection = ( collectionId ) => async dispatch => {

    // console.log('front featured route reached');

    const res = await axios.put('/api/unfeature_collection', { collectionId: collectionId });

    if (res.data.collection) {
        // console.log(res.data.collection)
        const collection = res.data.collection;
        const attributes = {
            title: collection.title,
            lastUpdated: collection.lastUpdated,
            id: collection._id,
            description: collection.description,
            public: collection.public,
            featured: collection.featured
        }
        dispatch(fetchCollectionAttributesSuccess(attributes));
    } 
}

// fetch User Pinned Collections

export const fetchUserPinnedCollectionsStart = () => {
    return {
        type: actionTypes.FETCH_USER_PINNED_COLLECTION_START
    }
}

export const fetchUserPinnedCollectionsSuccess = (pinnedCollections) => {
    return {
        type: actionTypes.FETCH_USER_PINNED_COLLECTION_SUCCESS,
        pinnedCollections: pinnedCollections
    }
}

export const fetchUserPinnedCollectionsFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_PINNED_COLLECTION_FAIL,
        error: error
    }
}

export const fetchUserPinnedCollections = (userId) => async dispatch => {

    dispatch(fetchUserPinnedCollectionsStart());

    const res = await axios.get('/api/fetch_user_pinned_collections', { params: { userId: userId}});

    if (res.data.collections) {
        dispatch(fetchUserPinnedCollectionsSuccess(res.data.collections));
    } else {
        dispatch(fetchUserPinnedCollectionsFail(res.data));
    }
}







