import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    deploySearchLoading: false,
    deploySearchError: null,
    deploySearchSuccessInfo: null,
    latestSearchString: '',
    searchResult: [],

    deployBlogSearchLoading: false,
    deployBlogSearchError: null,
    deployBlogSearchSuccessInfo: null,
    latestBlogSearchString: '',
    blogSearchResult: []
}

const deploySearchStart = (state, action) => {
    return updateObject(state, {
        deploySearchLoading: true,
        deploySearchError: null,
        deploySearchSuccessInfo: null,
        latestSearchString: action.searchString
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

const deployBlogSearchStart = (state, action) => {
    return updateObject(state, {
        deployBlogSearchLoading: true,
        deployBlogSearchError: null,
        deployBlogSearchSuccessInfo: null,
        latestBlogSearchString: action.searchString
    });
}

const deployBlogSearchSuccess = (state, action) => {
    return updateObject(state, {
        deployBlogSearchLoading: false,
        blogSearchResult: action.searchResult,
        deployBlogSearchSuccessInfo: 'search successful'
    });
}

const deployBlogSearchFail = (state, action) => {
    return updateObject(state, {
        deployBlogSearchLoading: false,
        deployBlogSearchError: action.error
    });
}

const clearSearchMessages = (state, action) => {
    return updateObject(state, {
        deploySearchLoading: false,
        deploySearchError: null,
        deployBlogSearchLoading: false,
        deployBlogSearchError: null
        // deploySearchSuccessInfo: null,
        // searchResult: []
    });
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.DEPLOY_SEARCH_START: return deploySearchStart(state, action);
        case actionTypes.DEPLOY_SEARCH_SUCCESS: return deploySearchSuccess(state, action);
        case actionTypes.DEPLOY_SEARCH_FAIL: return deploySearchFail(state, action);

        case actionTypes.DEPLOY_BLOG_SEARCH_START: return deployBlogSearchStart(state, action);
        case actionTypes.DEPLOY_BLOG_SEARCH_SUCCESS: return deployBlogSearchSuccess(state, action);
        case actionTypes.DEPLOY_BLOG_SEARCH_FAIL: return deployBlogSearchFail(state, action);

        case actionTypes.CLEAR_SEARCH_MESSAGES: return clearSearchMessages(state, action);

        default: return state;
    }
}

export default reducer;