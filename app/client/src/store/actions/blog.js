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

export const uploadBlogImage = (imageFile) => async dispatch => {
    dispatch(uploadBlogImageStart());

    let data = new FormData();   
    data.append('file', imageFile);

    const res = await axios.post('/api/upload_blog_image', data);
    if (res.data.uploadedImage) {
        dispatch(uploadBlogImageSuccess(res.data.uploadedImage, 'upload successful'));
    } else if (res.data.error) {
        dispatch(uploadBlogImageFail(res.data.error));
    } else {
        dispatch(uploadBlogImageFail('unkown error occured!'));
    }
}

// upload web blog image

export const uploadWebBlogImageStart = () => {
    return {
        type: actionTypes.UPLOAD_WEB_BLOG_IMAGE_START
    }
}

export const uploadWebBlogImageSuccess = (uploadedImage, successInfo) => {
    return {
        type: actionTypes.UPLOAD_WEB_BLOG_IMAGE_SUCCESS,
        uploadedImage: uploadedImage,
        successInfo: successInfo
    }
}

export const uploadWebBlogImageFail = (error) => {
    return {
        type: actionTypes.UPLOAD_WEB_BLOG_IMAGE_FAIL,
        error: error
    }
}

export const uploadWebBlogImage = (imageUrl) => async dispatch => {
    dispatch(uploadWebBlogImageStart());
    // console.log(imageUrl);
    const res = await axios.post('/api/upload_web_blog_image', { imageUrl: imageUrl });
    if (res.data.uploadedImage) {
        dispatch(uploadWebBlogImageSuccess(res.data.uploadedImage, 'upload successful'));
    } else if (res.data.error) {
        dispatch(uploadWebBlogImageFail(res.data.error));
    } else {
        dispatch(uploadWebBlogImageFail('unkown error occured!'));
    }
}

export const clearUploadBlogImageState = () => {
    return {
        type: actionTypes.CLEAR_UPLOAD_BLOG_IMAGE_STATE
    }
}

