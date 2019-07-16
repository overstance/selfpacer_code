import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    blogPosts: {
        meta: {},
        data: []
    },
    fetchBlogPostsLoading: false,
    fetchBlogPostsError: null,
    blogPost: {
        data: {}
    },
    fetchBlogPostLoading: false,
    fetchBlogPostError: null,
}

const fetchBlogPostsStart = ( state, action ) => {
    return updateObject( state, {
        fetchBlogPostsLoading: true,
        fetchBlogPostsError: null
    })
}

const fetchBlogPostsSuccess = ( state, action ) => {
    return updateObject( state, {
        fetchBlogPostsLoading: false,
        blogPosts: action.posts
    })
}

const fetchBlogPostsFail = ( state, action ) => {
    return updateObject( state, {
        fetchBlogPostsLoading: false,
        fetchBlogPostsError: action.error
    })
}

// fetch single blog

const fetchBlogPostStart = ( state, action ) => {
    return updateObject( state, {
        fetchBlogPostLoading: true,
        fetchBlogPostError: null
    })
}

const fetchBlogPostSuccess = ( state, action ) => {
    return updateObject( state, {
        fetchBlogPostLoading: false,
        blogPost: action.post
    })
}

const fetchBlogPostFail = ( state, action ) => {
    return updateObject( state, {
        fetchBlogPostLoading: false,
        fetchBlogPostError: action.error
    })
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.FETCH_BLOG_POSTS_START: return fetchBlogPostsStart(state, action);
        case actionTypes.FETCH_BLOG_POSTS_SUCCESS: return fetchBlogPostsSuccess(state, action);
        case actionTypes.FETCH_BLOG_POSTS_FAIL: return fetchBlogPostsFail(state, action);

        case actionTypes.FETCH_BLOG_POST_START: return fetchBlogPostStart(state, action);
        case actionTypes.FETCH_BLOG_POST_SUCCESS: return fetchBlogPostSuccess(state, action);
        case actionTypes.FETCH_BLOG_POST_FAIL: return fetchBlogPostFail(state, action);

        default: return state;
    }
};

export default reducer;