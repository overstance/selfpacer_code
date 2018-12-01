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

        /* const resource = {
            resourceId: resourceId
        } */
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

export const createCollection = ( title, user, resource ) => {
    return dispatch => {
        dispatch(createCollectionStart());

        const collection = {
            title: title,
            resourceId: resource,
            userId: user._id
        }

        // console.log(resourceTrimmed);

        axios.post( '/api/create_collection', collection)
            .then(                
                res => {
                const message = res.data;
                if (res.data === 'Collection created!') {
                    dispatch(createCollectionSuccess(message));
                } else {
                    dispatch(createCollectionFail(res.data));
                } 
            } )
            .catch( err => {
                dispatch(createCollectionFail(err));
            } );
    };
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

export const addResourceToCollection = ( collectionId, collectionResources, resourceToAdd ) => {
    return dispatch => {
        // dispatch(addResourceToCollectionStart());

        const temp = collectionResources;

        temp.push(resourceToAdd);

        const updatedCollectionResources = temp;

        const collectionInfo = {
            updatedCollectionResources: updatedCollectionResources,
            collectionId: collectionId
        }

        axios.post( '/api/add_resource_to_collection', collectionInfo)
            .then(                
                res => {
                // console.log(res.data);
                if (res.data === 'Resource Collected!') {
                    dispatch(addResourceToCollectionSuccess(res.data));
                } else {
                    dispatch(addResourceToCollectionFail(res.data));
                } 
            } )
            .catch( err => {
                dispatch(addResourceToCollectionFail(err));
            } );
    };
};

// clear add to collection messages

export const clearAddToCollectionMessages = () => {
    return {
        type: actionTypes.CLEAR_ADD_TO_COLLECTION_MESSAGES
    };
};





