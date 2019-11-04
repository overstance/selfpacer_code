import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    subjects: [],
    loading: false,
    error: null,
    selectedCategory: 'all',
    clickedSubject: {},
    activeContentType: 'all',
    likedResource: null,

    recentlyViewedLoading: false,
    recentlyViewedResources: [],

    latestInSpecLoading: false,
    latestInSpecResources: [],

    popularInSpecLoading: false,
    popularInSpecResources: []
};

const fetchSubjectsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchSubjectsSuccess = ( state, action ) => {
    return updateObject( state, {
        subjects: action.subjects,
        loading: false
    } );
};

const fetchSubjectsFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};


const updateClickedSubject = ( state, action ) => {
    return updateObject( state, { clickedSubject: action.clickedSubject } );
};

//Set resources page content type to all, youtube, mooc, or books

const setActiveContentType = ( state, action ) => {
    return updateObject( state, { activeContentType: action.platform } );
};

//Set selected category to either business, technology, creative, lifeStyle

const setSelectedCategory = ( state, action ) => {
    return updateObject( state, { selectedCategory: action.category } );
};

//Set liked resource
const setLikedResource = ( state, action ) => {
    return updateObject( state, { likedResource: action.id } );
};

// fetch recently view

const fetchExploreRecentlyViewedStart = ( state, action ) => {
    return updateObject( state, { recentlyViewedLoading: true } );
};

const fetchExploreRecentlyViewedSuccess = ( state, action ) => {
    return updateObject( state, {
        recentlyViewedResources: action.resources,
        recentlyViewedLoading: false
    } );
};

const fetchExploreLatestInSpecStart = ( state, action ) => {
    return updateObject( state, { latestInSpecLoading: true } );
};

const fetchExploreLatestInSpecSuccess = ( state, action ) => {
    return updateObject( state, {
        latestInSpecResources: action.resources,
        latestInSpecLoading: false
    } );
};

const fetchExplorePopularInSpecStart = ( state, action ) => {
    return updateObject( state, { popularInSpecLoading: true } );
};

const fetchExplorePopularInSpecSuccess = ( state, action ) => {
    return updateObject( state, {
        popularInSpecResources: action.resources,
        popularInSpecLoading: false
    } );
};

const resetExploreState = ( state, action ) => {
    return updateObject( state, { 
        recentlyViewedResources: [],
        latestInSpecResources: [],
        popularInSpecResources: [] 
    } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SUBJECTS_START: return fetchSubjectsStart( state, action );
        case actionTypes.FETCH_SUBJECTS_SUCCESS: return fetchSubjectsSuccess( state, action );   
        case actionTypes.FETCH_SUBJECTS_FAIL: return fetchSubjectsFail( state, action );
        
        case actionTypes.UPDATE_CLICKED_SUBJECT: return updateClickedSubject( state, action );

        case actionTypes.SET_ACTIVE_CONTENT_TYPE: return setActiveContentType( state, action );

        case actionTypes.SET_SELECTED_CATEGORY: return setSelectedCategory( state, action );

        case actionTypes.SET_LIKED_RESOURCE: return setLikedResource( state, action );

        case actionTypes.FETCH_EXPLORE_RECENTLY_VIEWED_START: return fetchExploreRecentlyViewedStart( state, action );
        case actionTypes.FETCH_EXPLORE_RECENTLY_VIEWED_SUCCESS: return fetchExploreRecentlyViewedSuccess( state, action );

        case actionTypes.FETCH_EXPLORE_LATEST_IN_SPEC_START: return fetchExploreLatestInSpecStart( state, action );
        case actionTypes.FETCH_EXPLORE_LATEST_IN_SPEC_SUCCESS: return fetchExploreLatestInSpecSuccess( state, action );

        case actionTypes.FETCH_EXPLORE_POPULAR_IN_SPEC_START: return fetchExplorePopularInSpecStart( state, action );
        case actionTypes.FETCH_EXPLORE_POPULAR_IN_SPEC_SUCCESS: return fetchExplorePopularInSpecSuccess( state, action );
        
        case actionTypes.RESET_EXPLORE_STATE: return resetExploreState( state, action );

        default: return state;
    }
};

export default reducer;

