import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addResourceSuccess = ( message ) => {
    return {
        type: actionTypes.ADD_RESOURCE_SUCCESS,
        message: message
    };
};

export const addResourceFail = ( error ) => {
    return {
        type: actionTypes.ADD_RESOURCE_FAIL,
        error: error
    };
};

export const addResourceStart = () => {
    return {
        type: actionTypes.ADD_RESOURCE_START
    };
};

export const addResource = ( link, subject, type, user, history ) => {
    return dispatch => {
        dispatch(addResourceStart());

        const resource = {
            subject: subject,
            link: link,
            type: type,
            userId: user._id
        }

        axios.post( '/api/add_resources', resource)
            .then(                
                res => {
                const message = res.data;
                if (res.data === 'Resource submitted!!') {
                    dispatch(addResourceSuccess(message));
                } else {
                    dispatch(addResourceFail(res.data));
                } 
                console.log(message);
            } )
            .catch( err => {
                dispatch(addResourceFail(err));
            } );
    };
};