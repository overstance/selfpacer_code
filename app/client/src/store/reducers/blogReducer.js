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

    allDrafts: [],
    loadAllBlogDraftsError: null,
    loadAllBlogDraftsLoading: false,

    createBlogDraftError: null,
    createBlogDraftLoading: false,

    updateBlogDraftError: null,
    updateBlogDraftLoading: false,

    /* uploadWebBlogImageLoading: false,
    uploadWebBlogImageError: null,
    uploadWebBlogImageSuccessInfo: null,
    uploadedWebBlogImage: {} */
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

// load all blog drafts

const loadAllBlogDraftsStart = ( state, action ) => {
    return updateObject( state, {
        loadAllBlogDraftsLoading: true,
        loadAllBlogDraftsError: null
    })
}

const loadAllBlogDraftsSuccess = ( state, action ) => {
    return updateObject( state, {
        loadAllBlogDraftsLoading: false,
        allDrafts: action.blogDrafts
    })
}

const loadAllBlogDraftsFail = ( state, action ) => {
    return updateObject( state, {
        loadAllBlogDraftsLoading: false,
        loadAllBlogDraftsError: action.error
    })
}

// create blog draft

const createBlogDraftStart = ( state, action ) => {
    return updateObject( state, {
        createBlogDraftLoading: true,
        createBlogDraftError: null
    })
}

const createBlogDraftSuccess = ( state, action ) => {
    return updateObject( state, {
        createBlogDraftLoading: false,
        allDrafts: action.blogDrafts
    })
}

const createBlogDraftFail = ( state, action ) => {
    return updateObject( state, {
        createBlogDraftLoading: false,
        createBlogDraftError: action.error
    })
}

// update blog draft

const updateBlogDraftStart = ( state, action ) => {
    return updateObject( state, {
        updateBlogDraftLoading: true,
        updateBlogDraftError: null
    })
}

const updateBlogDraftSuccess = ( state, action ) => {
    return updateObject( state, {
        updateBlogDraftLoading: false,
        allDrafts: action.blogDrafts
    })
}

const updateBlogDraftFail = ( state, action ) => {
    return updateObject( state, {
        updateBlogDraftLoading: false,
        updateBlogDraftError: action.error
    })
}

// clear upload blog image

const clearUploadBlogImageState = ( state, action ) => {
    return updateObject( state, {
        uploadBlogImageError: null,
        uploadBlogImageSuccessInfo: null,
        uploadedBlogImage: {}
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

        case actionTypes.LOAD_ALL_BLOG_DRAFTS_START: return loadAllBlogDraftsStart(state, action);
        case actionTypes.LOAD_ALL_BLOG_DRAFTS_SUCCESS: return loadAllBlogDraftsSuccess(state, action);
        case actionTypes.LOAD_ALL_BLOG_DRAFTS_FAIL: return loadAllBlogDraftsFail(state, action);

        case actionTypes.CREATE_BLOG_DRAFT_START: return createBlogDraftStart(state, action);
        case actionTypes.CREATE_BLOG_DRAFT_SUCCESS: return createBlogDraftSuccess(state, action);
        case actionTypes.CREATE_BLOG_DRAFT_FAIL: return createBlogDraftFail(state, action);

        case actionTypes.UPDATE_BLOG_DRAFT_START: return updateBlogDraftStart(state, action);
        case actionTypes.UPDATE_BLOG_DRAFT_SUCCESS: return updateBlogDraftSuccess(state, action);
        case actionTypes.UPDATE_BLOG_DRAFT_FAIL: return updateBlogDraftFail(state, action);

        case actionTypes.CLEAR_UPLOAD_BLOG_IMAGE_STATE: return clearUploadBlogImageState(state, action);

        default: return state;
    }
};

export default reducer;