export {
    fetchUser,
    loginUser,
    registerUser,
    setAuthRedirectPath,
    clearErrors,
    logout,
} from './auth';
export {
    fetchSubjects,
    fetchCreativeSubjects,
    fetchBusinessSubjects,
    fetchTechnologySubjects,
    fetchLifeStyleSubjects,
    increaseViews,
    setActiveContentType,
    setSelectedCategory
} from './explore';
export {
    fetchAccounting,
} from './clickedSubject';
export {
    fetchYoutubeAccounting
} from './accounting';
export {
    addAdminUser,
    removeAdminUser,
    addYoutubePlaylist,
    addYoutubeVideo,
    updateYoutubeVideos,
    updateYoutubePlaylists
} from './admin1';

export {
    addResource,
    fetchResourceById,
    setClickedPlatform,
    resourceLiked,
    updateUserRecentlyViewed,
    updateUserLikeCount
    // setUserLikedResources
} from './resource';

export {
    fetchToCollectResource,
    createCollection,
    setToCollectResource,
    resetCollectionMessages,
    fetchUserCollections,
    addResourceToCollection,
    clearAddToCollectionMessages
} from './collection';


