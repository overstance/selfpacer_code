import * as actionTypes from './actionTypes';
import axios from 'axios';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



// Add user resource

export const addResourceSuccess = ( message ) => {
    return {
        type: actionTypes.ADD_RESOURCE_SUCCESS,
        message: message
    };
};

export const addResourceFail = ( error ) => {
    return {
        type: actionTypes.ADD_RESOURCE_FAIL,
        error: error
    };
};

export const addResourceStart = () => {
    return {
        type: actionTypes.ADD_RESOURCE_START
    };
};

export const addResource = ( link, subject, type, user, history ) => {
    return dispatch => {
        dispatch(addResourceStart());

        const resource = {
            subject: subject,
            link: link,
            type: type,
            userId: user._id
        }

        axios.post( '/api/add_resources', resource)
            .then(                
                res => {
                const message = res.data;
                if (res.data === 'Resource submitted!!') {
                    dispatch(addResourceSuccess(message));
                } else {
                    dispatch(addResourceFail(res.data));
                } 
                console.log(message);
            } )
            .catch( err => {
                dispatch(addResourceFail(err));
            } );
    };
};

// Fetch Clicked Resource By id Info

export const fetchResourceById = ( id, platform ) => {
    return dispatch => {
        dispatch(fetchResourceByIdStart());

        console.log(id, platform);

        if (platform === 'youtube#video' || 'youtube#playlist') {
            axios.get(`/api/youtube_accounting/${id}`)
            .then(  
                // res => {console.log(res.data);}              
                res => {
                // const youtubeAccounting = [...res.data.accountingRes];
                if (res.data.resource) {
                    dispatch(fetchResourceByIdSuccess(res.data.resource));
                } else {
                    dispatch(fetchResourceByIdFail(res.data));
                };     
            } )
            .catch( err => {
                dispatch(fetchResourceByIdFail(err));
            } );

        }
    };
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

export const updateUserRecentlyViewed = (id, viewedResources, userId) => {
    // console.log(category);
    return dispatch => {

        if (viewedResources.length === 10) {
            
            let temp = viewedResources;

            temp.shift();

            temp.push(id)

            const updatedRecentlyViewedResources = temp;

            // console.log(updatedRecentlyViewedResources);

            axios.post(`/api/user_liked_resources/${userId}`, updatedRecentlyViewedResources)
            .then(res => {
                // console.log(res.data);
                if (res.data === 'userRecentlyViewedUpdated') {
                    dispatch( updateUserRecentlyViewedResources( updatedRecentlyViewedResources ));
                }

            })
            .catch(error => {console.log(error)}
            );
        }

        if (viewedResources.length < 10) {
            
            let temp = viewedResources;

            temp.push(id);

            const updatedRecentlyViewedResources = temp;

            // console.log(updatedRecentlyViewedResources);

            axios.post(`/api/user_liked_resources/${userId}`, updatedRecentlyViewedResources)
            .then(res => {
                if (res.data === 'userRecentlyViewedUpdated') {
                    dispatch( updateUserRecentlyViewedResources( updatedRecentlyViewedResources ));
                }
                // console.log(res.data);
            })
            .catch(error => {console.log(error)}
            );
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

export const updateUserLikeCount = ( userId, userLikeCount ) => {
    // console.log(userId, userLikeCount);

    return dispatch => {
        const updatedLikeCount = {
            newLikeCount: userLikeCount + 1
        }

        // console.log(updatedLikeCount);

        axios.post(`/api/update_user_liked_count/${userId}`, updatedLikeCount)
        .then(res => {
            // console.log(res.data);
            if (res.data === 'userLikeCountUpdated') {
                
                const newLikeCount = userLikeCount + 1;

                // console.log(newLikeCount);

                dispatch( updateUserLikedCount( newLikeCount ));
            }
        })
        .catch(error => {console.log(error)}
        );       
    }
};

// Fetch user assets(user added resources)

export const fetchUserAssetStart = () => {
    return {
        type: actionTypes.FETCH_USER_ASSET_START
    }
}

export const fetchUserAssetSuccess = ( userAssets ) => {
    return {
        type: actionTypes.FETCH_USER_ASSET_SUCCESS,
        userAssets: userAssets
    }
}

export const fetchUserAssetFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_USER_ASSET_FAILED,
        error: error
    }
}

export const fetchUserAssets = ( userId ) => async(dispatch) => {
    
    
    dispatch(fetchUserAssetStart());
    const res = await axios.get(`/api/user_assets/${userId}`);

    if (res.data.resources) {
        // console.log(res.data.resources);
        dispatch(fetchUserAssetSuccess(res.data.resources));
    } else {
        // console.log(res.data)
        dispatch(fetchUserAssetFailed( res.data ));
    }

}

// Increase Resource view count

export const increaseResourceViewCount = ( id, views ) => async dispatch => {
    const resource = {
        resourceId: id,
        resourceViews: views + 1
    };

    console.log(resource);

    await axios.post('/api/increase_resourceviews', resource); 

}

// fetch recently viewed resources

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
}

// fetch Unconfirmed Resources

export const fetchUnconfirmedStart = () => {
   return {
    type: actionTypes.FETCH_UNCONFIRMED_RESOURCES_START
   } 
}

export const fetchUnconfirmedSuccess = (resources) => {
    return {
     type: actionTypes.FETCH_UNCONFIRMED_RESOURCES_SUCCESS,
     resources: resources
    } 
}

export const fetchUnconfirmedFail = () => {
    return {
        type: actionTypes.FETCH_UNCONFIRMED_RESOURCES_FAIL
    } 
}

export const fetchUnconfirmed = () => async dispatch => {
    dispatch(fetchUnconfirmedStart());

    const res = await axios.get('/api/unconfirmed_resources');

    if (res.data.resources) {
        dispatch(fetchUnconfirmedSuccess(res.data.resources));
    } else {
        dispatch(fetchUnconfirmedFail());  
    }
}

export const confirmResource = (resourceId) => async dispatch => {
    // dispatch(fetchUnconfirmedStart());
    const info = {
        resourceId: resourceId
    }
    const res = await axios.put('/api/confirm_resource', info);

    if (res.data.resources) {
        dispatch(fetchUnconfirmedSuccess(res.data.resources));
    }
}

export const deleteUnconfirmedResource = (resourceId) => async dispatch => {
    // dispatch(fetchUnconfirmedStart());
    const res = await axios.delete(`/api/delete_resource/${resourceId}`);

    if (res.data.resources) {
        dispatch(fetchUnconfirmedSuccess(res.data.resources));
    }
}

// set asset to update fields

export const setAssetToUpdateField = (assetToUpdateFields) => {
    return {
        type: actionTypes.SET_ASSET_TO_UPDATE_FIELDS,
        assetToUpdateFields: assetToUpdateFields
    }
}

// update mooc asset

export const updateMoocAssetStart = () => {
    return {
        type: actionTypes.UPDATE_MOOC_ASSET_START
    }
}

export const updateMoocAssetSuccess = (info, resources) => {
    return {
        type: actionTypes.UPDATE_MOOC_ASSET_SUCCESS,
        info: info,
        resources: resources
    }
}

export const updateMoocAssetFailed = (error) => {
    return {
        type: actionTypes.UPDATE_MOOC_ASSET_FAIL,
        error: error
    }
}

export const updateMoocAsset = (videoCount, enrollees, duration, level, lastUpdated, avgRating, agent, resourceId) => async dispatch => {
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

    if (res.data.resources) {
        dispatch(updateMoocAssetSuccess('Asset updated.', res.data.resources));
        // console.log(res.data);
    } else {
        dispatch(updateMoocAssetFailed(res.data));
        // console.log(res.data);
    }
}

// update book asset

export const updateBookAssetStart = () => {
    return {
        type: actionTypes.UPDATE_BOOK_ASSET_START
    }
}

export const updateBookAssetSuccess = (info, resources) => {
    return {
        type: actionTypes.UPDATE_BOOK_ASSET_SUCCESS,
        info: info,
        resources: resources
    }
}

export const updateBookAssetFailed = (error) => {
    return {
        type: actionTypes.UPDATE_BOOK_ASSET_FAIL,
        error: error
    }
}

export const updateBookAsset = (level, avgRating, agent, resourceId) => async dispatch => {
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

    if (res.data.resources) {
        dispatch(updateBookAssetSuccess('Asset updated.', res.data.resources));
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