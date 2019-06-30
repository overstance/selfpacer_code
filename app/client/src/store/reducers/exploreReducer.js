import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    subjects: [],
    loading: false,
    error: null,
    selectedCategory: 'all',
    clickedSubject: {},
    activeContentType: 'all',
    likedResource: null
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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SUBJECTS_START: return fetchSubjectsStart( state, action );

        case actionTypes.FETCH_SUBJECTS_SUCCESS: return fetchSubjectsSuccess( state, action );
        
        case actionTypes.FETCH_SUBJECTS_FAIL: return fetchSubjectsFail( state, action );
        
        case actionTypes.UPDATE_CLICKED_SUBJECT: return updateClickedSubject( state, action );

        case actionTypes.SET_ACTIVE_CONTENT_TYPE: return setActiveContentType( state, action );

        case actionTypes.SET_SELECTED_CATEGORY: return setSelectedCategory( state, action );

        case actionTypes.SET_LIKED_RESOURCE: return setLikedResource( state, action );

        default: return state;
    }
};

export default reducer;

