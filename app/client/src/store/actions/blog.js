import axios from 'axios';
import * as actionTypes from './actionTypes';

// fetch blog posts

export const fetchBlogPostsStart = () => {
    return {
        type: actionTypes.FETCH_BLOG_POSTS_START
    }
}

export const fetchBlogPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_BLOG_POSTS_SUCCESS,
        posts: posts
    }
}

export const fetchBlogPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_BLOG_POSTS_FAIL,
        error: error
    }
}

export const fetchBlogPosts = () => async dispatch => {
    dispatch(fetchBlogPostsStart());

    const res = await axios.get('/api/blog_posts');

    if (res.data.posts) {
        // console.log(res.data.posts);
        dispatch(fetchBlogPostsSuccess(res.data.posts));
    } else {
        dispatch(fetchBlogPostsFail('error occured while fetching blog posts!'));
    }
}

// fetch blog post

export const fetchBlogPostStart = () => {
    return {
        type: actionTypes.FETCH_BLOG_POST_START
    }
}

export const fetchBlogPostSuccess = (post) => {
    return {
        type: actionTypes.FETCH_BLOG_POST_SUCCESS,
        post: post
    }
}

export const fetchBlogPostFail = (error) => {
    return {
        type: actionTypes.FETCH_BLOG_POST_FAIL,
        error: error
    }
}

export const fetchBlogPost = (slug) => async dispatch => {
    dispatch(fetchBlogPostStart());

    const res = await axios.get('/api/blog_post', {params: { slug: slug }});
    // console.log(res.data.post);
    if (res.data.post) {
        // console.log(res.data.post);
        dispatch(fetchBlogPostSuccess(res.data.post));
    } else {
        dispatch(fetchBlogPostFail('error occured while fetching blog post!'));
    }
}

// upload blog image

export const uploadBlogImageStart = () => {
    return {
        type: actionTypes.UPLOAD_BLOG_IMAGE_START
    }
}

export const uploadBlogImageSuccess = (uploadedImage, successInfo) => {
    return {
        type: actionTypes.UPLOAD_BLOG_IMAGE_SUCCESS,
        uploadedImage: uploadedImage,
        successInfo: successInfo
    }
}

export const uploadBlogImageFail = (error) => {
    return {
        type: actionTypes.UPLOAD_BLOG_IMAGE_FAIL,
        error: error
    }
}

export const uploadBlogImage = (imageFile, source, caption) => async dispatch => {
    dispatch(uploadBlogImageStart());

    let data = new FormData();   
    data.append('file', imageFile);

    let captionValue = caption;
    let sourceValue = source;
    let hasAttribute = true;

    if ( captionValue === '') {
        captionValue = undefined
    }

    if ( sourceValue === '') {
        sourceValue = undefined
    }

    if ( captionValue === '' && sourceValue === '') {
        hasAttribute = false
    }

    // console.log(captionValue, sourceValue, hasAttribute);

    const res = await axios.post('/api/upload_blog_image', data);
    if (res.data.uploadedImage && hasAttribute) {   
        const res2 = await axios.put('/api/add_image_attributes', { caption: captionValue, source: sourceValue, imageId: res.data.uploadedImage._id });
        if (res2.data.uploadedImage) {
            dispatch(uploadBlogImageSuccess(res2.data.uploadedImage, 'upload successful'));
        } else if (res2.data.error) {
            dispatch(uploadBlogImageFail(res2.data.error));    
        }
    } else if (res.data.uploadedImage && !hasAttribute) {
        dispatch(uploadBlogImageSuccess(res.data.uploadedImage, 'upload successful'));
    } else if (res.data.error) {
        dispatch(uploadBlogImageFail(res.data.error));
    } else {
        dispatch(uploadBlogImageFail('unkown error occured!'));
    }
}

export const uploadWebBlogImage = (imageUrl, source, caption) => async dispatch => {
    dispatch(uploadBlogImageStart());
    // console.log(imageUrl);
    let captionValue = caption;
    let sourceValue = source;
    // let hasAttribute = true;

    if ( captionValue === '') {
        captionValue = undefined
    }

    if ( sourceValue === '') {
        sourceValue = undefined
    }
    const res = await axios.post('/api/upload_web_blog_image', { imageUrl: imageUrl, source: sourceValue, caption: captionValue });
    if (res.data.uploadedImage) {
        dispatch(uploadBlogImageSuccess(res.data.uploadedImage, 'upload successful'));
    } else if (res.data.error) {
        dispatch(uploadBlogImageFail(res.data.error));
    } else {
        dispatch(uploadBlogImageFail('unkown error occured!'));
    }
}

export const clearUploadBlogImageState = () => {
    return {
        type: actionTypes.CLEAR_UPLOAD_BLOG_IMAGE_STATE
    }
}

// fetch All Blog Drafts

export const loadAllBlogDraftsStart = () => {
    return {
        type: actionTypes.LOAD_ALL_BLOG_DRAFTS_START
    }
}

export const loadAllBlogDraftsSuccess = (blogDrafts) => {
    return {
        type: actionTypes.LOAD_ALL_BLOG_DRAFTS_SUCCESS,
        blogDrafts: blogDrafts
    }
}

export const loadAllBlogDraftsFail = (error) => {
    return {
        type: actionTypes.LOAD_ALL_BLOG_DRAFTS_FAIL,
        error: error
    }
}

export const loadAllBlogDrafts = () => async dispatch => {
    dispatch(loadAllBlogDraftsStart());

    const res = await axios.get('/api/fetch_blog_drafts');
    // console.log(res.data.post);
    if (res.data.blogDrafts) {
        // console.log(res.data.blogDrafts);
        dispatch(loadAllBlogDraftsSuccess(res.data.blogDrafts));
    } else if (res.data.error){
        dispatch(loadAllBlogDraftsFail(res.data.error));
    }
}

// create Blog Drafts

export const createBlogDraftStart = () => {
    return {
        type: actionTypes.CREATE_BLOG_DRAFT_START
    }
}

export const createBlogDraftSuccess = (blogDrafts) => {
    return {
        type: actionTypes.CREATE_BLOG_DRAFT_SUCCESS,
        blogDrafts: blogDrafts
    }
}

export const createBlogDraftFail = (error) => {
    return {
        type: actionTypes.CREATE_BLOG_DRAFT_FAIL,
        error: error
    }
}

export const createBlogDraft = (title, heroImage, description, content, htmlContent, allDrafts) => async dispatch => {
    dispatch(createBlogDraftStart());
    // console.log(htmlContent);
    const res = await axios.post('/api/create_blog_draft', { title: title, heroImage: heroImage, description: description, content: content, htmlContent: htmlContent});
    // console.log(res.data.post);
    if (res.data.newDraft) {
        // console.log(res.data.newDraft);
        let newDraft = res.data.newDraft;
        let updatedDrafts = [newDraft, ...allDrafts];
        dispatch(createBlogDraftSuccess(updatedDrafts));
        console.log(updatedDrafts);
    } else if (res.data.error){
        dispatch(createBlogDraftFail(res.data.error));
    }
}

// update Blog Drafts

export const updateBlogDraftStart = () => {
    return {
        type: actionTypes.UPDATE_BLOG_DRAFT_START
    }
}

export const updateBlogDraftSuccess = (blogDrafts) => {
    return {
        type: actionTypes.UPDATE_BLOG_DRAFT_SUCCESS,
        blogDrafts: blogDrafts
    }
}

export const updateBlogDraftFail = (error) => {
    return {
        type: actionTypes.UPDATE_BLOG_DRAFT_FAIL,
        error: error
    }
}

export const updateBlogDraft = (draftId, title, heroImage, description, content, htmlContent, allDrafts) => async dispatch => {
    dispatch(updateBlogDraftStart());
    
    const res = await axios.put('/api/update_blog_draft', { draftId: draftId, title: title, heroImage: heroImage, description: description, content: content, htmlContent: htmlContent});
    // console.log(res.data);
    if (res.data.updatedDraft._id === draftId) {
        // console.log(res.data.updatedDraft);
        const index = allDrafts.findIndex(draft => draft._id === res.data.updatedDraft._id);
        let updatedDrafts;

        if (index !== -1) {
            updatedDrafts = [...allDrafts];
            updatedDrafts[index] = res.data.updatedDraft;
        }
        dispatch(updateBlogDraftSuccess(updatedDrafts));
        // console.log(updatedDrafts);
    } else if (res.data.error){
        dispatch(updateBlogDraftFail(res.data.error));
    }
}

export const deleteHeroImage = (imagePublicId, imageId) => async dispatch => {
    // dispatch(updateBlogDraftStart());
    
    /* const res = await */ axios.delete('/api/delete_blog_image', {params: { imagePublicId: imagePublicId, imageId: imageId }});
}

// initialize blog Categories

export const initializeCategoriesSuccess = (categoriesArray, categoriesToString, id) => {
    return {
        type: actionTypes.INITIALIZE_BLOG_CATEGORIES_SUCCESS,
        categoriesArray: categoriesArray,
        categoriesToString: categoriesToString,
        id: id
    }
}

export const initializeCategories = () => async dispatch => {
    
    const res = await axios.get('/api/initialize_blog_categories');

    if(res.data.categories) {
        let categoriesArray = res.data.categories.categories;
        let categoriesToString = categoriesArray.join();
        let id = res.data.categories._id;
        dispatch(initializeCategoriesSuccess(categoriesArray, categoriesToString, id))
        // console.log(categoriesArray, categoriesToString, id);
    }
}

// Initialize blog tags

export const initializeTagsSuccess = (tagsArray, tagsToString, id) => {
    return {
        type: actionTypes.INITIALIZE_BLOG_TAGS_SUCCESS,
        tagsArray: tagsArray,
        tagsToString: tagsToString,
        id: id
    }
}

export const initializeTags = () => async dispatch => {
    // dispatch(initializeCategorySuccessful());
    
    const res = await axios.get('/api/initialize_blog_tags');

    if(res.data.tags) {
        let tagsArray = res.data.tags.tags;
        let tagsToString = tagsArray.join();
        let id = res.data.tags._id;
        dispatch(initializeTagsSuccess(tagsArray, tagsToString, id))
        // console.log(tagsArray, tagsToString, id);
    }
}

// Edit blog category

export const editBlogCategoriesStart = () => {
    return {
        type: actionTypes.EDIT_BLOG_CATEGORIES_START
    }
}

export const editBlogCategoriesSuccess = (categoriesArray, categoriesToString, successMessage) => {
    return {
        type: actionTypes.EDIT_BLOG_CATEGORIES_SUCCESS,
        categoriesArray: categoriesArray,
        categoriesToString: categoriesToString,
        successMessage: successMessage
    }
}

export const editBlogCategoriesFail = (error) => {
    return {
        type: actionTypes.EDIT_BLOG_CATEGORIES_FAIL,
        error: error
    }
}

export const editBlogCategories = (blogCategories, id) => async dispatch => {
    dispatch(editBlogCategoriesStart());

    const categoriesArray = blogCategories.split(',');

    const res = await axios.put('/api/edit_blog_categories', { categoriesArray: categoriesArray, id: id});
    console.log(res.data);
    if (res.data.categories/* ._id === id */) {
        let categoriesArray = res.data.categories.categories
        let categoriesToString = categoriesArray.join();
        let successMessage = 'categories updated'

        dispatch(editBlogCategoriesSuccess(categoriesArray, categoriesToString, successMessage))
    } else if (res.data.error) {
        dispatch(editBlogCategoriesFail(res.data.error));
    }  
}

// Edit blog tags

export const editBlogTagsStart = () => {
    return {
        type: actionTypes.EDIT_BLOG_TAGS_START
    }
}

export const editBlogTagsSuccess = (tagsArray, tagsToString, successMessage) => {
    return {
        type: actionTypes.EDIT_BLOG_TAGS_SUCCESS,
        tagsArray: tagsArray,
        tagsToString: tagsToString,
        successMessage: successMessage
    }
}

export const editBlogTagsFail = (error) => {
    return {
        type: actionTypes.EDIT_BLOG_TAGS_FAIL,
        error: error
    }
}

export const editBlogTags = (blogTags, id) => async dispatch => {
    dispatch(editBlogTagsStart());

    const tagsArray = blogTags.split(',');

    const res = await axios.put('/api/edit_blog_tags', { tagsArray: tagsArray, id: id});
    console.log(res.data);
    if (res.data.tags/* ._id === id */) {
        let tagsArray = res.data.tags.tags
        let tagsToString = tagsArray.join();
        let successMessage = 'categories updated'

        dispatch(editBlogTagsSuccess(tagsArray, tagsToString, successMessage))
    } else if (res.data.error) {
        dispatch(editBlogTagsFail(res.data.error));
    }  
}

//  clear edit blog filters messages

export const clearEditBlogFiltersInfo = () => {
    return {
        type: actionTypes.CLEAR_EDIT_BLOG_FILTERS_INFO
    }
}

// fetch Blog categories

export const fetchBlogCategories = () => async dispatch => {

    const res = await axios.get('/api/fetch_blog_categories');
    // console.log(res.data);
    if (res.data.categories) {
        let categoriesArray = res.data.categories.categories
        let categoriesToString = categoriesArray.join();
        let categoriesId = res.data.categories._id;

        dispatch(initializeCategoriesSuccess(categoriesArray, categoriesToString, categoriesId))
    } 
}

// fetch Blog tags

export const fetchBlogTags = () => async dispatch => {

    const res = await axios.get('/api/fetch_blog_tags');
    // console.log(res.data);
    if (res.data.tags) {
        let tagsArray = res.data.tags.tags
        let tagsToString = tagsArray.join();
        let tagsId = res.data.tags._id

        dispatch(initializeTagsSuccess(tagsArray, tagsToString, tagsId))
    } 
}

