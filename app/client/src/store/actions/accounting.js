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

                function shuffleArray(array) {
                    let i = array.length - 1;
                    for (; i > 0; i--) {
                      const j = Math.floor(Math.random() * (i + 1));
                      const temp = array[i];
                      array[i] = array[j];
                      array[j] = temp;
                    }
                    return array;
                } 

                const youtubeShuffled = shuffleArray(youtubeAccounting);
                dispatch(fetchYoutubeAccountingSuccess(youtubeShuffled));
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

