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
    clearAuth
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
    /* fetchAccounting,
    fetchAllAccounting,
    fetchAnimation,
    fetchAllAnimation,
    fetchArchitecture,
    fetchAllArchitecture,
    fetchAudio,
    fetchAllAudio,
    fetchBeauty,
    fetchAllBeauty,
    fetchCloud,
    fetchAllCloud,
    fetchCommunication,
    fetchAllCommunication,
    fetchCustomer,
    fetchAllCustomer,
    fetchData,
    fetchAllData,
    fetchDatabase,
    fetchAllDatabase,
    fetchDrawing,
    fetchAllDrawing,
    fetchFashion,
    fetchAllFashion,
    fetchFood,
    fetchAllFood,
    fetchGamedesign,
    fetchAllGamedesign,
    fetchGamedev,
    fetchAllGamedev,
    fetchGaming,
    fetchAllGaming,
    fetchGraphics,
    fetchAllGraphics,
    fetchHardware,
    fetchAllHardware,
    fetchHealth,
    fetchAllHealth,
    fetchHome,
    fetchAllHome,
    fetchInterface,
    fetchAllInterface,
    fetchInterior,
    fetchAllInterior,
    fetchManagement,
    fetchAllManagement,
    fetchMarketing,
    fetchAllMarketing,
    fetchMobile,
    fetchAllMobile,
    fetchModesign,
    fetchAllModesign,
    fetchMusic,
    fetchAllMusic,
    fetchNetwork,
    fetchAllNetwork,
    fetchPainting,
    fetchAllPainting,
    fetchPersonalDev,
    fetchAllPersonalDev,
    fetchPet,
    fetchAllPet,
    fetchPhotography,
    fetchAllPhotography,
    fetchProfDev,
    fetchAllProfDev,
    fetchRealEstate,
    fetchAllRealEstate,
    fetchSoftware,
    fetchAllSoftware,
    fetchStudySkill,
    fetchAllStudySkill,
    fetchTravel,
    fetchAllTravel,
    fetchTeachingSkill,
    fetchAllTeachingSkill,
    fetchVideo,
    fetchAllVideo,
    fetchWebDesign,
    fetchAllWebDesign,
    fetchWebdev,
    fetchAllWebdev,
    fetchWriting,
    fetchAllWriting, */
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
    // fetchSharedCollections,
    fetchSharedCollectionsBySpec,
    pinCollection,
    unpinCollection,
    fetchUserPinnedCollections
} from './collection';

export {
    editProfile,
    changePassword,
    resetEditProfileMessages
} from './profile';


