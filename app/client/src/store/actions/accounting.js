import * as actionTypes from './actionTypes';
import axios from 'axios';

// Fetch youtube accounting

export const fetchYoutubeAccounting = () => {
    return dispatch => {
        dispatch(fetchYoutubeAccountingStart());

        axios.get( '/api/youtube_accounting')
            .then(                
                res => {
                const youtubeAccounting = [...res.data.accountingRes];
                dispatch(fetchYoutubeAccountingSuccess(youtubeAccounting));
            } )
            .catch( err => {
                dispatch(fetchYoutubeAccountingFail(err));
            } );
    };
};

export const fetchYoutubeAccountingSuccess = ( resources ) => {
    return {
        type: actionTypes.FETCH_YOUTUBE_ACCOUNTING_SUCCESS,
        resources: resources
    };
};

export const fetchYoutubeAccountingFail = ( error ) => {
    return {
        type: actionTypes.FETCH_YOUTUBE_ACCOUNTING_FAIL,
        error: error
    };
};

export const fetchYoutubeAccountingStart = () => {
    return {
        type: actionTypes.FETCH_YOUTUBE_ACCOUNTING_START
    };
};

// set Clicked Platform

export const setClickedPlatform = ( platform ) => {
    return {
        type: actionTypes.SET_CLICKED_PLATFORM,
        platform: platform
    };
};

// Fetch Clicked Resource Info

export const fetchResourceById = ( id, platform ) => {
    return dispatch => {
        dispatch(fetchResourceByIdStart());

        console.log(id, platform);

        if (platform === 'youtube#video' || 'youtube#playlist') {
            axios.get(`/api/youtube_accounting/${id}`)
            .then(  
                // res => {console.log(res.data);}              
                res => {
                // const youtubeAccounting = [...res.data.accountingRes];
                if (res.data.resource) {
                    dispatch(fetchResourceByIdSuccess(res.data.resource));
                } else {
                    dispatch(fetchResourceByIdFail(res.data));
                };     
            } )
            .catch( err => {
                dispatch(fetchResourceByIdFail(err));
            } );

        }
    };
};

export const fetchResourceByIdStart = () => {
    return {
        type: actionTypes.FETCH_RESOURCE_BY_ID_START
    };
};

export const fetchResourceByIdSuccess = ( resource ) => {
    return {
        type: actionTypes.FETCH_RESOURCE_BY_ID_SUCCESS,
        resource: resource
    };
};

export const fetchResourceByIdFail = ( error ) => {
    return {
        type: actionTypes.FETCH_RESOURCE_BY_ID_FAIL,
        error: error
    };
};

