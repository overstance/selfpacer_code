import * as actionTypes from './actionTypes';
import axios from 'axios';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
} */

// Fetch Clicked Resource By id Info

export const fetchResourceById = (id) => async dispatch => {
    dispatch(fetchResourceByIdStart());

    const res = await axios.get('/api/fetch_resource_by_id', {params: { id: id}} )
    if (res.data.resource) {
        dispatch(fetchResourceByIdSuccess(res.data.resource));
    } else if (res.data.error) {
        dispatch(fetchResourceByIdFail(res.data.error));
    }
};

export const fetchResourceByIdStart = () => {
    return {
        type: actionTypes.FETCH_RESOURCE_BY_ID_START
    };
};

export const fetchResourceByIdSuccess = ( resource ) => {
    return {
        type: actionTypes.FETCH_RESOURCE_BY_ID_SUCCESS,
        resource: resource
    };
};

export const fetchResourceByIdFail = ( error ) => {
    return {
        type: actionTypes.FETCH_RESOURCE_BY_ID_FAIL,
        error: error
    };
};

export const clearFetchResouceByIdMessages = () => {
    return {
        type: actionTypes.CLEAR_FETCH_RESOURCE_BY_ID_MESSAGES
    }
}



// set Clicked Platform

export const setClickedPlatform = ( platform ) => {
    return {
        type: actionTypes.SET_CLICKED_PLATFORM,
        platform: platform
    };
};

//Increase resource likes count

export const resourceLiked = (id, likes) => {
    // console.log(category);
    return dispatch => {

        const resource = {
            resourceId: id,
            resourceLikes: likes + 1
        };

        axios.post('/api/resource_liked', resource)
        .then(res => {
            // console.log(res.data.resource.likes);
        })
        .catch(error => {console.log(error)}
        );
    }
};

// update user's 10 most recent liked 

export const updateUserRecentlyViewedResources = ( recentlyViewed ) => {
    return {
        type: actionTypes.UPDATE_USER_RECENTLY_VIEWED,
        recentlyViewed: recentlyViewed
    };
};

export const updateUserRecentlyViewed = (id, viewedResources, userId) => async dispatch => {

    if (viewedResources.length === 10) {
        
        let temp = viewedResources;

        temp.shift();

        temp.push(id)

        const updatedRecentlyViewedResources = temp;

        // console.log(updatedRecentlyViewedResources);

        const res = await axios.put('/api/update_user_liked_resources', {updatedRecentlyViewedResources: updatedRecentlyViewedResources, userId: userId})
        
        if (res.data === 'userRecentlyViewedUpdated') {
            dispatch( updateUserRecentlyViewedResources( updatedRecentlyViewedResources ));
        }
    } else if (viewedResources.length < 10) {
        
        let temp = viewedResources;

        temp.push(id);

        const updatedRecentlyViewedResources = temp;

        // console.log(updatedRecentlyViewedResources);

        const res = await axios.put('/api/update_user_liked_resources', {updatedRecentlyViewedResources: updatedRecentlyViewedResources, userId: userId})
        
        if (res.data === 'userRecentlyViewedUpdated') {
            dispatch( updateUserRecentlyViewedResources( updatedRecentlyViewedResources ));
        }
    }
};

// update user like count

export const updateUserLikedCount = ( newLikeCount ) => {
    return {
        type: actionTypes.UPDATE_USER_LIKE_COUNT,
        newLikeCount: newLikeCount
    };
};

export const updateUserLikeCount = ( userId, userLikeCount ) => async dispatch => {

        const info = {
            newLikeCount: userLikeCount + 1,
            userId: userId
        }

        const res = await axios.put('/api/update_user_like_count', info)
        if (res.data === 'userLikeCountUpdated') {        
            const newLikeCount = userLikeCount + 1;
            dispatch( updateUserLikedCount( newLikeCount ));
        }
};

// Fetch user assets(user added resources)

export const fetchUserAssetStart = () => {
    return {
        type: actionTypes.FETCH_USER_ASSET_START
    }
}

export const fetchUserAssetSuccess = ( userAssets, resourceLength ) => {
    return {
        type: actionTypes.FETCH_USER_ASSET_SUCCESS,
        userAssets: userAssets,
        resourceLength: resourceLength
    }
}

export const fetchUserAssetFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_USER_ASSET_FAILED,
        error: error
    }
}

export const fetchUserAssets = ( userId, useTypeContext, pageIndex ) => async(dispatch) => {
    
    // console.log(userId, pageIndex);

    dispatch(fetchUserAssetStart());
    const res = await axios.get('/api/fetch_user_assets', { params: {
        userId: userId,
        useTypeContext: useTypeContext,
        pageIndex: pageIndex
    }});

    if (res.data.resources) {
        // console.log(res.data.resources);
        let resourceLength = res.data.resources.length;
        dispatch(fetchUserAssetSuccess(res.data.resources, resourceLength));
    } else {
        // console.log(res.data)
        dispatch(fetchUserAssetFailed( res.data ));
    }

}

// fetch admin asset by platform

export const fetchAdminAssetsByPlatform = (platform, pageIndex) => async(dispatch) => {
    
    
    dispatch(fetchUserAssetStart());
    const res = await axios.get('/api/fetch_admin_assets_by_platform', { params: {
        platform: platform,
        pageIndex: pageIndex
    }});

    if (res.data.resources) {
        // console.log(res.data.resources);
        let resourceLength = res.data.resources.length;
        dispatch(fetchUserAssetSuccess(res.data.resources, resourceLength));
    } else {
        // console.log(res.data)
        dispatch(fetchUserAssetFailed( res.data ));
    }

}

//  fetch More assets

export const fetchMoreAssetsStart = () => {
    return {
        type: actionTypes.FETCH_MORE_ASSETS_START
    }
}

export const fetchMoreAssetsSuccess = ( userAssets, resourceLength ) => {
    return {
        type: actionTypes.FETCH_MORE_ASSETS_SUCCESS,
        userAssets: userAssets,
        resourceLength: resourceLength 
    }
}

export const fetchMoreAssetsFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_MORE_ASSETS_FAILED,
        error: error 
    }
}


export const fetchMoreAssets = (userId, useTypeContext, pageIndex, assets) => async dispatch => {
    dispatch(fetchMoreAssetsStart());

    const res = await axios.get('/api/fetch_user_assets', { params: {
        userId: userId,
        useTypeContext: useTypeContext,
        pageIndex: pageIndex
    }});

    if (res.data.resources) {
        let updatedResources = [...assets, ...res.data.resources]

        let resourceLength = res.data.resources.length;
        dispatch(fetchMoreAssetsSuccess(updatedResources, resourceLength));
    } else dispatch(fetchMoreAssetsFailed(res.data));
}

export const fetchMoreAdminAssetsByPlatform = ( platform, pageIndex, assets) => async dispatch => {
    // console.log( platform, pageIndex, assets);
    dispatch(fetchMoreAssetsStart());

    const res = await axios.get('/api/fetch_admin_assets_by_platform', { params: {
        platform: platform,
        pageIndex: pageIndex
    }});

    if (res.data.resources) {
        // const all = [...res.data.all];

        let updatedResources = [...assets, ...res.data.resources]

        // dispatch(fetchMoreAssetsSuccess(res.data.all));
        let resourceLength = res.data.resources.length;
        dispatch(fetchMoreAssetsSuccess(updatedResources, resourceLength));
    } else dispatch(fetchMoreAssetsFailed(res.data));
}

// Increase Resource view count

export const increaseResourceViewCount = ( id, views ) => async dispatch => {
    const resource = {
        resourceId: id,
        resourceViews: views + 1
    };

    // console.log(resource);

    await axios.put('/api/increase_resourceviews', resource); 

}

/* // fetch recently viewed resources

export const fetchRecentlyViewedSuccess = ( resources ) => {
    return {
        type: actionTypes.FETCH_RECENTLY_VIEWED_SUCCESS,
        resources: resources
    }
}

export const fetchRecentlyViewedResources = (userId) => async dispatch => {
    const res = await axios.get(`/api/recently_viewed/${userId}`);

        if ( res.data.resources) {

            let shuffledResources = shuffleArray(res.data.resources);
            dispatch(fetchRecentlyViewedSuccess(shuffledResources));
            // console.log(res2.data.resources);
        }
} */

// fetch Unconfirmed Resources

export const fetchUnconfirmedStart = () => {
   return {
    type: actionTypes.FETCH_UNCONFIRMED_RESOURCES_START
   } 
}

export const fetchUnconfirmedSuccess = (resources, resourceLength) => {
    return {
     type: actionTypes.FETCH_UNCONFIRMED_RESOURCES_SUCCESS,
     resources: resources,
     resourceLength: resourceLength

    } 
}

export const fetchUnconfirmedFail = () => {
    return {
        type: actionTypes.FETCH_UNCONFIRMED_RESOURCES_FAIL
    } 
}

export const fetchUnconfirmed = (pageIndex) => async dispatch => {
    dispatch(fetchUnconfirmedStart());

    const res = await axios.get('/api/unconfirmed_resources', { params: { pageIndex: pageIndex}});
    // console.log(res.data.resources);
    if (res.data.resources) {
        let resourceLength = res.data.resources.length;
        dispatch(fetchUnconfirmedSuccess(res.data.resources, resourceLength));
    } else {
        dispatch(fetchUnconfirmedFail());  
    }
}

// fetch more Unconfirmed Resources

export const fetchMoreUnconfirmedStart = () => {
    return {
     type: actionTypes.FETCH_MORE_UNCONFIRMED_RESOURCES_START
    } 
}
 
 export const fetchMoreUnconfirmedSuccess = (resources, resourceLength) => {
     return {
      type: actionTypes.FETCH_MORE_UNCONFIRMED_RESOURCES_SUCCESS,
      resources: resources,
      resourceLength: resourceLength
 
     } 
 }
 
 export const fetchMoreUnconfirmedFail = () => {
     return {
         type: actionTypes.FETCH_MORE_UNCONFIRMED_RESOURCES_FAIL
     } 
 }
 
 export const fetchMoreUnconfirmed = (pageIndex, unconfirmedResources) => async dispatch => {
     dispatch(fetchMoreUnconfirmedStart());
 
     const res = await axios.get('/api/unconfirmed_resources', { params: { pageIndex: pageIndex}});
 
     if (res.data.resources) {
        let updatedResources = [...unconfirmedResources, ...res.data.resources]
        let resourceLength = res.data.resources.length;
        dispatch(fetchMoreUnconfirmedSuccess(updatedResources, resourceLength));
     } else {
         dispatch(fetchMoreUnconfirmedFail());  
     }
}

export const confirmResourceStart = (resourceId) => {
    return {
     type: actionTypes.CONFIRM_RESOURCE_START,
     resourceId: resourceId
    } 
}

export const confirmResourceSuccess = (updatedResources) => {
    return {
     type: actionTypes.CONFIRM_RESOURCE_SUCCESS,
     updatedResources: updatedResources
    } 
}

export const confirmResourceFail = (error) => {
    return {
     type: actionTypes.CONFIRM_RESOURCE_FAIL,
     error: error
    } 
}

export const confirmResource = (resourceId, unconfirmedResources) => async dispatch => {
    dispatch(confirmResourceStart(resourceId));
    const info = {
        resourceId: resourceId
    }
    const res = await axios.put('/api/confirm_resource', info);

    if (res.data.resource._id === resourceId) {
        let updatedResources = unconfirmedResources.filter( resource => resource._id !== resourceId)
        dispatch(confirmResourceSuccess(updatedResources));
    } else if ( res.data.error) {
        dispatch(confirmResourceFail(res.data.error))
    }
}

export const deleteUnconfirmedStart = (resourceId) => {
    return {
     type: actionTypes.DELETE_UNCONFIRMED_START,
     resourceId: resourceId
    } 
}

export const deleteUnconfirmedSuccess = (updatedResources) => {
    return {
     type: actionTypes.DELETE_UNCONFIRMED_SUCCESS,
     updatedResources: updatedResources
    } 
}

export const deleteUnconfirmedFail = (error) => {
    return {
     type: actionTypes.DELETE_UNCONFIRMED_FAIL,
     error: error
    } 
}

export const deleteUnconfirmedResource = (resourceId, unconfirmedResources) => async dispatch => {
    dispatch(deleteUnconfirmedStart(resourceId));
    const res = await axios.delete('/api/delete_unconfirmed_resource', { params: { resourceId: resourceId }});

    if (res.data.resource._id === resourceId) {
        let updatedResources = unconfirmedResources.filter( resource => resource._id !== resourceId)
        dispatch(deleteUnconfirmedSuccess(updatedResources));
    } else if (res.data.error) {
        dispatch(deleteUnconfirmedFail(res.data.error));
    }
}

// set asset to update fields

export const setAssetToUpdateField = (assetToUpdateFields) => {
    return {
        type: actionTypes.SET_ASSET_TO_UPDATE_FIELDS,
        assetToUpdateFields: assetToUpdateFields
    }
}

//Add Youtube Playlist

export const youtubePlaylistAddStart = () => {
    return {
        type: actionTypes.YOUTUBE_PLAYLIST_ADD_START
    };
};

export const youtubePlaylistAdded = ( playlists, addCount ) => {
    return {
        type: actionTypes.YOUTUBE_PLAYLIST_ADDED,
        playlists: playlists,
        addCount: addCount
    };
};

export const youtubePlaylistAddFailed = ( error ) => {
    return {
        type: actionTypes.YOUTUBE_PLAYLIST_ADD_FAILED,
        error: error
    };
};

export const addYoutubePlaylist = (playlistId, subject, userId, userType) => async dispatch => {
    
    dispatch (youtubePlaylistAddStart());

    const asset = {
        id: playlistId,
        userId: userId,
        subject: subject,
        userType: userType
    };

    const res = await axios.post('/api/add_youtube_playlist', asset);

    if (res.data.seedData) {
        dispatch(youtubePlaylistAdded(res.data.seedData, res.data.seedData.length));
    } else if ( res.data === 'playlist not found!') {
        dispatch(youtubePlaylistAddFailed( res.data)); 
    } else if (res.data === 'resource already added!') {
        dispatch(youtubePlaylistAddFailed( res.data));
    } else {
        dispatch(youtubePlaylistAddFailed( 'error!'));
    }
};

//Update Youtube Playlists
export const youtubePlaylistsUpdateStart = () => {
    return {
        type: actionTypes.YOUTUBE_PLAYLISTS_UPDATE_START
    };
};

export const youtubePlaylistsUpdated = ( updateCount ) => {
    return {
        type: actionTypes.YOUTUBE_PLAYLISTS_UPDATED,
        updateCount: updateCount
    };
};

export const youtubePlaylistsUpdateFailed = ( error ) => {
    return {
        type: actionTypes.YOUTUBE_PLAYLISTS_UPDATE_FAILED,
        error: error
    };
};

export const updateYoutubePlaylists = (subject, user) => async dispatch => {
    dispatch (youtubePlaylistsUpdateStart());
    
    const Admin = {
        user: user,
        subject: subject
    };

    const res = await axios.put('/api/update_youtube_playlists', Admin)

    if (res.data.error) {
        dispatch(youtubePlaylistsUpdateFailed( res.data.error ));
    } else if (res.data.playlistIds) {
        dispatch(youtubePlaylistsUpdated(res.data.playlistIds.length));
    } else {
        dispatch(youtubePlaylistsUpdateFailed( 'Error' ));
    }
};

// Add Youtube Videos

export const youtubeVideoAddStart = () => {
    return {
        type: actionTypes.YOUTUBE_VIDEO_ADD_START
    };
};

export const youtubeVideoAdded = ( videos, addCount ) => {
    return {
        type: actionTypes.YOUTUBE_VIDEO_ADDED,
        addCount: addCount,
        videos: videos
    };
};

export const youtubeVideoAddFailed = ( error ) => {
    return {
        type: actionTypes.YOUTUBE_VIDEO_ADD_FAILED,
        error: error
    };
};

export const addYoutubeVideo = (videoId, subject, userId, userType) => async dispatch => {
    dispatch (youtubeVideoAddStart());
        
    const asset = {
        id: videoId,
        userId: userId,
        userType: userType,
        subject: subject
    };

    const res = await axios.post('/api/add_youtube_video', asset);
    if (res.data.seedData) {
        dispatch(youtubeVideoAdded(res.data.seedData, res.data.seedData.length));
    } else if (res.data === 'video not found!') {
        dispatch(youtubeVideoAddFailed( res.data));
    } else if (res.data === 'resource already added!') {
        dispatch(youtubeVideoAddFailed( res.data));
    } else {
        dispatch(youtubeVideoAddFailed( 'error!'))
    }  
};

//Update Youtube Video
export const youtubeVideosUpdateStart = () => {
    return {
        type: actionTypes.YOUTUBE_VIDEOS_UPDATE_START
    };
};

export const youtubeVideosUpdated = ( updateCount ) => {
    return {
        type: actionTypes.YOUTUBE_VIDEOS_UPDATED,
        updateCount: updateCount
    };
};

export const youtubeVideosUpdateFailed = ( error ) => {
    return {
        type: actionTypes.YOUTUBE_VIDEOS_UPDATE_FAILED,
        error: error
    };
};

export const updateYoutubeVideos = (subject, user) => async dispatch => {
    dispatch (youtubeVideosUpdateStart());
    
    const Admin = {
        user: user,
        subject: subject
    };
    
    const res = await axios.put('/api/update_youtube_videos', Admin);
    // console.log(res.data);
    if (res.data.error) {
        dispatch(youtubeVideosUpdateFailed( res.data.error ));
    } else if (res.data.videoIds) {
        dispatch(youtubeVideosUpdated(res.data.videoIds.length));
    } else {
        dispatch(youtubeVideosUpdateFailed( 'Error' ));
    } 
};

// update youtube asset

export const updateYoutubeAssetStart = (resourceId) => {
    return {
        type: actionTypes.UPDATE_YOUTUBE_ASSET_START,
        resourceId: resourceId
    }
}

export const updateYoutubeAssetSuccess = (resourceId, updatedAssets) => {
    return {
        type: actionTypes.UPDATE_YOUTUBE_ASSET_SUCCESS,
        resourceId: resourceId,
        updatedAssets: updatedAssets
    }
}

export const updateYoutubeAssetFailed = (resourceId) => {
    return {
        type: actionTypes.UPDATE_YOUTUBE_ASSET_FAIL,
        resourceId: resourceId
    }
}

export const updateYoutubeAsset = (resourceId, type, youtubeId, assets) => async dispatch => {
    
    dispatch(updateYoutubeAssetStart(resourceId));

    if (type === 'youtube#video') {
        // console.log(resourceId, type, youtubeId, assets)
        const res = await axios.put('/api/update_youtube_video_asset', { youtubeId: youtubeId, resourceId: resourceId });
        
        if (res.data.resource._id === resourceId) {
            // console.log(res.data.resource._id);
            const index = assets.findIndex(resource => resource._id === res.data.resource._id);
            let updatedAssets;

            if (index !== -1) {
                updatedAssets = [...assets];
                updatedAssets[index] = res.data.resource;
            }

            dispatch(updateYoutubeAssetSuccess(res.data.resource._id, updatedAssets));
        } else {
            // console.log(res.data);
            dispatch(updateYoutubeAssetFailed(resourceId));
        }
    } else if (type === 'youtube#playlist') {
        const res = await axios.put('/api/update_youtube_playlist_asset', { youtubeId: youtubeId });

        if (res.data.resource._id === resourceId) {

            const index = assets.findIndex(resource => resource._id === res.data.resource._id);
            let updatedResources;

            if (index !== -1) {
                updatedResources = [...assets];
                updatedResources[index] = res.data.resource;
            }

            dispatch(updateYoutubeAssetSuccess(res.data.resource._id, updatedResources));
        } else {
            dispatch(updateYoutubeAssetFailed(resourceId));
        }
    }
}

// ADD MOOC RESOURCE

export const addMoocStart = () => {
    return {
        type: actionTypes.ADD_MOOC_START
    }
}

export const addMoocSuccess = (info) => {
    return {
        type: actionTypes.ADD_MOOC_SUCCESS,
        info: info
    }
}

export const addMoocFailed = (error) => {
    return {
        type: actionTypes.ADD_MOOC_FAILED,
        error: error
    }
}

export const addMooc = (subject, title, url, imageUrl, source, videoCount, tutor, enrollees, duration, level, lastUpdated, avgRating, userId, userType) => async dispatch => {
    dispatch(addMoocStart());

    let imageLink = imageUrl;
    let updateTime = lastUpdated;
    let rating = avgRating;

    if (imageUrl === '') {
        imageLink = undefined
    }

    if (lastUpdated === '') {
        updateTime = undefined
    }

    if (avgRating === '') {
        rating = undefined
    }

    const info = {
        subject: subject,
        title: title,
        url: url,
        imageUrl: imageLink,
        source: source,
        videoCount: videoCount,
        tutor: tutor,
        enrollees: numberWithCommas(enrollees),
        duration: duration,
        level: level,
        lastUpdated: updateTime,
        avgRating: rating,
        userId: userId,
        userType: userType
    }

    const res = await axios.post('/api/add_mooc', info);

    if (res.data.resource) {
        dispatch(addMoocSuccess('resource added!'));
        // console.log(res.data);
    } else {
        dispatch(addMoocFailed(res.data));
        // console.log(res.data);
    }
}

// update mooc asset

export const updateMoocAssetStart = () => {
    return {
        type: actionTypes.UPDATE_MOOC_ASSET_START
    }
}

export const updateMoocAssetSuccess = (info, updatedAssets) => {
    return {
        type: actionTypes.UPDATE_MOOC_ASSET_SUCCESS,
        info: info,
        updatedAssets: updatedAssets
    }
}

export const updateMoocAssetFailed = (error) => {
    return {
        type: actionTypes.UPDATE_MOOC_ASSET_FAIL,
        error: error
    }
}

export const updateMoocAsset = (videoCount, enrollees, duration, level, lastUpdated, avgRating, agent, resourceId, assets) => async dispatch => {
    dispatch(updateMoocAssetStart());

    let updateTime = lastUpdated;
    let rating = avgRating;

    if (lastUpdated === '') {
        updateTime = undefined
    }

    if (avgRating === '') {
        rating = undefined
    }

    const info = {
        videoCount: videoCount,
        enrollees: numberWithCommas(enrollees),
        duration: duration,
        level: level,
        lastUpdated: updateTime,
        avgRating: rating,
        agent: agent,
        resourceId: resourceId
    }

    const res = await axios.put('/api/update_mooc_asset', info);

    if (res.data.resource._id === resourceId) {
        const index = assets.findIndex(resource => resource._id === res.data.resource._id);
        let updatedAssets;

        if (index !== -1) {
            updatedAssets = [...assets];
            updatedAssets[index] = res.data.resource;
        }
        dispatch(updateMoocAssetSuccess('Asset updated.', updatedAssets));
    } else {
        dispatch(updateMoocAssetFailed(res.data));
    }
}

// ADD BOOK RESOURCE

export const addBooksStart = () => {
    return {
        type: actionTypes.ADD_BOOKS_START
    }
}

export const addBooksSuccess = (info) => {
    return {
        type: actionTypes.ADD_BOOKS_SUCCESS,
        info: info
    }
}

export const addBooksFailed = (error) => {
    return {
        type: actionTypes.ADD_BOOKS_FAILED,
        error: error
    }
}

export const addBooks = (subject, title, url, imageUrl, source, author, level, avgRating, userId, userType) => async dispatch => {
    dispatch(addBooksStart());

    let imageLink = imageUrl;
    let bookLevel = level;
    let rating = avgRating;

    if (imageUrl === '') {
        imageLink = undefined
    }

    if (level === '') {
        bookLevel = undefined
    }

    if (avgRating === '') {
        rating = undefined
    }

    const info = {
        subject: subject,
        title: title,
        url: url,
        imageUrl: imageLink,
        source: source,
        author: author,
        level: bookLevel,
        avgRating: rating,
        userId: userId,
        userType: userType
    }

    const res = await axios.post('/api/add_books', info);

    if (res.data.resource) {
        dispatch(addBooksSuccess('resource added!'));
        // console.log(res.data);
    } else {
        dispatch(addBooksFailed(res.data));
        // console.log(res.data);
    }
}

// update book asset

export const updateBookAssetStart = () => {
    return {
        type: actionTypes.UPDATE_BOOK_ASSET_START
    }
}

export const updateBookAssetSuccess = (info, updatedAssets) => {
    return {
        type: actionTypes.UPDATE_BOOK_ASSET_SUCCESS,
        info: info,
        updatedAssets: updatedAssets
    }
}

export const updateBookAssetFailed = (error) => {
    return {
        type: actionTypes.UPDATE_BOOK_ASSET_FAIL,
        error: error
    }
}

export const updateBookAsset = (level, avgRating, agent, resourceId, assets) => async dispatch => {
    dispatch(updateBookAssetStart());

    let updateLevel = level;
    let rating = avgRating;

    if (level === '') {
        updateLevel = undefined
    }

    if (avgRating === '') {
        rating = undefined
    }

    const info = {
        level: updateLevel,
        avgRating: rating,
        agent: agent,
        resourceId: resourceId
    }

    const res = await axios.put('/api/update_book_asset', info);

    if (res.data.resource._id === resourceId) {
        const index = assets.findIndex(resource => resource._id === res.data.resource._id);
        let updatedAssets;

        if (index !== -1) {
            updatedAssets = [...assets];
            updatedAssets[index] = res.data.resource;
        }

        dispatch(updateBookAssetSuccess('Asset updated.', updatedAssets));
        
        // console.log(res.data);
    } else {
        dispatch(updateBookAssetFailed(res.data));
        // console.log(res.data);
    }
}

// clear update asset message

export const clearUpdateAssetMessages = () => {
    return {
        type: actionTypes.CLEAR_UPDATE_ASSET_MESSAGE
    }
}

// delete asset 

export const deleteAssetStart = () => {
    return {
        type: actionTypes.DELETE_ASSET_START
    }
}

export const deleteAssetSuccess = (info, resources) => {
    return {
        type: actionTypes.DELETE_ASSET_SUCCESS,
        info: info,
        resources: resources
    }
}

export const deleteAssetFailed = (error) => {
    return {
        type: actionTypes.DELETE_ASSET_FAIL,
        error: error
    }
}

export const deleteAsset = ( resourceId, userAssets ) => async dispatch => {
    dispatch(deleteAssetStart());

    const res = await axios.delete('/api/delete_asset', { params: { resourceId: resourceId }});

    if (res.data.resource._id === resourceId) {
        let updatedAssets = userAssets.filter(asset => asset._id !== resourceId)
        dispatch(deleteAssetSuccess('Asset deleted.', updatedAssets));
        // console.log(res.data);
    } else if (res.data.error) {
        dispatch(deleteAssetFailed(res.data.error));
        // console.log(res.data);
    }
}

export const clearAddResourceMessages = () => {
    return {
        type: actionTypes.CLEAR_ADD_RESOURCE_MESSAGES
    }
}