import axios from 'axios';
import * as actionTypes from './actionTypes';

export const deploySearchStart = () => {
    return {
        type: actionTypes.DEPLOY_SEARCH_START
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
    dispatch(deploySearchStart());
    // console.log(searchString, searchFilter)
    const res = await axios.get('/api/deploy_search', {params: { searchString: searchString, searchFilter: searchFilter}});

    if(res.data.searchResult) {
        dispatch(deploySearchSuccess(res.data.searchResult));
    } else if (res.data.error) {
        dispatch(deploySearchFail(res.data.error));
    }
}

export const clearSearchMessages = () => {
    return {
        type: actionTypes.CLEAR_SEARCH_MESSAGES
    }
}