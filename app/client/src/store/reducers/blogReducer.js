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
    
    uploadBlogImageLoading: false,
    uploadBlogImageError: null,
    uploadBlogImageSuccessInfo: null,
    uploadedBlogImage: {},

    uploadWebBlogImageLoading: false,
    uploadWebBlogImageError: null,
    uploadWebBlogImageSuccessInfo: null,
    uploadedWebBlogImage: {}
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

// upload blog image

const uploadBlogImageStart = ( state, action ) => {
    return updateObject( state, {
        uploadBlogImageLoading: true,
        uploadBlogImageError: null,
        uploadBlogImageSuccessInfo: null
    })
}

const uploadBlogImageSuccess = ( state, action ) => {
    return updateObject( state, {
        uploadBlogImageLoading: false,
        uploadedBlogImage: action.uploadedImage,
        uploadBlogImageSuccessInfo: action.successInfo
    })
}

const uploadBlogImageFail = ( state, action ) => {
    return updateObject( state, {
        uploadBlogImageLoading: false,
        uploadBlogImageError: action.error
    })
}

// upload web blog image

const uploadWebBlogImageStart = ( state, action ) => {
    return updateObject( state, {
        uploadWebBlogImageLoading: true,
        uploadWebBlogImageError: null,
        uploadWebBlogImageSuccessInfo: null
    })
}

const uploadWebBlogImageSuccess = ( state, action ) => {
    return updateObject( state, {
        uploadWebBlogImageLoading: false,
        uploadedWebBlogImage: action.uploadedImage,
        uploadWebBlogImageSuccessInfo: action.successInfo
    })
}

const uploadWebBlogImageFail = ( state, action ) => {
    return updateObject( state, {
        uploadWebBlogImageLoading: false,
        uploadWebBlogImageError: action.error
    })
}

const clearUploadBlogImageState = ( state, action ) => {
    return updateObject( state, {
        uploadBlogImageError: null,
        uploadBlogImageSuccessInfo: null,
        uploadedBlogImage: {},
        uploadWebBlogImageError: null,
        uploadWebBlogImageSuccessInfo: null,
        uploadedWebBlogImage: {}
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

        case actionTypes.UPLOAD_BLOG_IMAGE_START: return uploadBlogImageStart(state, action);
        case actionTypes.UPLOAD_BLOG_IMAGE_SUCCESS: return uploadBlogImageSuccess(state, action);
        case actionTypes.UPLOAD_BLOG_IMAGE_FAIL: return uploadBlogImageFail(state, action);

        case actionTypes.UPLOAD_WEB_BLOG_IMAGE_START: return uploadWebBlogImageStart(state, action);
        case actionTypes.UPLOAD_WEB_BLOG_IMAGE_SUCCESS: return uploadWebBlogImageSuccess(state, action);
        case actionTypes.UPLOAD_WEB_BLOG_IMAGE_FAIL: return uploadWebBlogImageFail(state, action);

        case actionTypes.CLEAR_UPLOAD_BLOG_IMAGE_STATE: return clearUploadBlogImageState(state, action);

        default: return state;
    }
};

export default reducer;