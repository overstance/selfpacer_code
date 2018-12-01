import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    youtubeResources: [],
    moocResources: [],
    webResources: [],
    bookResources: [],
    loading: false,
    error: null
};

const fetchYoutubeAccountingStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchYoutubeAccountingSuccess = ( state, action ) => {
    return updateObject( state, {
        youtubeResources: action.resources,
        loading: false
    } );
};

const fetchYoutubeAccountingFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

//Reducer

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_YOUTUBE_ACCOUNTING_START: return fetchYoutubeAccountingStart( state, action );
        case actionTypes.FETCH_YOUTUBE_ACCOUNTING_SUCCESS: return fetchYoutubeAccountingSuccess( state, action );
        case actionTypes.FETCH_YOUTUBE_ACCOUNTING_FAIL: return fetchYoutubeAccountingFail( state, action );

        default: return state;
    }
};

export default reducer;