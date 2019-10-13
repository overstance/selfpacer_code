// INITIALIZATIONS
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_USER_SPECIALIZATION = 'SET_USER_SPECIALIZATION';
export const SET_USE_CONTEXT = 'SET_USE_CONTEXT';
export const CLEAR_INIT = 'CLEAR_INIT';

// AUTH ACTIONS
export const SET_USER = 'SET_USER';
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

export const CLEAR_ALL_AUTH_MESSAGES = 'CLEAR_ALL_AUTH_MESSAGES';

export const SET_USER_LIKE_COUNT = 'SET_USER_LIKE_COUNT';
export const SET_USER_RECENTLY_VIEWED = 'SET_USER_RECENTLY_VIEWED';
export const SET_USER_SAVED_BLOGS = 'SET_USER_SAVED_BLOGS';
export const SET_USER_PINNED_COLLECTION = 'SET_USER_PINNED_COLLECTION';
export const UPDATE_USER_LIKE_COUNT = 'UPDATE_USER_LIKE_COUNT';

export const CLEAR_AUTH = 'CLEAR_AUTH';

export const SET_IS_BLOG_PAGE = 'SET_IS_BLOG_PAGE';
export const UNSET_IS_BLOG_PAGE = 'UNSET_IS_BLOG_PAGE';


// PROFILE ACTIONS
export const EDIT_PROFILE_START = 'EDIT_PROFILE_START';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILED = 'EDIT_PROFILE_FAILED';

export const CHANGE_PASSWORD_START = 'CHANGE_PASSWORD_START';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED';

export const BECOME_FACILITATOR_START = 'BECOME_FACILITATOR_START';
export const BECOME_FACILITATOR_SUCCESS = 'BECOME_FACILITATOR_SUCCESS';
export const BECOME_FACILITATOR_FAILED = 'BECOME_FACILITATOR_FAILED';

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

export const FETCH_MORE_START = 'FETCH_MORE_START';
export const FETCH_MORE_SUCCESS = 'FETCH_MORE_SUCCESS';
export const FETCH_MORE_FAILED = 'FETCH_MORE_FAILED';

// ADMIN 1 ACTIONS

export const ADD_ADMIN_START = 'ADD_ADMIN_START';
export const ADD_ADMIN_SUCCESS = 'ADD_ADMIN_SUCCESS';
export const ADD_ADMIN_FAIL = 'ADD_ADMIN_FAIL';

export const ADD_FACILITATOR_START = 'ADD_FACILITATOR_START';
export const ADD_FACILITATOR_SUCCESS = 'ADD_FACILITATOR_SUCCESS';
export const ADD_FACILITATOR_FAIL = 'ADD_FACILITATOR_FAIL';

export const APPROVE_FACILITATE_APPLICANT_START = 'APPROVE_FACILITATE_APPLICANT_START';
export const APPROVE_FACILITATE_APPLICANT_SUCCESS = 'APPROVE_FACILITATE_APPLICANT_SUCCESS';
export const APPROVE_FACILITATE_APPLICANT_FAIL = 'APPROVE_FACILITATE_APPLICANT_FAIL';

export const DISAPPROVE_FACILITATE_APPLICANT_START = 'DISAPPROVE_FACILITATE_APPLICANT_START';
export const DISAPPROVE_FACILITATE_APPLICANT_SUCCESS = 'DISAPPROVE_FACILITATE_APPLICANT_SUCCESS';
export const DISAPPROVE_FACILITATE_APPLICANT_FAIL = 'DISAPPROVE_FACILITATE_APPLICANT_FAIL';

export const REMOVE_ADMIN_START = 'REMOVE_ADMIN_START';
export const REMOVE_ADMIN_SUCCESS = 'REMOVE_ADMIN_SUCCESS';
export const REMOVE_ADMIN_FAIL = 'REMOVE_ADMIN_FAIL';

export const REMOVE_FACILITATOR_START = 'REMOVE_FACILITATOR_START';
export const REMOVE_FACILITATOR_SUCCESS = 'REMOVE_FACILITATOR_SUCCESS';
export const REMOVE_FACILITATOR_FAIL = 'REMOVE_FACILITATOR_FAIL';

export const CLEAR_ALL_ADMIN_MESSAGES = 'CLEAR_ALL_ADMIN_MESSAGES';

export const FETCH_SUBJECT_TO_EDIT_START = 'FETCH_SUBJECT_TO_EDIT_START';
export const FETCH_SUBJECT_TO_EDIT_SUCCESS = 'FETCH_SUBJECT_TO_EDIT_SUCCESS';
export const FETCH_SUBJECT_TO_EDIT_FAIL = 'FETCH_SUBJECT_TO_EDIT_FAIL';

export const EDIT_SUBJECT_START = 'EDIT_SUBJECT_START';
export const EDIT_SUBJECT_SUCCESS = 'EDIT_SUBJECT_SUCCESS';
export const EDIT_SUBJECT_FAIL = 'EDIT_SUBJECT_FAIL';
export const CLEAR_EDIT_SUBJECT_INFO = 'CLEAR_EDIT_SUBJECT_INFO';

export const ADD_SUBJECT_ICON_START = 'ADD_SUBJECT_ICON_START';
export const ADD_SUBJECT_ICON_SUCCESS = 'ADD_SUBJECT_ICON_SUCCESS';
export const ADD_SUBJECT_ICON_FAIL = 'ADD_SUBJECT_ICON_FAIL';
export const RESET_ADD_SUBJECT_ICON_STATE = 'RESET_ADD_SUBJECT_ICON_STATE';

export const ADD_SUBJECT_START = 'ADD_SUBJECT_START';
export const ADD_SUBJECT_SUCCESS = 'ADD_SUBJECT_SUCCESS';
export const ADD_SUBJECT_FAIL = 'ADD_SUBJECT_FAIL';
export const CLEAR_ADD_SUBJECT_STATE = 'CLEAR_ADD_SUBJECT_STATE';

export const DELETE_SUBJECT_START = 'DELETE_SUBJECT_START';
export const DELETE_SUBJECT_SUCCESS = 'DELETE_SUBJECT_SUCCESS';
export const DELETE_SUBJECT_FAIL = 'DELETE_SUBJECT_FAIL';
export const CLEAR_DELETE_SUBJECT_INFO = 'CLEAR_DELETE_SUBJECT_INFO';

export const FETCH_FACILITATE_APPLICANTS_START = 'FETCH_FACILITATE_APPLICANTS_START';
export const FETCH_FACILITATE_APPLICANTS_SUCCESS = 'FETCH_FACILITATE_APPLICANTS_SUCCESS';
export const FETCH_FACILITATE_APPLICANTS_FAIL = 'FETCH_FACILITATE_APPLICANTS_FAIL';

export const FETCH_MORE_FACILITATE_APPLICANTS_START = 'FETCH_MORE_FACILITATE_APPLICANTS_START';
export const FETCH_MORE_FACILITATE_APPLICANTS_SUCCESS = 'FETCH_MORE_FACILITATE_APPLICANTS_SUCCESS';
export const FETCH_MORE_FACILITATE_APPLICANTS_FAIL = 'FETCH_MORE_FACILITATE_APPLICANTS_FAIL';

export const FETCH_USER_BY_ATTRIBUTE_START = 'FETCH_USER_BY_ATTRIBUTE_START';
export const FETCH_USER_BY_ATTRIBUTE_SUCCESS = 'FETCH_USER_BY_ATTRIBUTE_SUCCESS';
export const FETCH_USER_BY_ATTRIBUTE_FAIL = 'FETCH_USER_BY_ATTRIBUTE_FAIL';
export const CLEAR_FETCH_USER_BY_ATTRIBUTE_INFO = 'CLEAR_FETCH_USER_BY_ATTRIBUTE_INFO';

export const ADD_ADMIN_TYPE_START = 'ADD_ADMIN_TYPE_START';
export const ADD_ADMIN_TYPE_SUCCESS = 'ADD_ADMIN_TYPE_SUCCESS';
export const ADD_ADMIN_TYPE_FAIL = 'ADD_ADMIN_TYPE_FAIL';
export const CLEAR_ADD_ADMIN_TYPE_INFO = 'CLEAR_ADD_ADMIN_TYPE_INFO';

export const REMOVE_ADMIN_TYPE_START = 'REMOVE_ADMIN_TYPE_START';
export const REMOVE_ADMIN_TYPE_SUCCESS = 'REMOVE_ADMIN_TYPE_SUCCESS';
export const REMOVE_ADMIN_TYPE_FAIL = 'REMOVE_ADMIN_TYPE_FAIL';
export const CLEAR_REMOVE_ADMIN_TYPE_INFO = 'CLEAR_REMOVE_ADMIN_TYPE_INFO';

// RESOURCE ACTIONS

export const ADD_RESOURCE_START = 'ADD_RESOURCE_START';
export const ADD_RESOURCE_SUCCESS = 'ADD_RESOURCE_SUCCESS';
export const ADD_RESOURCE_FAIL = 'ADD_RESOURCE_FAIL';

export const FETCH_USER_ASSET_COUNT_START = 'FETCH_USER_ASSET_COUNT_START';
export const FETCH_USER_ASSET_COUNT_SUCCESS = 'FETCH_USER_ASSET_COUNT_SUCCESS';
export const FETCH_USER_ASSET_COUNT_FAIL = 'FETCH_USER_ASSET_COUNT_FAIL';

export const FETCH_RESOURCE_BY_ID_START = 'FETCH_RESOURCE_BY_ID_START';
export const FETCH_RESOURCE_BY_ID_SUCCESS = 'FETCH_RESOURCE_BY_ID_SUCCESS';
export const FETCH_RESOURCE_BY_ID_FAIL = 'FETCH_RESOURCE_BY_ID_FAIL';

export const FETCH_USER_ASSET_START = 'FETCH_USER_ASSET_START';
export const FETCH_USER_ASSET_SUCCESS = 'FETCH_USER_ASSET_SUCCESS';
export const FETCH_USER_ASSET_FAILED = 'FETCH_USER_ASSET_FAILED';

export const FETCH_MORE_ASSETS_START = 'FETCH_MORE_ASSETS_START';
export const FETCH_MORE_ASSETS_SUCCESS = 'FETCH_MORE_ASSETS_SUCCESS';
export const FETCH_MORE_ASSETS_FAILED = 'FETCH_MORE_ASSETS_FAILED';

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

export const UPDATE_USER_RECENTLY_VIEWED = 'UPDATE_USER_RECENTLY_VIEWED';

export const FETCH_RECENTLY_VIEWED_SUCCESS = 'FETCH_RECENTLY_VIEWED_SUCCESS';

export const FETCH_UNCONFIRMED_RESOURCES_START = 'FETCH_UNCONFIRMED_RESOURCES_START';
export const FETCH_UNCONFIRMED_RESOURCES_SUCCESS = 'FETCH_UNCONFIRMED_RESOURCES_SUCCESS';
export const FETCH_UNCONFIRMED_RESOURCES_FAIL = 'FETCH_UNCONFIRMED_RESOURCES_FAIL';

export const FETCH_MORE_UNCONFIRMED_RESOURCES_START = 'FETCH_MORE_UNCONFIRMED_RESOURCES_START';
export const FETCH_MORE_UNCONFIRMED_RESOURCES_SUCCESS = 'FETCH_MORE_UNCONFIRMED_RESOURCES_SUCCESS';
export const FETCH_MORE_UNCONFIRMED_RESOURCES_FAIL = 'FETCH_MORE_UNCONFIRMED_RESOURCES_FAIL';

export const CONFIRM_RESOURCE_START = 'CONFIRM_RESOURCE_START';
export const CONFIRM_RESOURCE_SUCCESS = 'CONFIRM_RESOURCE_SUCCESS';
export const CONFIRM_RESOURCE_FAIL = 'CONFIRM_RESOURCE_FAIL';

export const DELETE_UNCONFIRMED_START = 'DELETE_UNCONFIRMED_START';
export const DELETE_UNCONFIRMED_SUCCESS = 'DELETE_UNCONFIRMED_SUCCESS';
export const DELETE_UNCONFIRMED_FAIL = 'DELETE_UNCONFIRMED_FAIL';

export const SET_ASSET_TO_UPDATE_FIELDS = 'SET_ASSET_TO_UPDATE_FIELDS';

export const UPDATE_YOUTUBE_ASSET_SUCCESS = 'UPDATE_YOUTUBE_ASSET_SUCCESS';
export const UPDATE_YOUTUBE_ASSET_FAIL = 'UPDATE_YOUTUBE_ASSET_FAIL';
export const UPDATE_YOUTUBE_ASSET_START = 'UPDATE_YOUTUBE_ASSET_START';

export const UPDATE_MOOC_ASSET_SUCCESS = 'UPDATE_MOOC_ASSET_SUCCESS';
export const UPDATE_MOOC_ASSET_FAIL = 'UPDATE_MOOC_ASSET_FAIL';
export const UPDATE_MOOC_ASSET_START = 'UPDATE_MOOC_ASSET_START';

export const UPDATE_BOOK_ASSET_SUCCESS = 'UPDATE_BOOK_ASSET_SUCCESS';
export const UPDATE_BOOK_ASSET_FAIL = 'UPDATE_BOOK_ASSET_FAIL';
export const UPDATE_BOOK_ASSET_START = 'UPDATE_BOOK_ASSET_START';

export const DELETE_ASSET_SUCCESS = 'DELETE_ASSET_SUCCESS';
export const DELETE_ASSET_FAIL = 'DELETE_ASSET_FAIL';
export const DELETE_ASSET_START = 'DELETE_ASSET_START';

export const CLEAR_UPDATE_ASSET_MESSAGE = 'CLEAR_UPDATE_ASSET_MESSAGE';
export const CLEAR_ADD_RESOURCE_MESSAGES = 'CLEAR_ADD_RESOURCE_MESSAGES';

// COLLECTIONS ACTIONS
export const SET_SELECTED_MENU = 'SET_SELECTED_MENU';

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

export const FETCH_FEATURED_COLLECTIONS_START = 'FETCH_FEATURED_COLLECTIONS_START';
export const FETCH_FEATURED_COLLECTIONS_SUCCESS = 'FETCH_FEATURED_COLLECTIONS_SUCCESS';
export const FETCH_FEATURED_COLLECTIONS_FAIL = 'FETCH_FEATURED_COLLECTIONS_FAIL';

export const ADD_RESOURCE_TO_COLLECTION_SUCCESS = 'ADD_RESOURCE_TO_COLLECTION_SUCCESS';
export const ADD_RESOURCE_TO_COLLECTION_FAIL = 'ADD_RESOURCE_TO_COLLECTION_FAIL';

export const RESOURCE_ALREADY_ADDED = 'RESOURCE_ALREADY_ADDED';

export const CLEAR_ADD_TO_COLLECTION_MESSAGES = 'CLEAR_ADD_TO_COLLECTION_MESSAGES';

export const SET_CLICKED_COLLECTION_ATTRIBUTES = 'SET_CLICKED_COLLECTION_ATTRIBUTES';

export const FETCH_COLLECTION_BY_ID_START = 'FETCH_COLLECTION_BY_ID_START';
export const FETCH_COLLECTION_BY_ID_SUCCESS = 'FETCH_COLLECTION_BY_ID_SUCCESS';
export const FETCH_COLLECTION_BY_ID_FAIL = 'FETCH_COLLECTION_BY_ID_FAIL';

// export const FETCH_COLLECTION_ATTRIBUTES_START = 'FETCH_COLLECTION_ATTRIBUTES_START';
export const FETCH_COLLECTION_ATTRIBUTES_SUCCESS = 'FETCH_COLLECTION_ATTRIBUTES_SUCCESS';
// export const FETCH_COLLECTION_ATTRIBUTES_FAIL = 'FETCH_COLLECTION_ATTRIBUTES_FAIL';

export const DELETE_COLLECTION_ITEM_FAIL = 'DELETE_COLLECTION_ITEM_FAIL';

export const EDIT_COLLECTION_START = 'EDIT_COLLECTION_START';
export const EDIT_COLLECTION_SUCCESS = 'EDIT_COLLECTION_SUCCESS';
export const EDIT_COLLECTION_FAIL = 'EDIT_COLLECTION_FAIL';

export const CLEAR_EDIT_COLLECTION_MESSAGES = 'CLEAR_EDIT_COLLECTION_MESSAGES';

export const PUBLISH_COLLECTION_START = 'PUBLISH_COLLECTION_START';
export const PUBLISH_COLLECTION_SUCCESS = 'PUBLISH_COLLECTION_SUCCESS';
export const PUBLISH_COLLECTION_FAIL = 'PUBLISH_COLLECTION_FAIL';

export const CLEAR_PUBLISH_COLLECTION_MESSAGES = 'CLEAR_PUBLISH_COLLECTION_MESSAGES';

export const CLEAR_RESOURCE_TO_COLLECT = 'CLEAR_RESOURCE_TO_COLLECT';

export const DELETE_COLLECTION_START = 'DELETE_COLLECTION_START';
export const DELETE_COLLECTION_SUCCESS = 'DELETE_COLLECTION_SUCCESS';
export const DELETE_COLLECTION_FAIL = 'DELETE_COLLECTION_FAIL';

export const CLEAR_DELETE_COLLECTION_MESSAGES = 'CLEAR_DELETE_COLLECTION_MESSAGES';
export const CLEAR_PIN_COLLECTION_MESSAGES = 'CLEAR_PIN_COLLECTION_MESSAGES'

export const PIN_COLLECTION_START = 'PIN_COLLECTION_START';
export const PIN_COLLECTION_FAIL = 'PIN_COLLECTION_FAIL';
export const PIN_COLLECTION_SUCCESS = 'PIN_COLLECTION_SUCCESS';

export const FETCH_USER_PINNED_COLLECTION_START = 'FETCH_USER_PINNED_COLLECTION_START';
export const FETCH_USER_PINNED_COLLECTION_SUCCESS = 'FETCH_USER_PINNED_COLLECTION_SUCCESS';
export const FETCH_USER_PINNED_COLLECTION_FAIL = 'FETCH_USER_PINNED_COLLECTION_FAIL';

// BLOG ACTIONS
export const FETCH_FEATURED_BLOGS_START = 'FETCH_FEATURED_BLOGS_START';
export const FETCH_FEATURED_BLOGS_FAIL = 'FETCH_FEATURED_BLOGS_FAIL';
export const FETCH_FEATURED_BLOGS_SUCCESS = 'FETCH_FEATURED_BLOGS_SUCCESS';

export const CLEAR_BLOG_HOME_MESSAGES = 'CLEAR_BLOG_HOME_MESSAGES';

export const FETCH_BLOG_POST_START = 'FETCH_BLOG_POST_START';
export const FETCH_BLOG_POST_SUCCESS = 'FETCH_BLOG_POST_SUCCESS';
export const FETCH_BLOG_POST_FAIL = 'FETCH_BLOG_POST_FAIL';

export const UPLOAD_BLOG_IMAGE_START = 'UPLOAD_BLOG_IMAGE_START';
export const UPLOAD_BLOG_IMAGE_SUCCESS = 'UPLOAD_BLOG_IMAGE_SUCCESS';
export const UPLOAD_BLOG_IMAGE_FAIL = 'UPLOAD_BLOG_IMAGE_FAIL';

export const UPLOAD_WEB_BLOG_IMAGE_START = 'UPLOAD_WEB_BLOG_IMAGE_START';
export const UPLOAD_WEB_BLOG_IMAGE_SUCCESS = 'UPLOAD_WEB_BLOG_IMAGE_SUCCESS';
export const UPLOAD_WEB_BLOG_IMAGE_FAIL = 'UPLOAD_WEB_BLOG_IMAGE_FAIL';

export const CLEAR_UPLOAD_BLOG_IMAGE_STATE = 'CLEAR_UPLOAD_BLOG_IMAGE_STATE';

export const LOAD_ALL_BLOG_DRAFTS_START = 'LOAD_ALL_BLOG_DRAFTS_START';
export const LOAD_ALL_BLOG_DRAFTS_SUCCESS = 'LOAD_ALL_BLOG_DRAFTS_SUCCESS';
export const LOAD_ALL_BLOG_DRAFTS_FAIL = 'LOAD_ALL_BLOG_DRAFTS_FAIL';

export const CREATE_BLOG_DRAFT_START = 'CREATE_BLOG_DRAFT_START';
export const CREATE_BLOG_DRAFT_SUCCESS = 'CREATE_BLOG_DRAFT_SUCCESS';
export const CREATE_BLOG_DRAFT_FAIL = 'CREATE_BLOG_DRAFT_FAIL';

export const UPDATE_BLOG_DRAFT_START = 'UPDATE_BLOG_DRAFT_START';
export const UPDATE_BLOG_DRAFT_SUCCESS = 'UPDATE_BLOG_DRAFT_SUCCESS';
export const UPDATE_BLOG_DRAFT_FAIL = 'UPDATE_BLOG_DRAFT_FAIL';

export const PUBLISH_BLOG_DRAFT_START = 'PUBLISH_BLOG_DRAFT_START';
export const PUBLISH_BLOG_DRAFT_SUCCESS = 'PUBLISH_BLOG_DRAFT_SUCCESS';
export const PUBLISH_BLOG_DRAFT_FAIL = 'PUBLISH_BLOG_DRAFT_FAIL';

export const DELETE_BLOG_DRAFT_START = 'DELETE_BLOG_DRAFT_START';
export const DELETE_BLOG_DRAFT_SUCCESS = 'DELETE_BLOG_DRAFT_SUCCESS';
export const DELETE_BLOG_DRAFT_FAIL = 'DELETE_BLOG_DRAFT_FAIL';

export const INITIALIZE_BLOG_CATEGORIES_SUCCESS = 'INITIALIZE_BLOG_CATEGORIES_SUCCESS';
export const INITIALIZE_BLOG_TAGS_SUCCESS = 'INITIALIZE_BLOG_TAGS_SUCCESS';

export const EDIT_BLOG_CATEGORIES_START = 'EDIT_BLOG_CATEGORIES_START';
export const EDIT_BLOG_CATEGORIES_SUCCESS = 'EDIT_BLOG_CATEGORIES_SUCCESS';
export const EDIT_BLOG_CATEGORIES_FAIL = 'EDIT_BLOG_CATEGORIES_FAIL';

export const EDIT_BLOG_TAGS_START = 'EDIT_BLOG_TAGS_START';
export const EDIT_BLOG_TAGS_SUCCESS = 'EDIT_BLOG_TAGS_SUCCESS';
export const EDIT_BLOG_TAGS_FAIL = 'EDIT_BLOG_TAGS_FAIL';

export const CLEAR_EDIT_BLOG_FILTERS_INFO = 'CLEAR_EDIT_BLOG_FILTERS_INFO';

export const FETCH_BLOG_CATEGORIES_SUCCESS = 'FETCH_BLOG_CATEGORIES_SUCCESS';
export const FETCH_BLOG_TAGS_SUCCESS = 'FETCH_BLOG_TAGS_SUCCESS';

export const FETCH_AUTHORS_SUCCESS = 'FETCH_AUTHORS_SUCCESS';

export const FETCH_MORE_BLOG_IN_CATEGORY_SUCCESS = 'FETCH_MORE_BLOG_IN_CATEGORY_SUCCESS';
export const FETCH_MORE_BLOG_IN_CATEGORY_START = 'FETCH_MORE_BLOG_IN_CATEGORY_START';
export const FETCH_MORE_BLOG_IN_CATEGORY_FAIL = 'FETCH_MORE_BLOG_IN_CATEGORY_FAIL';

export const FETCH_BLOG_COMMENT_START = 'FETCH_BLOG_COMMENT_START';
export const FETCH_BLOG_COMMENT_SUCCESS = 'FETCH_BLOG_COMMENT_SUCCESS';
export const FETCH_BLOG_COMMENT_FAIL = 'FETCH_BLOG_COMMENT_FAIL';

export const POST_USER_COMMENT_START = 'POST_USER_COMMENT_START';
export const POST_USER_COMMENT_SUCCESS = 'POST_USER_COMMENT_SUCCESS';
export const POST_USER_COMMENT_FAIL = 'POST_USER_COMMENT_FAIL';

export const SAVE_BLOG_START = 'SAVE_BLOG_START';
export const SAVE_BLOG_SUCCESS = 'SAVE_BLOG_SUCCESS';
export const SAVE_BLOG_FAIL = 'SAVE_BLOG_FAIL';

export const FETCH_BLOGS_BY_SECTION_START = 'FETCH_BLOGS_BY_SECTION_START';
export const FETCH_BLOGS_BY_SECTION_SUCCESS = 'FETCH_BLOGS_BY_SECTION_SUCCESS';
export const FETCH_BLOGS_BY_SECTION_FAIL = 'FETCH_BLOGS_BY_SECTION_FAIL';
export const FETCH_MORE_BLOGS_BY_SECTION_START = 'FETCH_MORE_BLOGS_BY_SECTION_START';
export const FETCH_MORE_BLOGS_BY_SECTION_SUCCESS = 'FETCH_MORE_BLOGS_BY_SECTION_SUCCESS';
export const FETCH_MORE_BLOGS_BY_SECTION_FAIL = 'FETCH_MORE_BLOGS_BY_SECTION_FAIL';

export const FETCH_BLOGS_BY_POPULARITY_START = 'FETCH_BLOGS_BY_POPULARITY_START';
export const FETCH_BLOGS_BY_POPULARITY_SUCCESS = 'FETCH_BLOGS_BY_POPULARITY_SUCCESS';
export const FETCH_BLOGS_BY_POPULARITY_FAIL = 'FETCH_BLOGS_BY_POPULARITY_FAIL';
export const FETCH_MORE_BLOGS_BY_POPULARITY_START = 'FETCH_MORE_BLOGS_BY_POPULARITY_START';
export const FETCH_MORE_BLOGS_BY_POPULARITY_SUCCESS = 'FETCH_MORE_BLOGS_BY_POPULARITY_SUCCESS';
export const FETCH_MORE_BLOGS_BY_POPULARITY_FAIL = 'FETCH_MORE_BLOGS_BY_POPULARITY_FAIL';

export const FETCH_BLOGS_BY_RECENT_START = 'FETCH_BLOGS_BY_RECENT_START';
export const FETCH_BLOGS_BY_RECENT_SUCCESS = 'FETCH_BLOGS_BY_RECENT_SUCCESS';
export const FETCH_BLOGS_BY_RECENT_FAIL = 'FETCH_BLOGS_BY_RECENT_FAIL';
export const FETCH_MORE_BLOGS_BY_RECENT_START = 'FETCH_MORE_BLOGS_BY_RECENT_START';
export const FETCH_MORE_BLOGS_BY_RECENT_SUCCESS = 'FETCH_MORE_BLOGS_BY_RECENT_SUCCESS';
export const FETCH_MORE_BLOGS_BY_RECENT_FAIL = 'FETCH_MORE_BLOGS_BY_RECENT_FAIL';

export const UNPUBLISH_POST_START = 'UNPUBLISH_POST_START';
export const UNPUBLISH_POST_SUCCESS = 'UNPUBLISH_POST_SUCCESS';
export const UNPUBLISH_POST_FAIL = 'UNPUBLISH_POST_FAIL';

export const CLEAR_BLOG_SECTION_MESSAGES = 'CLEAR_BLOG_SECTION_MESSAGES';

export const INCREASE_BLOG_POST_VIEW_SUCCESS = 'INCREASE_BLOG_POST_VIEW_SUCCESS';

export const FETCH_USER_BLOG_SAVES_START = 'FETCH_USER_BLOG_SAVES_START';
export const FETCH_USER_BLOG_SAVES_SUCCESS = 'FETCH_USER_BLOG_SAVES_SUCCESS';
export const FETCH_USER_BLOG_SAVES_FAIL = 'FETCH_USER_BLOG_SAVES_FAIL';

export const REMOVE_SAVED_BLOG_START = 'REMOVE_SAVED_BLOG_START';
export const REMOVE_SAVED_BLOG_SUCCESS = 'REMOVE_SAVED_BLOG_SUCCESS';
export const REMOVE_SAVED_BLOG_FAIL = 'REMOVE_SAVED_BLOG_FAIL';

export const CANCEL_REPLY_COMMENT = 'CANCEL_REPLY_COMMENT';
export const REPLYING_COMMENT = 'REPLYING_COMMENT';
export const POST_USER_COMMENT_REPLY_START = 'POST_USER_COMMENT_REPLY_START';
export const POST_USER_COMMENT_REPLY_SUCCESS = 'POST_USER_COMMENT_REPLY_SUCCESS';
export const POST_USER_COMMENT_REPLY_FAIL = 'POST_USER_COMMENT_REPLY_FAIL';

export const CLEAR_BLOG_POST_MESSAGES = 'CLEAR_BLOG_POST_MESSAGES';

// CONVERSATIONS ACTIONS

export const FETCH_CONVERSATIONS_START = 'FETCH_CONVERSATIONS_START';
export const FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAIL = 'FETCH_CONVERSATIONS_FAIL';
export const CLEAR_FETCH_CONVERSATIONS_MESSAGES = 'CLEAR_FETCH_CONVERSATIONS_MESSAGES';

export const START_NEW_CONVERSATION_START = 'START_NEW_CONVERSATION_START';
export const START_NEW_CONVERSATION_SUCCESS = 'START_NEW_CONVERSATION_SUCCESS';
export const START_NEW_CONVERSATION_FAIL = 'START_NEW_CONVERSATION_FAIL';
export const CLEAR_START_NEW_CONVERSATION_INFO = 'CLEAR_START_NEW_CONVERSATION_INFO';

export const FETCH_OPINIONS_START = 'FETCH_OPINIONS_START';
export const FETCH_OPINIONS_SUCCESS = 'FETCH_OPINIONS_SUCCESS';
export const FETCH_OPINIONS_FAIL = 'FETCH_OPINIONS_FAIL';

export const FETCH_MORE_OPINIONS_START = 'FETCH_MORE_OPINIONS_START';
export const FETCH_MORE_OPINIONS_SUCCESS = 'FETCH_MORE_OPINIONS_SUCCESS';
export const FETCH_MORE_OPINIONS_FAIL = 'FETCH_MORE_OPINIONS_FAIL';

export const POST_OPINION_TEXT_START = 'POST_OPINION_TEXT_START';
export const POST_OPINION_TEXT_SUCCESS = 'POST_OPINION_TEXT_SUCCESS';
export const POST_OPINION_TEXT_FAIL = 'POST_OPINION_TEXT_FAIL';

export const POST_LINK_OPINION_START = 'POST_LINK_OPINION_START';
export const POST_LINK_OPINION_SUCCESS = 'POST_LINK_OPINION_SUCCESS';
export const POST_LINK_OPINION_FAIL = 'POST_LINK_OPINION_FAIL';

export const POST_IMAGE_OPINION_START = 'POST_IMAGE_OPINION_START';
export const POST_IMAGE_OPINION_SUCCESS = 'POST_IMAGE_OPINION_SUCCESS';
export const POST_IMAGE_OPINION_FAIL = 'POST_IMAGE_OPINION_FAIL';

export const CLOSE_CONVERSATION_START = 'CLOSE_CONVERSATION_START';
export const CLOSE_CONVERSATION_SUCCESS = 'CLOSE_CONVERSATION_SUCCESS';
export const CLOSE_CONVERSATION_FAIL = 'CLOSE_CONVERSATION_FAIL';

export const EXTEND_CONVERSATION_START = 'EXTEND_CONVERSATION_START';
export const EXTEND_CONVERSATION_SUCCESS = 'EXTEND_CONVERSATION_SUCCESS';
export const EXTEND_CONVERSATION_FAIL = 'EXTEND_CONVERSATION_FAIL';

export const CLEAR_CONVERSATION_MESSAGES = 'CLEAR_CONVERSATION_MESSAGES';
export const CLEAR_NON_TEXT_OPINION_POST_MESSAGES = 'CLEAR_NON_TEXT_OPINION_POST_MESSAGES';

// search actions

export const DEPLOY_SEARCH_START = 'DEPLOY_SEARCH_START';
export const DEPLOY_SEARCH_SUCCESS = 'DEPLOY_SEARCH_SUCCESS';
export const DEPLOY_SEARCH_FAIL = 'DEPLOY_SEARCH_FAIL';

export const CLEAR_SEARCH_MESSAGES = 'CLEAR_SEARCH_MESSAGES';