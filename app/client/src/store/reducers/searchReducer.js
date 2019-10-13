import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    deploySearchLoading: false,
    deploySearchError: null,
    deploySearchSuccessInfo: null,
    searchResult: []
}

const deploySearchStart = (state, action) => {
    return updateObject(state, {
        deploySearchLoading: true,
        deploySearchError: null,
        deploySearchSuccessInfo: null
    });
}

const deploySearchSuccess = (state, action) => {
    return updateObject(state, {
        deploySearchLoading: false,
        searchResult: action.searchResult,
        deploySearchSuccessInfo: 'search successful'
    });
}

const deploySearchFail = (state, action) => {
    return updateObject(state, {
        deploySearchLoading: false,
        deploySearchError: action.error
    });
}

const clearSearchMessages = (state, action) => {
    return updateObject(state, {
        deploySearchLoading: false,
        deploySearchError: null,
        deploySearchSuccessInfo: null,
        searchResult: []
    });
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.DEPLOY_SEARCH_START: return deploySearchStart(state, action);
        case actionTypes.DEPLOY_SEARCH_SUCCESS: return deploySearchSuccess(state, action);
        case actionTypes.DEPLOY_SEARCH_FAIL: return deploySearchFail(state, action);

        case actionTypes.CLEAR_SEARCH_MESSAGES: return clearSearchMessages(state, action);

        default: return state;
    }
}

export default reducer;