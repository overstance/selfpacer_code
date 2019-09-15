import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userSavedBlogs: [],
    blogPosts: {
        meta: {},
        data: []
    },
    fetchBlogPostsLoading: false,
    fetchBlogPostsError: null,
    blogPost: {
        featuredImage: {}
    },
    fetchBlogPostLoading: false,
    fetchBlogPostError: null,

    featuredBlogs: [],
    
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

    deleteBlogDraftError: null,
    deleteBlogDraftLoading: false,

    publishBlogDraftError: null,
    publishBlogDraftLoading: false,

    editBlogCategoriesSuccessInfo: null,
    editBlogCategoriesLoading: false,
    editBlogCategoriesError: null,
    blogCategoriesArray: [],
    blogCategories: '',
    categoriesId: '',

    editBlogTagsSuccessInfo: null,
    editBlogTagsLoading: false,
    editBlogTagsError: null,
    blogTagsArray: [],
    blogTags: '',
    tagsId: '',

    authors: [],

    moreInCategory: [],

    fetchBlogCommentsLoading: false,
    fetchBlogCommentsError: null, 
    mainComments: [],
    replies: [],

    commentToReplyId: null,
    commentToReplyCommentor: null,
    commentToReplyText: null,
    isReplyingComment: false,

    postedCommentId: null,
    postCommentLoading: false,
    postCommentError: null,
    postCommentSuccessMessage: null,

    saveBlogLoading: false,
    saveBlogError: null,
    saveBlogSuccessMessage: null
}

const setUserSavedBlogs = ( state, action ) => {
    return updateObject( state, {
        userSavedBlogs: action.userSavedBlogs
    })
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

const fetchMoreInCategorySuccess = ( state, action ) => {
    return updateObject( state, {
        moreInCategory: action.posts
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

// delete blog draft

const deleteBlogDraftStart = ( state, action ) => {
    return updateObject( state, {
        deleteBlogDraftLoading: true,
        deleteBlogDraftError: null
    })
}

const deleteBlogDraftSuccess = ( state, action ) => {
    return updateObject( state, {
        deleteBlogDraftLoading: false,
        allDrafts: action.updatedDrafts
    })
}

const deleteBlogDraftFail = ( state, action ) => {
    return updateObject( state, {
        deleteBlogDraftLoading: false,
        deleteBlogDraftError: action.error
    })
}

// publish blog draft

const publishBlogDraftStart = ( state, action ) => {
    return updateObject( state, {
        publishBlogDraftLoading: true,
        publishBlogDraftError: null
    })
}

const publishBlogDraftSuccess = ( state, action ) => {
    return updateObject( state, {
        publishBlogDraftLoading: false,
        allDrafts: action.updatedDrafts
    })
}

const publishBlogDraftFail = ( state, action ) => {
    return updateObject( state, {
        publishBlogDraftLoading: false,
        publishBlogDraftError: action.error
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

// initialize blog categories

const initializeCategoriesSuccess = ( state, action ) => {
    return updateObject( state, {
        blogCategoriesArray: action.categoriesArray,
        blogCategories: action.categoriesToString,
        categoriesId: action.id,
    })
}

// initialize blog tags

const initializeTagsSuccess = ( state, action ) => {
    return updateObject( state, {
        blogTagsArray: action.tagsArray,
        blogTags: action.tagsToString,
        tagsId: action.id,
    })
}

// edit Blog categories

const editBlogCategoriesStart = ( state, action ) => {
    return updateObject( state, {
        editBlogCategoriesLoading: true,
        editBlogCategoriesError: null
    })
}

const editBlogCategoriesSuccess = ( state, action ) => {
    return updateObject( state, {
        blogCategoriesArray: action.categoriesArray,
        blogCategories: action.categoriesToString,
        editBlogCategoriesSuccessInfo: action.successMessage,
        editBlogCategoriesLoading: false
    })
}

const editBlogCategoriesFail = ( state, action ) => {
    return updateObject( state, {
        editBlogCategoriesLoading: false,
        editBlogCategoriesError: action.error
    })
}

// edit Blog tags

const editBlogTagsStart = ( state, action ) => {
    return updateObject( state, {
        editBlogTagsLoading: true,
        editBlogTagsError: null
    })
}

const editBlogTagsSuccess = ( state, action ) => {
    return updateObject( state, {
        blogTagsArray: action.tagsArray,
        blogTags: action.tagsToString,
        editBlogTagsSuccessInfo: action.successMessage,
        editBlogTagsLoading: false
    })
}

const editBlogTagsFail = ( state, action ) => {
    return updateObject( state, {
        editBlogTagsLoading: false,
        editBlogTagsError: action.error
    })
}

const clearEditBlogFiltersInfo = ( state, action ) => {
    return updateObject( state, {
        editBlogCategoriesSuccessInfo: null,
        editBlogCategoriesError: null,
        editBlogTagsSuccessInfo: null,
        editBlogTagsError: null,
    })
}

const fetchAuthorsSuccess = ( state, action ) => {
    return updateObject( state, {
        authors: action.authors
    })
}

// fetch featured blogs

const fetchFeaturedBlogsSuccess = ( state, action ) => {
    return updateObject( state, {
        featuredBlogs: action.blogs
    })
}

// fetch blog comments

const fetchBlogCommentsStart = ( state, action ) => {
    return updateObject( state, {
        fetchBlogCommentsLoading: true,
        fetchBlogCommentsError: null
    })
}

const fetchBlogCommentsSuccess = ( state, action ) => {
    return updateObject( state, {
        fetchBlogCommentsLoading: false,
        mainComments: action.mainComments,
        replies: action.replies
    })
}

const fetchBlogCommentsFail = ( state, action ) => {
    return updateObject( state, {
        fetchBlogCommentsLoading: false,
        fetchBlogCommentsError: action.error
    })
}

// save blog post

const saveBlogStart = ( state, action ) => {
    return updateObject( state, {
        saveBlogLoading: true,
        saveBlogError: null
    })
}

const saveBlogSuccess = ( state, action ) => {
    return updateObject( state, {
        saveBlogLoading: false,
        userSavedBlogs: action.updatedBlogSaves,
        saveBlogSuccessMessage: 'blog saved'
    })
}

const saveBlogFail = ( state, action ) => {
    return updateObject( state, {
        saveBlogLoading: false,
        saveBlogError: action.error
    })
}

// post blog comment

const postUserCommentStart = ( state, action ) => {
    return updateObject( state, {
        postCommentLoading: true,
        postCommentError: null
    })
}

const postUserCommentSuccess = ( state, action ) => {
    return updateObject( state, {
        postCommentLoading: false,
        mainComments: action.updatedComments,
        postedCommentId: action.newCommentId,
        postCommentSuccessMessage: 'comment posted'
    })
}

const postUserCommentFail = ( state, action ) => {
    return updateObject( state, {
        postCommentLoading: false,
        postCommentError: action.error
    })
}

// post blog comment reply

const cancelReply = ( state, action ) => {
    return updateObject( state, {
        commentToReplyId: null,
        commentToReplyCommentor: null,
        commentToReplyText: null,
        isReplyingComment: false,
    })
}

const replyingComment = ( state, action ) => {
    return updateObject( state, {
        commentToReplyId: action.commentId,
        commentToReplyCommentor: action.commentor,
        commentToReplyText: action.commentText,
        isReplyingComment: true,
    })
}

const postUserCommentReplyStart = ( state, action ) => {
    return updateObject( state, {
        postCommentLoading: true,
        postCommentError: null
    })
}

const postUserCommentReplySuccess = ( state, action ) => {
    return updateObject( state, {
        postCommentLoading: false,
        replies: action.updatedReplies,
        postedCommentId: action.newCommentId,
        postCommentSuccessMessage: 'comment posted',
        commentToReplyId: null,
        commentToReplyCommentor: null,
        commentToReplyText: null,
        isReplyingComment: false,
    })
}

const postUserCommentReplyFail = ( state, action ) => {
    return updateObject( state, {
        postCommentLoading: false,
        postCommentError: action.error
    })
}

// clear blog comment messages

const clearBlogCommentMessages = ( state, action ) => {
    return updateObject( state, {
        postCommentError: null,
        postCommentSuccessMessage: null,
        fetchBlogCommentsError: null,
        commentToReplyId: null,
        commentToReplyCommentor: null,
        commentToReplyText: null,
        saveBlogError: null,
        saveBlogSuccessMessage: null
    })
}


const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.SET_USER_SAVED_BLOGS: return setUserSavedBlogs(state, action);
        
        case actionTypes.FETCH_BLOG_POSTS_START: return fetchBlogPostsStart(state, action);
        case actionTypes.FETCH_BLOG_POSTS_SUCCESS: return fetchBlogPostsSuccess(state, action);
        case actionTypes.FETCH_BLOG_POSTS_FAIL: return fetchBlogPostsFail(state, action);

        case actionTypes.FETCH_BLOG_POST_START: return fetchBlogPostStart(state, action);
        case actionTypes.FETCH_BLOG_POST_SUCCESS: return fetchBlogPostSuccess(state, action);
        case actionTypes.FETCH_BLOG_POST_FAIL: return fetchBlogPostFail(state, action);

        case actionTypes.FETCH_MORE_BLOG_IN_CATEGORY_SUCCESS: return fetchMoreInCategorySuccess(state, action);

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

        case actionTypes.DELETE_BLOG_DRAFT_START: return deleteBlogDraftStart(state, action);
        case actionTypes.DELETE_BLOG_DRAFT_SUCCESS: return deleteBlogDraftSuccess(state, action);
        case actionTypes.DELETE_BLOG_DRAFT_FAIL: return deleteBlogDraftFail(state, action);

        case actionTypes.PUBLISH_BLOG_DRAFT_START: return publishBlogDraftStart(state, action);
        case actionTypes.PUBLISH_BLOG_DRAFT_SUCCESS: return publishBlogDraftSuccess(state, action);
        case actionTypes.PUBLISH_BLOG_DRAFT_FAIL: return publishBlogDraftFail(state, action);

        case actionTypes.CLEAR_UPLOAD_BLOG_IMAGE_STATE: return clearUploadBlogImageState(state, action);

        case actionTypes.INITIALIZE_BLOG_CATEGORIES_SUCCESS: return initializeCategoriesSuccess(state, action);
        case actionTypes.INITIALIZE_BLOG_TAGS_SUCCESS: return initializeTagsSuccess(state, action);

        case actionTypes.EDIT_BLOG_CATEGORIES_START: return editBlogCategoriesStart(state, action);
        case actionTypes.EDIT_BLOG_CATEGORIES_SUCCESS: return editBlogCategoriesSuccess(state, action);
        case actionTypes.EDIT_BLOG_CATEGORIES_FAIL: return editBlogCategoriesFail(state, action);

        case actionTypes.EDIT_BLOG_TAGS_START: return editBlogTagsStart(state, action);
        case actionTypes.EDIT_BLOG_TAGS_SUCCESS: return editBlogTagsSuccess(state, action);
        case actionTypes.EDIT_BLOG_TAGS_FAIL: return editBlogTagsFail(state, action);

        case actionTypes.CLEAR_EDIT_BLOG_FILTERS_INFO: return clearEditBlogFiltersInfo(state, action);

        case actionTypes.FETCH_AUTHORS_SUCCESS: return fetchAuthorsSuccess(state, action);

        case actionTypes.FETCH_FEATURED_BLOGS_SUCCESS: return fetchFeaturedBlogsSuccess(state, action);

        case actionTypes.FETCH_BLOG_COMMENT_START: return fetchBlogCommentsStart(state, action);
        case actionTypes.FETCH_BLOG_COMMENT_SUCCESS: return fetchBlogCommentsSuccess(state, action);
        case actionTypes.FETCH_BLOG_COMMENT_FAIL: return fetchBlogCommentsFail(state, action);

        case actionTypes.POST_USER_COMMENT_START: return postUserCommentStart(state, action);
        case actionTypes.POST_USER_COMMENT_SUCCESS: return postUserCommentSuccess(state, action);
        case actionTypes.POST_USER_COMMENT_FAIL: return postUserCommentFail(state, action);

        case actionTypes.SAVE_BLOG_START: return saveBlogStart(state, action);
        case actionTypes.SAVE_BLOG_SUCCESS: return saveBlogSuccess(state, action);
        case actionTypes.SAVE_BLOG_FAIL: return saveBlogFail(state, action);

        case actionTypes.CANCEL_REPLY_COMMENT: return cancelReply(state, action);
        case actionTypes.REPLYING_COMMENT: return replyingComment(state, action);
        case actionTypes.POST_USER_COMMENT_REPLY_START: return postUserCommentReplyStart(state, action);
        case actionTypes.POST_USER_COMMENT_REPLY_SUCCESS: return postUserCommentReplySuccess(state, action);
        case actionTypes.POST_USER_COMMENT_REPLY_FAIL: return postUserCommentReplyFail(state, action);

        case actionTypes.CLEAR_BLOG_COMMENT_MESSAGES: return clearBlogCommentMessages(state, action);

        default: return state;
    }
};

export default reducer;