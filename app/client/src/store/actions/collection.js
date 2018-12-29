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

export const fetchUserCollections = ( userId ) => {
    return dispatch => {
        dispatch(fetchUserCollectionsStart());

        axios.get(`/api/collections/${userId}`)
            .then(                
                res => {
                if (res.data.collections) {
                    dispatch(fetchUserCollectionsSuccess(res.data.collections));
                } else {
                    dispatch(fetchUserCollectionsFail(res.data));
                } 
            } )
            .catch( err => {
                dispatch(fetchUserCollectionsFail(err));
            } );
    };
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
                        console.log(res2.data);
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
                console.log(res2.data);
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

    console.log(res.data);
    if (res.data.resources) {
        dispatch(fetchCollectionByIdSuccess(res.data.resources));
    } else {
        dispatch(fetchCollectionByIdFail(res.data));
    }
}





