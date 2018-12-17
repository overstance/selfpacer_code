import * as actionTypes from './actionTypes';
import axios from 'axios';


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
    return () => {
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

    if (res.data.resources.length >= 0) {
        // console.log(res.data.resources);
        dispatch(fetchUserAssetSuccess(res.data.resources));
    } else {
        // console.log(res.data)
        dispatch(fetchUserAssetFailed( res.data ));
    }

}