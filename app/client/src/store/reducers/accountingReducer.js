import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    youtubeResources: [],
    youtubeLoading: false,
    fetchYoutubeResourceError: null,

    moocResources: [],
    moocLoading: false,
    fetchMoocResourcesError: null,

    booksResources: [],
    booksLoading: false,
    fetchBooksResourcesError: null,
};

// fetch books

const fetchBooksAccountingStart = ( state, action ) => {
    return updateObject( state, { booksLoading: true } );
};

const fetchBooksAccountingSuccess = ( state, action ) => {
    return updateObject( state, {
        booksResources: action.resources,
        booksLoading: false
    } );
};

const fetchBooksAccountingFail = ( state, action ) => {
    return updateObject( state, { booksLoading: false, fetchBooksResourcesError: action.error } );
};

// fetch mooc

const fetchMoocAccountingStart = ( state, action ) => {
    return updateObject( state, { moocLoading: true } );
};

const fetchMoocAccountingSuccess = ( state, action ) => {
    return updateObject( state, {
        moocResources: action.resources,
        moocLoading: false
    } );
};

const fetchMoocAccountingFail = ( state, action ) => {
    return updateObject( state, { moocLoading: false, fetchMoocResourcesError: action.error } );
};

// fetch youtube

const fetchYoutubeAccountingStart = ( state, action ) => {
    return updateObject( state, { youtubeLoading: true } );
};

const fetchYoutubeAccountingSuccess = ( state, action ) => {
    return updateObject( state, {
        youtubeResources: action.resources,
        youtubeLoading: false
    } );
};

const fetchYoutubeAccountingFail = ( state, action ) => {
    return updateObject( state, { youtubeLoading: false, fetchYoutubeResourceError: action.error } );
};





//Reducer

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_YOUTUBE_ACCOUNTING_START: return fetchYoutubeAccountingStart( state, action );
        case actionTypes.FETCH_YOUTUBE_ACCOUNTING_SUCCESS: return fetchYoutubeAccountingSuccess( state, action );
        case actionTypes.FETCH_YOUTUBE_ACCOUNTING_FAIL: return fetchYoutubeAccountingFail( state, action );

        case actionTypes.FETCH_MOOC_ACCOUNTING_START: return fetchMoocAccountingStart( state, action );
        case actionTypes.FETCH_MOOC_ACCOUNTING_SUCCESS: return fetchMoocAccountingSuccess( state, action );
        case actionTypes.FETCH_MOOC_ACCOUNTING_FAILED: return fetchMoocAccountingFail( state, action );

        case actionTypes.FETCH_BOOKS_ACCOUNTING_START: return fetchBooksAccountingStart( state, action );
        case actionTypes.FETCH_BOOKS_ACCOUNTING_SUCCESS: return fetchBooksAccountingSuccess( state, action );
        case actionTypes.FETCH_BOOKS_ACCOUNTING_FAILED: return fetchBooksAccountingFail( state, action );

        default: return state;
    }
};

export default reducer;