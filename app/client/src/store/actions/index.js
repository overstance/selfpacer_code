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
    fetchResourcesByPlatform
} from './clickedSubject';
export {
    addAdminUser,
    removeAdminUser,
    addYoutubePlaylist,
    addYoutubeVideo,
    updateYoutubeVideos,
    updateYoutubePlaylists,
    addMooc,
    addBooks,
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
    fetchRecentlyViewedResources,
    fetchUnconfirmed,
    confirmResource,
    deleteUnconfirmedResource,
    setAssetToUpdateField,
    updateMoocAsset,
    updateBookAsset,
    deleteAsset,
    clearUpdateAssetMessages
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


