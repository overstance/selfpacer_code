export {
    fetchUser,
    loginUser,
    registerUser,
    emailVerified,
    reverifyEmail,
    clearReverifyEmailError,
    setAuthRedirectPath,
    clearErrors,
    logout,
    forgotPassword,
    clearForgetPasswordError,
    confirmResetToken,
    resetPassword,
    setAuthentication,
    clearAuth,
    clearAllAuthMessages
} from './auth';
export {
    fetchSubjects,
    increaseViews,
    setActiveContentType,
    setSelectedCategory,
    setLikedResource,
    setClickedSubjectTitle
} from './explore';
export {
    fetchSubjectDetails,
    fetchSubjectResources,
    fetchResourcesByPlatform,
    fetchMoreResources,
    fetchMoreResourcesByPlatform
} from './clickedSubject';
export {
    addAdminUser,
    removeAdminUser,
    onAddSubjectIcon,
    fetchSelectSubjectInfo,
    editSubject,
    clearAddMessages
} from './admin1';

export {
    addResource,
    fetchResourceById,
    setClickedPlatform,
    resourceLiked,
    updateUserRecentlyViewed,
    updateUserLikeCount,
    increaseResourceViewCount,
    fetchUserAssets,
    fetchAdminAssetsByPlatform,
    fetchRecentlyViewedResources,
    fetchUnconfirmed,
    confirmResource,
    deleteUnconfirmedResource,
    setAssetToUpdateField,
    updateMoocAsset,
    updateBookAsset,
    deleteAsset,
    clearUpdateAssetMessages,
    updateYoutubeAsset,
    addYoutubePlaylist,
    addYoutubeVideo,
    updateYoutubeVideos,
    updateYoutubePlaylists,
    addMooc,
    addBooks,
} from './resource';

export {
    setSelectedMenu,
    fetchToCollectResource,
    createCollection,
    setToCollectResource,
    resetCollectionMessages,
    fetchUserCollections,
    addResourceToCollection,
    clearAddToCollectionMessages,
    resourceAlreadyAdded,
    fetchCollectionById,
    fetchCollectionAttributes,
    setClickedCollectionAttributes,
    deleteCollectionItem,
    editCollection,
    clearEditCollectionMessages,
    publishCollection,
    clearPublishCollectionMessages,
    unpublishCollection,
    deleteCollection,
    clearDeleteCollectionMessages,
    fetchSharedCollectionsBySpec,
    fetchFeaturedCollectionsBySpec,
    pinCollection,
    unpinCollection,
    fetchUserPinnedCollections,
    clearResourceToCollect,
    featureCollection,
    unfeatureCollection,
    clearPinCollectionMessages
} from './collection';

export {
    editProfile,
    changePassword,
    resetEditProfileMessages
} from './profile';


