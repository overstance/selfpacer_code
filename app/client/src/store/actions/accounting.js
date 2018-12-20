import * as actionTypes from './actionTypes';
import axios from 'axios';

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

// Fetch youtube accounting

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

export const fetchYoutubeAccounting = () => async dispatch => {
   
    dispatch(fetchYoutubeAccountingStart());

    const res = await axios.get( '/api/youtube_accounting');

    if (res.data.youtubeAccounting) {
        const youtubeAccounting = [...res.data.youtubeAccounting];

        const youtubeShuffled = shuffleArray(youtubeAccounting);
        dispatch(fetchYoutubeAccountingSuccess(youtubeShuffled));
    } else {
        dispatch(fetchYoutubeAccountingFail(res.data)); 
    }
};

// Fetch mooc accounting resources

export const fetchMoocAccountingStart = () => {
    return {
        type: actionTypes.FETCH_MOOC_ACCOUNTING_START
    }
}

export const fetchMoocAccountingSuccess = ( resources ) => {
    return {
        type: actionTypes.FETCH_MOOC_ACCOUNTING_SUCCESS,
        resources: resources 
    }
}

export const fetchMoocAccountingFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_MOOC_ACCOUNTING_FAILED,
        error: error 
    }
}

export const fetchMoocAccounting = () => async dispatch => {
    dispatch(fetchMoocAccountingStart());

    const res = await axios.get('/api/mooc_accounting');

    if (res.data.moocAccounting) {
        const moocAccounting = [...res.data.moocAccounting];

        const moocShuffled = shuffleArray(moocAccounting);

        dispatch(fetchMoocAccountingSuccess(moocShuffled));
    } else dispatch(fetchMoocAccountingFailed(res.data));
}

// Fetch books accounting resources

export const fetchBooksAccountingStart = () => {
    return {
        type: actionTypes.FETCH_BOOKS_ACCOUNTING_START
    }
}

export const fetchBooksAccountingSuccess = ( resources ) => {
    return {
        type: actionTypes.FETCH_BOOKS_ACCOUNTING_SUCCESS,
        resources: resources 
    }
}

export const fetchBooksAccountingFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_BOOKS_ACCOUNTING_FAILED,
        error: error 
    }
}

export const fetchBooksAccounting = () => async dispatch => {
    dispatch(fetchBooksAccountingStart());

    const res = await axios.get('/api/books_accounting');

    if (res.data.booksAccounting) {
        const booksAccounting = [...res.data.booksAccounting];

        const booksShuffled = shuffleArray(booksAccounting);

        dispatch(fetchBooksAccountingSuccess(booksShuffled));
    } else dispatch(fetchBooksAccountingFailed(res.data));
}



