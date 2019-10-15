import axios from 'axios';
import * as actionTypes from './actionTypes';

export const deploySearchStart = (searchString) => {
    return {
        type: actionTypes.DEPLOY_SEARCH_START,
        searchString: searchString
    }
}

export const deploySearchSuccess = (searchResult) => {
    return {
        type: actionTypes.DEPLOY_SEARCH_SUCCESS,
        searchResult: searchResult
    }
}

export const deploySearchFail = (error) => {
    return {
        type: actionTypes.DEPLOY_SEARCH_FAIL,
        error: error
    }
}

export const deploySearch = (searchString, searchFilter) => async dispatch => {
    dispatch(deploySearchStart(searchString));
    // console.log(searchString, searchFilter)
    const res = await axios.get('/api/deploy_search', {params: { searchString: searchString, searchFilter: searchFilter}});

    if(res.data.searchResult) {
        dispatch(deploySearchSuccess(res.data.searchResult));
    } else if (res.data.error) {
        dispatch(deploySearchFail(res.data.error));
    }
}

export const deployBlogSearchStart = (searchString) => {
    return {
        type: actionTypes.DEPLOY_BLOG_SEARCH_START,
        searchString: searchString
    }
}

export const deployBlogSearchSuccess = (searchResult) => {
    return {
        type: actionTypes.DEPLOY_BLOG_SEARCH_SUCCESS,
        searchResult: searchResult
    }
}

export const deployBlogSearchFail = (error) => {
    return {
        type: actionTypes.DEPLOY_BLOG_SEARCH_FAIL,
        error: error
    }
}

export const deployBlogSearch = (searchString) => async dispatch => {
    dispatch(deployBlogSearchStart(searchString));
    // console.log(searchString, searchFilter)
    const res = await axios.get('/api/deploy_blog_search', {params: { searchString: searchString}});

    if(res.data.searchResult) {
        dispatch(deployBlogSearchSuccess(res.data.searchResult));
    } else if (res.data.error) {
        dispatch(deployBlogSearchFail(res.data.error));
    }
}

export const clearSearchMessages = () => {
    return {
        type: actionTypes.CLEAR_SEARCH_MESSAGES
    }
}