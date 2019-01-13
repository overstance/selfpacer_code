// AUTH ACTIONS
export const FETCH_USER = 'FETCH_USER';
export const AUTH_START = 'AUTH_START';
export const AUTH_FAIL = 'AUTH_FAIL';

export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const REGISTER_USER = 'REGISER_USER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const EMAIL_VERIFY_SUCCESS = 'EMAIL_VERIFY_SUCCESS';

export const VERIFIFICATION_REQUIRED = 'VERIFIFICATION_REQUIRED';

export const FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START';
export const RESET_EMAIL_SENT = 'RESET_EMAIL_SENT';
export const RESET_EMAIL_FAILED = 'RESET_EMAIL_FAILED';
export const CLEAR_FORGOT_PASSWORD_ERROR = 'CLEAR_FORGOT_PASSWORD_ERROR';

export const REVERIFY_EMAIL_START = 'REVERIFY_EMAIL_START';
export const REVERIFY_EMAIL_SENT = 'REVERIFY_EMAIL_SENT';
export const REVERIFY_EMAIL_FAILED = 'REVERIFY_EMAIL_FAILED';
export const CLEAR_REVERIFY_EMAIL_ERROR = 'CLEAR_REVERIFY_EMAIL_ERROR';

export const CONFIRM_RESET_TOKEN_START = 'CONFIRM_RESET_TOKEN_START';
export const CONFIRM_RESET_TOKEN_SUCCESS = 'CONFIRM_RESET_TOKEN_SUCCESS';
export const CONFIRM_RESET_TOKEN_FAILED = 'CONFIRM_RESET_TOKEN_FAILED';

export const RESET_PASSWORD_START = 'RESET_PASSWORD_START';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const VALIDATION_ERRORS = 'VALIDATION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const SET_USER_LIKE_COUNT = 'SET_USER_LIKE_COUNT';
export const UPDATE_USER_LIKE_COUNT = 'UPDATE_USER_LIKE_COUNT';


// PROFILE ACTIONS
export const EDIT_PROFILE_START = 'EDIT_PROFILE_START';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILED = 'EDIT_PROFILE_FAILED';

export const CHANGE_PASSWORD_START = 'CHANGE_PASSWORD_START';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED';

export const RESET_EDIT_PROFILE_MESSAGES = 'RESET_EDIT_PROFILE_MESSAGES';


//EXPLORE ACTIONS
export const FETCH_SUBJECTS_START = 'FETCH_SUBJECTS_START';
export const FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS';
export const FETCH_SUBJECTS_FAIL = 'FECTH_SUBJECTS_FAIL';

export const UPDATE_CLICKED_SUBJECT = 'UPDATE_CLICKED_SUBJECT';

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

export const SET_ACTIVE_CONTENT_TYPE = 'SET_ACTIVE_CONTENT_TYPE';

export const SET_CLICKED_PLATFORM = 'SET_CLICKED_PLATFORM';

export const SET_LIKED_RESOURCE = 'SET_LIKED_RESOURCE';


// CLICKED SUBJECT ACTIONS
export const FETCH_CLICKEDSUBJECT_START = 'FETCH_CLICKEDSUBJECT_START';
export const FETCH_CLICKEDSUBJECT_SUCCESS = 'FETCH_CLICKEDSUBJECT_SUCCESS';
export const FETCH_CLICKEDSUBJECT_FAIL = 'FETCH_CLICKEDSUBJECT_FAIL';

export const FETCH_ALL_START = 'FETCH_ALL_START';
export const FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS';
export const FETCH_ALL_FAILED = 'FETCH_ALL_FAILED';

// ADMIN 1 ACTIONS

export const ADMIN_ADD_START = 'ADMIN_ADD_START';
export const ADMIN_USER_ADDED = 'ADMIN_USER_ADDED';
export const ADMIN_ADD_FAILED = 'ADMIN_ADD_FAILED';
export const ADMIN_USER_REMOVE_START = 'ADMIN_USER_REMOVE_START';
export const ADMIN_USER_REMOVED = 'ADMIN_USER_REMOVED';
export const ADMIN_USER_REMOVED_FAILED = 'ADMIN_USER_REMOVED_FAILED';

export const YOUTUBE_PLAYLIST_ADD_START = 'YOUTUBE_PLAYLIST_ADD_START';
export const YOUTUBE_PLAYLIST_ADDED = 'YOUTUBE_PLAYLIST_ADDED';
export const YOUTUBE_PLAYLIST_ADD_FAILED = 'YOUTUBE_PLAYLIST_ADD_FAILED';

export const YOUTUBE_PLAYLISTS_UPDATE_START = 'YOUTUBE_PLAYLISTS_UPDATE_START';
export const YOUTUBE_PLAYLISTS_UPDATED = 'YOUTUBE_PLAYLISTS_UPDATED';
export const YOUTUBE_PLAYLISTS_UPDATE_FAILED = 'YOUTUBE_PLAYLISTS_UPDATE_FAILED';

export const YOUTUBE_VIDEO_ADD_START = 'YOUTUBE_VIDEO_ADD_START';
export const YOUTUBE_VIDEO_ADDED = 'YOUTUBE_VIDEO_ADDED';
export const YOUTUBE_VIDEO_ADD_FAILED = 'YOUTUBE_VIDEO_ADD_FAILED';

export const YOUTUBE_VIDEOS_UPDATE_START = 'YOUTUBE_VIDEOS_UPDATE_START';
export const YOUTUBE_VIDEOS_UPDATED = 'YOUTUBE_VIDEOS_UPDATED';
export const YOUTUBE_VIDEOS_UPDATE_FAILED = 'YOUTUBE_VIDEOS_UPDATE_FAILED';

export const ADD_MOOC_SUCCESS = 'ADD_MOOC_SUCCESS';
export const ADD_MOOC_FAILED = 'ADD_MOOC_FAILED';
export const ADD_MOOC_START = 'ADD_MOOC_START';

export const ADD_BOOKS_START = 'ADD_BOOKS_START';
export const ADD_BOOKS_SUCCESS = 'ADD_BOOKS_SUCCESS';
export const ADD_BOOKS_FAILED = 'ADD_BOOKS_FAILED';

export const FETCH_SUBJECT_TO_EDIT_SUCCESS = 'FETCH_SUBJECT_TO_EDIT_SUCCESS';

export const EDIT_SUBJECT_START = 'EDIT_SUBJECT_START';
export const EDIT_SUBJECT_SUCCESS = 'EDIT_SUBJECT_SUCCESS';
export const EDIT_SUBJECT_FAIL = 'EDIT_SUBJECT_FAIL';

export const CLEAR_ADD_MESSAGES = 'CLEAR_ADD_MESSAGES';

// RESOURCE ACTIONS

export const ADD_RESOURCE_START = 'ADD_RESOURCE_START';
export const ADD_RESOURCE_SUCCESS = 'ADD_RESOURCE_SUCCESS';
export const ADD_RESOURCE_FAIL = 'ADD_RESOURCE_FAIL';

export const FETCH_RESOURCE_BY_ID_START = 'FETCH_RESOURCE_BY_ID_START';
export const FETCH_RESOURCE_BY_ID_SUCCESS = 'FETCH_RESOURCE_BY_ID_SUCCESS';
export const FETCH_RESOURCE_BY_ID_FAIL = 'FETCH_RESOURCE_BY_ID_FAIL';

export const FETCH_USER_ASSET_START = 'FETCH_USER_ASSET_START';
export const FETCH_USER_ASSET_SUCCESS = 'FETCH_USER_ASSET_SUCCESS';
export const FETCH_USER_ASSET_FAILED = 'FETCH_USER_ASSET_FAILED';

export const SET_USER_RECENTLY_VIEWED = 'SET_USER_RECENTLY_VIEWED';
export const UPDATE_USER_RECENTLY_VIEWED = 'UPDATE_USER_RECENTLY_VIEWED';

export const FETCH_RECENTLY_VIEWED_SUCCESS = 'FETCH_RECENTLY_VIEWED_SUCCESS';



// COLLECTIONS ACTIONS

export const SET_TO_COLLECT_RESOURCE = 'SET_TO_COLLECT_RESOURCE';

export const CREATE_COLLECTION_START = 'CREATE_COLLECTION_START';
export const CREATE_COLLECTION_SUCCESS = 'CREATE_COLLECTION_SUCCESS';
export const CREATE_COLLECTION_FAIL = 'CREATE_COLLECTION_FAIL';

export const RESET_COLLECTION_MESSAGES = 'RESET_COLLECTION_MESSAGES';

export const FETCH_USER_COLLECTIONS_START = 'FETCH_USER_COLLECTIONS_START';
export const FETCH_USER_COLLECTIONS_SUCCESS = 'FETCH_USER_COLLECTIONS_SUCCESS';
export const FETCH_USER_COLLECTIONS_FAIL = 'FETCH_USER_COLLECTIONS_FAIL';

export const FETCH_SHARED_COLLECTIONS_START = 'FETCH_SHARED_COLLECTIONS_START';
export const FETCH_SHARED_COLLECTIONS_SUCCESS = 'FETCH_SHARED_COLLECTIONS_SUCCESS';
export const FETCH_SHARED_COLLECTIONS_FAIL = 'FETCH_SHARED_COLLECTIONS_FAIL';

export const ADD_RESOURCE_TO_COLLECTION_SUCCESS = 'ADD_RESOURCE_TO_COLLECTION_SUCCESS';
export const ADD_RESOURCE_TO_COLLECTION_FAIL = 'ADD_RESOURCE_TO_COLLECTION_FAIL';

export const RESOURCE_ALREADY_ADDED = 'RESOURCE_ALREADY_ADDED';

export const CLEAR_ADD_TO_COLLECTION_MESSAGES = 'CLEAR_ADD_TO_COLLECTION_MESSAGES';

export const SET_CLICKED_COLLECTION_ATTRIBUTES = 'SET_CLICKED_COLLECTION_ATTRIBUTES';

export const FETCH_COLLECTION_BY_ID_START = 'FETCH_COLLECTION_BY_ID_START';
export const FETCH_COLLECTION_BY_ID_SUCCESS = 'FETCH_COLLECTION_BY_ID_SUCCESS';
export const FETCH_COLLECTION_BY_ID_FAIL = 'FETCH_COLLECTION_BY_ID_FAIL';

export const DELETE_COLLECTION_ITEM_FAIL = 'DELETE_COLLECTION_ITEM_FAIL';

export const EDIT_COLLECTION_START = 'EDIT_COLLECTION_START';
export const EDIT_COLLECTION_SUCCESS = 'EDIT_COLLECTION_SUCCESS';
export const EDIT_COLLECTION_FAIL = 'EDIT_COLLECTION_FAIL';

export const CLEAR_EDIT_COLLECTION_MESSAGES = 'CLEAR_EDIT_COLLECTION_MESSAGES';

export const PUBLISH_COLLECTION_START = 'PUBLISH_COLLECTION_START';
export const PUBLISH_COLLECTION_SUCCESS = 'PUBLISH_COLLECTION_SUCCESS';
export const PUBLISH_COLLECTION_FAIL = 'PUBLISH_COLLECTION_FAIL';

export const CLEAR_PUBLISH_COLLECTION_MESSAGES = 'CLEAR_PUBLISH_COLLECTION_MESSAGES';

export const DELETE_COLLECTION_START = 'DELETE_COLLECTION_START';
export const DELETE_COLLECTION_SUCCESS = 'DELETE_COLLECTION_SUCCESS';
export const DELETE_COLLECTION_FAIL = 'DELETE_COLLECTION_FAIL';

export const CLEAR_DELETE_COLLECTION_MESSAGES = 'CLEAR_DELETE_COLLECTION_MESSAGES';

export const PIN_COLLECTION_SUCCESS = 'PIN_COLLECTION_SUCCESS';

export const SET_USER_PINNED_COLLECTION = 'SET_USER_PINNED_COLLECTION';

export const FETCH_USER_PINNED_COLLECTION_START = 'FETCH_USER_PINNED_COLLECTION_START';
export const FETCH_USER_PINNED_COLLECTION_SUCCESS = 'FETCH_USER_PINNED_COLLECTION_SUCCESS';
export const FETCH_USER_PINNED_COLLECTION_FAIL = 'FETCH_USER_PINNED_COLLECTION_FAIL';





