import * as actionTypes from './actionTypes';
import axios from 'axios';


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


export const fetchYoutubeAccounting = () => {
    return dispatch => {
        dispatch(fetchYoutubeAccountingStart());

        axios.get( '/api/yaccounting_res')
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