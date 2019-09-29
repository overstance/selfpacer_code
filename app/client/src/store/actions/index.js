export {
    fetchUser,
    loginUser,
    registerUser,
    emailVerified,
    reverifyEmail,
    clearReverifyEmailError,
    // setAuthRedirectPath,
    clearErrors,
    logout,
    forgotPassword,
    clearForgetPasswordError,
    confirmResetToken,
    resetPassword,
    setAuthentication,
    clearAuth,
    clearAllAuthMessages,
    setIsBlogPage,
    unsetIsBlogPage
} from './auth';
export {
    fetchSubjects,
    increaseViews,
    setActiveContentType,
    setSelectedCategory,
    setLikedResource,
    // setClickedSubjectTitle
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
    /* removeAdmin, */
    addFacilitator,
    removeFacilitator,
    addSubjectIcon,
    fetchSelectSubjectInfo,
    editSubject,
    clearAllAdminMessages,
    clearEditSubjectInfo,
    resetAddSubjectIconState,
    addSubject,
    clearAddSubjectState,
    deleteSubject,
    clearDeleteSubjectInfo,
    fetchFacilitateApplicants,
    fetchMoreFacilitateApplicants,
    approveFacilitateApplicant,
    disapproveFacilitateApplicant,
    fetchUserByAttribute,
    clearFetchUserByAttributeInfo,
    addAdminType,
    clearAddAuthorOrEditorInfo,
    removeAdminType,
    clearRemoveAdminTypeInfo
} from './admin1';

export {
    // addResource,
    // fetchResourceById,
    setClickedPlatform,
    resourceLiked,
    updateUserRecentlyViewed,
    updateUserLikeCount,
    increaseResourceViewCount,
    fetchUserAssets,
    fetchMoreAdminAssetsByPlatform,
    fetchAdminAssetsByPlatform,
    fetchMoreAssets,
    // fetchRecentlyViewedResources,
    fetchUnconfirmed,
    fetchMoreUnconfirmed,
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
    clearAddResourceMessages
} from './resource';

export {
    setSelectedMenu,
    // fetchToCollectResource,
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
    resetEditProfileMessages,
    becomeFacilitator
} from './profile';

export {
    fetchBlogPost,
    uploadBlogImage,
    uploadWebBlogImage,
    clearUploadBlogImageState,
    loadAllBlogDrafts,
    createBlogDraft,
    updateBlogDraft,
    deleteBlogDraft,
    publishBlogDraft,
    deleteHeroImage,
    editBlogCategories,
    editBlogTags,
    initializeCategories,
    initializeTags,
    clearEditBlogFiltersInfo,
    fetchBlogCategories,
    fetchBlogTags,
    fetchAuthors,
    fetchFeaturedBlogs,
    fetchBlogComments,
    postUserComment,
    postUserCommentReply,
    clearBlogPostMessages,
    replyingComment,
    cancelReply,
    saveBlog,
    fetchBlogsBySection,
    fetchMoreBlogsBySection,
    fetchMoreInCategory,
    clearBlogHomeMessages,
    clearBlogSectionMessages,
    unpublishPost,
    increaseBlogPostView,
    fetchBlogsByPopularity,
    fetchMoreBlogsByPopularity,
    fetchBlogsByRecent,
    fetchMoreBlogsByRecent
} from './blog';

export {
    fetchConversations
} from './conversation';


