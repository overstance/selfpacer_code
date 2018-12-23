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
    resetPassword
} from './auth';
export {
    fetchSubjects,
    fetchCreativeSubjects,
    fetchBusinessSubjects,
    fetchTechnologySubjects,
    fetchLifeStyleSubjects,
    increaseViews,
    setActiveContentType,
    setSelectedCategory,
    setLikedResource
} from './explore';
export {
    fetchAccounting,
    fetchAllAccounting,
    fetchAnimation,
    fetchAllAnimation
} from './clickedSubject';
export {
    addAdminUser,
    removeAdminUser,
    addYoutubePlaylist,
    addYoutubeVideo,
    updateYoutubeVideos,
    updateYoutubePlaylists,
    addMooc,
    clearAddMoocFeedbacks,
    addBooks,
    clearAddBooksFeedbacks,
    onAddSubjectIcon/* this action is pending */
} from './admin1';

export {
    addResource,
    fetchResourceById,
    setClickedPlatform,
    resourceLiked,
    updateUserRecentlyViewed,
    updateUserLikeCount,
    increaseResourceViewCount,
    fetchUserAssets
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

export {
    editProfile,
    changePassword,
    resetEditProfileMessages
} from './profile';


