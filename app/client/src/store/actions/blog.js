import axios from 'axios';
import * as actionTypes from './actionTypes';

// fetch featured Blogs

export const fetchFeaturedBlogsStart = () => {
    return {
        type: actionTypes.FETCH_FEATURED_BLOGS_START
    }
}

export const fetchFeaturedBlogsSuccess = (blogs) => {
    return {
        type: actionTypes.FETCH_FEATURED_BLOGS_SUCCESS,
        blogs: blogs
    }
}

export const fetchFeaturedBlogsFail = (error) => {
    return {
        type: actionTypes.FETCH_FEATURED_BLOGS_FAIL,
        error: error
    }
}

export const fetchFeaturedBlogs = () => async dispatch => {
    dispatch(fetchFeaturedBlogsStart());
    const res = await axios.get('/api/fetch_featured_blogs');
    // console.log(res.data.blogs);
    if (res.data.blogs) {
        dispatch(fetchFeaturedBlogsSuccess(res.data.blogs))
    } else if (res.data.error) {
        dispatch(fetchFeaturedBlogsFail(res.data.error))
    }
}

// clear all blog home page messages

export const clearBlogHomeMessages = () => {
    return {
        type: actionTypes.CLEAR_BLOG_HOME_MESSAGES
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

export const fetchMoreInCategorySuccess = (posts) => {
    return {
        type: actionTypes.FETCH_MORE_BLOG_IN_CATEGORY_SUCCESS,
        posts: posts
    }
}

export const fetchMoreInCategoryStart = () => {
    return {
        type: actionTypes.FETCH_MORE_BLOG_IN_CATEGORY_START
    }
}

export const fetchMoreInCategoryFail = (error) => {
    return {
        type: actionTypes.FETCH_MORE_BLOG_IN_CATEGORY_FAIL,
        error: error
    }
}

export const fetchMoreInCategory = (category) => async dispatch => {
    dispatch(fetchMoreInCategoryStart());

    const res = await axios.get('/api/fetch_more_blog_in_category', {params: { category: category }} )
    if (res.data.posts) {
        dispatch(fetchMoreInCategorySuccess(res.data.posts));
    } else if (res.data.error) {
        dispatch(fetchMoreInCategoryFail(res.data.error));
    }
}

export const fetchBlogPost = (year, month, day, slug) => async dispatch => {
    dispatch(fetchBlogPostStart());

    const res = await axios.get('/api/blog_post', {params: { year: year, month: month, day: day, slug: slug }});
    
    if (res.data.post) {
        // console.log(res.data.post);
        dispatch(fetchBlogPostSuccess(res.data.post));
           
    } else if (res.data.error) {
        dispatch(fetchBlogPostFail(res.data.error));
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

export const uploadBlogImage = (imageFile, source, caption, isHeroImage) => async dispatch => {
    dispatch(uploadBlogImageStart());

    let data = new FormData();   
    data.append('file', imageFile);

    let captionValue = caption;
    let sourceValue = source;
    // let hasAttribute = true;

    if ( captionValue === '') {
        captionValue = undefined
    }

    if ( sourceValue === '') {
        sourceValue = undefined
    }

    const res = await axios.post('/api/upload_blog_image', data, { params: {isHeroImage: isHeroImage, caption: captionValue, source: sourceValue} });
    if (res.data.uploadedImage) {   
        dispatch(uploadBlogImageSuccess(res.data.uploadedImage, 'upload successful'));
    } else if (res.data.error) {
        dispatch(uploadBlogImageFail(res.data.error));
    } else {
        dispatch(uploadBlogImageFail('unkown error occured!'));
    }
}

export const uploadWebBlogImage = (imageUrl, source, caption, isHeroImage) => async dispatch => {
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
    const res = await axios.post('/api/upload_web_blog_image', { imageUrl: imageUrl, source: sourceValue, caption: captionValue, isHeroImage: isHeroImage });
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

export const createBlogDraft = (title, heroImage, slug, category, tags, author, authorName, authorTwitter, description, content, htmlContent, editorInChargeId, editorInChargeName, allDrafts) => async dispatch => {
    dispatch(createBlogDraftStart());
    // console.log(htmlContent);
    const res = await axios.post('/api/create_blog_draft', { title: title, heroImage: heroImage, slug: slug, category: category, tags: tags, author: author, authorName: authorName, authorTwitter: authorTwitter, description: description, content: content, htmlContent: htmlContent, editorInChargeId: editorInChargeId, editorInChargeName: editorInChargeName});
    // console.log(res.data.post);
    if (res.data.newDraft) {
        // console.log(res.data.newDraft);
        let newDraft = res.data.newDraft;
        let updatedDrafts = [newDraft, ...allDrafts];
        dispatch(createBlogDraftSuccess(updatedDrafts));
        // console.log(updatedDrafts);
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

export const updateBlogDraft = (draftId, title, heroImage, slug, category, tags, author, authorName, authorTwitter, description, content, htmlContent, allDrafts) => async dispatch => {
    dispatch(updateBlogDraftStart());
    
    const res = await axios.put('/api/update_blog_draft', { draftId: draftId, title: title, heroImage: heroImage, slug: slug, category: category, tags: tags, author: author, authorName: authorName, authorTwitter: authorTwitter, description: description, content: content, htmlContent: htmlContent});
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

// delete Blog Drafts

export const deleteBlogDraftStart = () => {
    return {
        type: actionTypes.DELETE_BLOG_DRAFT_START
    }
}

export const deleteBlogDraftSuccess = (updatedDrafts) => {
    return {
        type: actionTypes.DELETE_BLOG_DRAFT_SUCCESS,
        updatedDrafts: updatedDrafts
    }
}

export const deleteBlogDraftFail = (error) => {
    return {
        type: actionTypes.DELETE_BLOG_DRAFT_FAIL,
        error: error
    }
}

export const deleteBlogDraft = (draftId, drafts) => async dispatch => {
    dispatch(deleteBlogDraftStart());
    const res = await axios.delete('/api/delete_blog_draft', { params: {id: draftId}});
    if (res.data === 'Draft Deleted') {
        let updatedDrafts = drafts.filter( draft => draft._id !== draftId);
        dispatch(deleteBlogDraftSuccess(updatedDrafts));
    } else if (res.data.error){
        dispatch(deleteBlogDraftFail(res.data.error));
    }
}

// publish Blog Drafts

export const publishBlogDraftStart = () => {
    return {
        type: actionTypes.PUBLISH_BLOG_DRAFT_START
    }
}

export const publishBlogDraftSuccess = (updatedDrafts) => {
    return {
        type: actionTypes.PUBLISH_BLOG_DRAFT_SUCCESS,
        updatedDrafts: updatedDrafts
    }
}

export const publishBlogDraftFail = (error) => {
    return {
        type: actionTypes.PUBLISH_BLOG_DRAFT_FAIL,
        error: error
    }
}

export const publishBlogDraft = (draftId, publishedOn, drafts) => async dispatch => {
    dispatch(publishBlogDraftStart());
    // console.log(draftId);
    const res = await axios.put('/api/publish_blog_draft', {id: draftId, publishedOn: publishedOn});
    if (res.data.publishedDraft) {
        // console.log(res.data.publishedDraft);
        let updatedDrafts = drafts.filter( draft => draft._id !== draftId);
        dispatch(publishBlogDraftSuccess(updatedDrafts));
    } else if (res.data.error){
        dispatch(publishBlogDraftFail(res.data.error));
    }
}

//  delete hero image

export const deleteHeroImage = (imagePublicId, imageId) => async dispatch => {
    axios.delete('/api/delete_blog_image', {params: { imagePublicId: imagePublicId, imageId: imageId }});
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
    // console.log(res.data);
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
    // console.log(res.data);
    if (res.data.tags/* ._id === id */) {
        let tagsArray = res.data.tags.tags
        let tagsToString = tagsArray.join();
        let successMessage = 'tags updated'

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

// fetch authors

export const fetchAuthorsSuccess = (authors) => {
    return {
        type: actionTypes.FETCH_AUTHORS_SUCCESS,
        authors: authors
    }
}
export const fetchAuthors = () => async dispatch => {

    const res = await axios.get('/api/fetch_authors');
    // console.log(res.data);
    if (res.data.authors) {
        dispatch(fetchAuthorsSuccess(res.data.authors))
    } 
}

// fetch blog comments

export const fetchBlogCommentsStart = () => {
    return {
        type: actionTypes.FETCH_BLOG_COMMENT_START
    }
}

export const fetchBlogCommentsSuccess = (mainComments, replies) => {
    return {
        type: actionTypes.FETCH_BLOG_COMMENT_SUCCESS,
        mainComments: mainComments,
        replies: replies
    }
}

export const fetchBlogCommentsFail = (error) => {
    return {
        type: actionTypes.FETCH_BLOG_COMMENT_FAIL,
        error: error
    }
}

export const fetchBlogComments = (blogId) => async dispatch => {
    dispatch(fetchBlogCommentsStart());
    // console.log(blogId);

    const res = await axios.get('/api/fetch_blog_comments', { params:{ blogId: blogId} });
    
    if (res.data.comments) {
        
        let mainComments = res.data.comments.filter(comment => comment.type === 'mainComment').sort((a,b) => new Date(b.commentDate) - new Date(a.commentDate));
        let replies = res.data.comments.filter(comment => comment.type === 'reply');
        // console.log(res.data.comments, mainComments, replies)
        dispatch(fetchBlogCommentsSuccess(mainComments, replies))
    } else if (res.data.error) {
        dispatch(fetchBlogCommentsFail(res.data.error));
    }  
}

// post user comment

export const postUserCommentStart = () => {
    return {
        type: actionTypes.POST_USER_COMMENT_START
    }
}

export const postUserCommentSuccess = (updatedComments, newCommentId) => {
    return {
        type: actionTypes.POST_USER_COMMENT_SUCCESS,
        updatedComments: updatedComments,
        newCommentId: newCommentId
    }
}

export const postUserCommentFail = (error) => {
    return {
        type: actionTypes.POST_USER_COMMENT_FAIL,
        error: error
    }
}

export const postUserComment = (userId, userName, blogId, commentText, comments) => async dispatch => {
    dispatch(postUserCommentStart());
    // console.log(userId, userName, blogId, commentText, comments);

    const res = await axios.post('/api/post_user_comments', { userId: userId, userName: userName, blogId: blogId, commentText: commentText });
    
    if (res.data.comment) {
        // console.log(res.data.comment);
        let updatedComments = [res.data.comment, ...comments];
        // updatedComments.unshift(res.data.comment);
        // updatedComments.unshift(res.data.comment);
        // console.log(updatedComments);
        dispatch(postUserCommentSuccess(updatedComments, res.data.comment._id))
        
    } else if (res.data.error) {
        dispatch(postUserCommentFail(res.data.error));
    }  
}

// post user comment reply

export const cancelReply = () => {
    return {
        type: actionTypes.CANCEL_REPLY_COMMENT
    }
}

export const replyingComment = (commentId, commentor, commentText) => {
    return {
        type: actionTypes.REPLYING_COMMENT,
        commentId: commentId,
        commentor: commentor,
        commentText: commentText
    }
}

export const postUserCommentReplyStart = () => {
    return {
        type: actionTypes.POST_USER_COMMENT_REPLY_START
    }
}

export const postUserCommentReplySuccess = (updatedReplies, newCommentId) => {
    return {
        type: actionTypes.POST_USER_COMMENT_REPLY_SUCCESS,
        updatedReplies: updatedReplies,
        newCommentId: newCommentId
    }
}

export const postUserCommentReplyFail = (error) => {
    return {
        type: actionTypes.POST_USER_COMMENT_REPLY_FAIL,
        error: error
    }
}

export const postUserCommentReply = (commentToReplyId, userId, userName, blogId, commentText, replies) => async dispatch => {
    dispatch(postUserCommentReplyStart());
    // console.log(commentToReplyId, userId, userName, blogId, commentText, replies);

    const res = await axios.post('/api/post_user_comments_reply', { parentComment: commentToReplyId, userId: userId, userName: userName, blogId: blogId, commentText: commentText });
    
    if (res.data.reply) {
        // console.log(res.data.reply);
        let updatedReplies = [...replies, res.data.reply];
        // updatedReplies.push(res.data.reply);

        dispatch(postUserCommentReplySuccess(updatedReplies, res.data.reply._id))
    } else if (res.data.error) {
        dispatch(postUserCommentReplyFail(res.data.error));
    }  
}

// save blog

export const saveBlogStart = () => {
    return {
        type: actionTypes.SAVE_BLOG_START
    }
}

export const saveBlogSuccess = (updatedBlogSaves) => {
    return {
        type: actionTypes.SAVE_BLOG_SUCCESS,
        updatedBlogSaves: updatedBlogSaves
    }
}

export const saveBlogFail = (error) => {
    return {
        type: actionTypes.SAVE_BLOG_FAIL,
        error: error
    }
}

export const saveBlog = (userId, blogId, userSavedBlogs) => async dispatch => {
    dispatch(saveBlogStart());

    let updatedUserSavedBlogs = userSavedBlogs;

    updatedUserSavedBlogs.push(blogId);

    // console.log(userId, blogId, userSavedBlogs, updatedUserSavedBlogs);

    const res = await axios.post('/api/save_blog_post', { updatedUserSavedBlogs: updatedUserSavedBlogs, userId: userId });
    
    if (res.data.updatedBlogSaves) {
        // console.log(res.data.updatedBlogSaves);
        dispatch(saveBlogSuccess(res.data.updatedBlogSaves));
    } else if (res.data.error) {
        dispatch(saveBlogFail(res.data.error));
    }  
}

//  clear blog comment messages

export const clearBlogPostMessages = () => {
    return {
        type: actionTypes.CLEAR_BLOG_POST_MESSAGES
    }
}

// fetch blog by section

export const fetchBlogsBySectionStart = () => {
    return {
        type: actionTypes.FETCH_BLOGS_BY_SECTION_START
    }
}

export const fetchBlogsBySectionSuccess = (posts, fetchLength) => {
    return {
        type: actionTypes.FETCH_BLOGS_BY_SECTION_SUCCESS,
        posts: posts,
        fetchLength: fetchLength
    }
}

export const fetchBlogsBySectionFail = (error) => {
    return {
        type: actionTypes.FETCH_BLOGS_BY_SECTION_FAIL,
        error: error
    }
}

export const clearBlogSectionMessages = () => {
    return {
        type: actionTypes.CLEAR_BLOG_SECTION_MESSAGES
    }
}

export const fetchBlogsBySection = (category, pageIndex) =>  async dispatch => {
    dispatch(fetchBlogsBySectionStart());

    const res = await axios.get('/api/fetch_blogs_by_section', {params: { category: category, pageIndex: pageIndex }});

    if(res.data.blogs) {
        dispatch(fetchBlogsBySectionSuccess(res.data.blogs, res.data.blogs.length))
    } else if (res.data.error) {
        dispatch(fetchBlogsBySectionFail(res.data.error))
    }
}

export const fetchMoreBlogsBySectionStart = () => {
    return {
        type: actionTypes.FETCH_MORE_BLOGS_BY_SECTION_START
    }
}

export const fetchMoreBlogsBySectionSuccess = (updatedPosts, fetchLength) => {
    return {
        type: actionTypes.FETCH_MORE_BLOGS_BY_SECTION_SUCCESS,
        updatedPosts: updatedPosts,
        fetchLength: fetchLength
    }
}

export const fetchMoreBlogsBySectionFail = (error) => {
    return {
        type: actionTypes.FETCH_MORE_BLOGS_BY_SECTION_FAIL,
        error: error
    }
}

export const fetchMoreBlogsBySection = (category, pageIndex, blogPosts) => async dispatch => {
    dispatch(fetchMoreBlogsBySectionStart());

    const res = await axios.get('/api/fetch_blogs_by_section', {params: { category: category, pageIndex: pageIndex }});

    if(res.data.blogs) {
        let updatedPosts = [...blogPosts, ...res.data.blogs];
        dispatch(fetchMoreBlogsBySectionSuccess(updatedPosts, res.data.blogs.length))
    } else if (res.data.error) {
        dispatch(fetchMoreBlogsBySectionFail(res.data.error))
    }
}

// fetch blog by popularity

export const fetchBlogsByPopularityStart = () => {
    return {
        type: actionTypes.FETCH_BLOGS_BY_POPULARITY_START
    }
}

export const fetchBlogsByPopularitySuccess = (posts, fetchLength) => {
    return {
        type: actionTypes.FETCH_BLOGS_BY_POPULARITY_SUCCESS,
        posts: posts,
        fetchLength: fetchLength
    }
}

export const fetchBlogsByPopularityFail = (error) => {
    return {
        type: actionTypes.FETCH_BLOGS_BY_POPULARITY_FAIL,
        error: error
    }
}

export const fetchBlogsByPopularity = (pageIndex) =>  async dispatch => {
    dispatch(fetchBlogsByPopularityStart());

    const res = await axios.get('/api/fetch_blogs_by_popularity', {params: { pageIndex: pageIndex }});

    if(res.data.blogs) {
        dispatch(fetchBlogsByPopularitySuccess(res.data.blogs, res.data.blogs.length))
    } else if (res.data.error) {
        dispatch(fetchBlogsByPopularityFail(res.data.error))
    }
}

export const fetchMoreBlogsByPopularityStart = () => {
    return {
        type: actionTypes.FETCH_MORE_BLOGS_BY_POPULARITY_START
    }
}

export const fetchMoreBlogsByPopularitySuccess = (updatedPosts, fetchLength) => {
    return {
        type: actionTypes.FETCH_MORE_BLOGS_BY_POPULARITY_SUCCESS,
        updatedPosts: updatedPosts,
        fetchLength: fetchLength
    }
}

export const fetchMoreBlogsByPopularityFail = (error) => {
    return {
        type: actionTypes.FETCH_MORE_BLOGS_BY_POPULARITY_FAIL,
        error: error
    }
}

export const fetchMoreBlogsByPopularity = (pageIndex, blogPosts) => async dispatch => {
    dispatch(fetchMoreBlogsByPopularityStart());

    const res = await axios.get('/api/fetch_blogs_by_popularity', {params: { pageIndex: pageIndex }});

    if(res.data.blogs) {
        let updatedPosts = [...blogPosts, ...res.data.blogs];
        dispatch(fetchMoreBlogsByPopularitySuccess(updatedPosts, res.data.blogs.length))
    } else if (res.data.error) {
        dispatch(fetchMoreBlogsByPopularityFail(res.data.error))
    }
}

// fetch blog by recent

export const fetchBlogsByRecentStart = () => {
    return {
        type: actionTypes.FETCH_BLOGS_BY_RECENT_START
    }
}

export const fetchBlogsByRecentSuccess = (posts, fetchLength) => {
    return {
        type: actionTypes.FETCH_BLOGS_BY_RECENT_SUCCESS,
        posts: posts,
        fetchLength: fetchLength
    }
}

export const fetchBlogsByRecentFail = (error) => {
    return {
        type: actionTypes.FETCH_BLOGS_BY_RECENT_FAIL,
        error: error
    }
}

export const fetchBlogsByRecent = (pageIndex) =>  async dispatch => {
    dispatch(fetchBlogsByRecentStart());

    const res = await axios.get('/api/fetch_blogs_by_recent', {params: { pageIndex: pageIndex }});

    if(res.data.blogs) {
        dispatch(fetchBlogsByRecentSuccess(res.data.blogs, res.data.blogs.length))
    } else if (res.data.error) {
        dispatch(fetchBlogsByRecentFail(res.data.error))
    }
}

export const fetchMoreBlogsByRecentStart = () => {
    return {
        type: actionTypes.FETCH_MORE_BLOGS_BY_RECENT_START
    }
}

export const fetchMoreBlogsByRecentSuccess = (updatedPosts, fetchLength) => {
    return {
        type: actionTypes.FETCH_MORE_BLOGS_BY_RECENT_SUCCESS,
        updatedPosts: updatedPosts,
        fetchLength: fetchLength
    }
}

export const fetchMoreBlogsByRecentFail = (error) => {
    return {
        type: actionTypes.FETCH_MORE_BLOGS_BY_RECENT_FAIL,
        error: error
    }
}

export const fetchMoreBlogsByRecent = (pageIndex, blogPosts) => async dispatch => {
    dispatch(fetchMoreBlogsByRecentStart());

    const res = await axios.get('/api/fetch_blogs_by_recent', {params: { pageIndex: pageIndex }});

    if(res.data.blogs) {
        let updatedPosts = [...blogPosts, ...res.data.blogs];
        dispatch(fetchMoreBlogsByRecentSuccess(updatedPosts, res.data.blogs.length))
    } else if (res.data.error) {
        dispatch(fetchMoreBlogsByRecentFail(res.data.error))
    }
}


//  unpublish blog post

export const unpublishPostStart = () => {
    return {
        type: actionTypes.UNPUBLISH_POST_START
    }
}

export const unpublishPostSuccess = (successInfo) => {
    return {
        type: actionTypes.UNPUBLISH_POST_SUCCESS,
        successInfo: successInfo
    }
}

export const unpublishPostFail = (error) => {
    return {
        type: actionTypes.UNPUBLISH_POST_FAIL,
        error: error
    }
}

export const unpublishPost = (postId) => async dispatch => {
    dispatch(unpublishPostStart());

    const res = await axios.post('/api/unpublish_blog_post', {postId: postId});

    if (res.data.post) {
        dispatch(unpublishPostSuccess('Post Unpublished'));
    } else if (res.data.error) {
        dispatch(unpublishPostFail(res.data.error)); 
    }
}

export const increaseBlogPostViewSuccess = (updatedRecentlyViewedBlogs) => {
    return {
        type: actionTypes.INCREASE_BLOG_POST_VIEW_SUCCESS,
        updatedRecentlyViewedBlogs: updatedRecentlyViewedBlogs
    }
}

export const increaseBlogPostView = (postId, updatedViews, updatedRecentlyViewedBlogs) => async dispatch => {
    const res = await axios.put('/api/increase_post_viewCount', {postId: postId, updatedViews: updatedViews})

    if (res.data.successInfo === 'view count succesfully updated') {
        dispatch(increaseBlogPostViewSuccess(updatedRecentlyViewedBlogs));
    }
}

// fetch user blog saves

export const fetchUserBlogSavesStart = () => {
    return {
        type: actionTypes.FETCH_USER_BLOG_SAVES_START
    }
}

export const fetchUserBlogSavesSuccess = (userBlogSaves) => {
    return {
        type: actionTypes.FETCH_USER_BLOG_SAVES_SUCCESS,
        userBlogSaves: userBlogSaves
    }
}

export const fetchUserBlogSavesFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_BLOG_SAVES_FAIL,
        error: error
    }
}

export const fetchUserBlogSaves = (userId) => async dispatch => {
    dispatch(fetchUserBlogSavesStart())

    const res = await axios.get('/api/fetch_user_blog_saves', { params: { userId: userId}});

    if (res.data.blogs) {
        dispatch(fetchUserBlogSavesSuccess(res.data.blogs));
    } else if (res.data.error) {
        dispatch(fetchUserBlogSavesFail(res.data.error))
    }
}

export const removeSavedBlogStart = (blogId) => {
    return {
        type: actionTypes.REMOVE_SAVED_BLOG_START,
        blogId: blogId
    }
}

export const removeSavedBlogFail = (error) => {
    return {
        type: actionTypes.REMOVE_SAVED_BLOG_FAIL,
        error: error
    }
}

export const removeSavedBlogSuccess = (updatedUserBlogSaves) => {
    return {
        type: actionTypes.REMOVE_SAVED_BLOG_SUCCESS,
        updatedUserBlogSaves: updatedUserBlogSaves
    }
}

export const removeSavedBlog = (blogId, userId, blogSavesId, userBlogSaves) => async dispatch => {
    dispatch(removeSavedBlogStart(blogId));

    let updatedBlogSavesId = blogSavesId.filter(id => id !== blogId);

    const res = await axios.put('/api/remove_saved_blog', {updatedBlogSavesId: updatedBlogSavesId, userId: userId});

    if(res.data.successMessage === 'user blog saves updated') {
        let updatedUserBlogSaves = userBlogSaves.filter(blog => blog._id !== blogId);

        dispatch(removeSavedBlogSuccess(updatedUserBlogSaves))
    } else if (res.data.error) {
        console.log(res.data.error);
        dispatch(removeSavedBlogFail(res.data.error));
    }
}

