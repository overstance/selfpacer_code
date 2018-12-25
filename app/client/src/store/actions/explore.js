import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchSubjectsSuccess = ( subjects ) => {
    return {
        type: actionTypes.FETCH_SUBJECTS_SUCCESS,
        subjects: subjects
    };
};

export const fetchSubjectsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_SUBJECTS_FAIL,
        error: error
    };
};

export const fetchSubjectsStart = () => {
    return {
        type: actionTypes.FETCH_SUBJECTS_START
    };
};

export const fetchSubjects = () => {
    return dispatch => {
        dispatch(fetchSubjectsStart());
        
        axios.get( '/api/fetch_subject' )
            .then( 
                
                res => {
                const fetchedSubjects = [...res.data.subjects];

                const sortSubjects = 
                fetchedSubjects.sort(function(a, b){
                    if(a.title < b.title) { return -1; }
                    if(a.title > b.title) { return 1; }
                    return 0;
                });

                dispatch(fetchSubjectsSuccess(sortSubjects));
            } )
            .catch( err => {
                dispatch(fetchSubjectsFail(err));
            } );
    };
};

//Increase subject view count and set clicked Subject

export const updateClickedSubject = ( clickedSubject ) => {
    return {
        type: actionTypes.UPDATE_CLICKED_SUBJECT,
        clickedSubject: clickedSubject,
    };
};

export const increaseViews = ( id, views, clickedSubject ) => {
    return dispatch => {
        dispatch(updateClickedSubject( clickedSubject ));
        const subject = {
            subjectId: id,
            subjectViews: views + 1
        };

        //console.log(subject);

        axios.post('/api/subjectviews', subject)
        .then(res => {
            //console.log(res.data);
        })
        .catch(error => {console.log(error)}
        );
    }
};

//Set resources page content type to all, youtube, mooc, or books

export const setActiveContentType = ( platform ) => {
    return {
        type: actionTypes.SET_ACTIVE_CONTENT_TYPE,
        platform: platform
    }
}

//Set selected category to either business, technology, creative, lifeStyle

export const setSelectedCategory = ( category ) => {
    return {
        type: actionTypes.SET_SELECTED_CATEGORY,
        category: category
    }
}

// set liked resource

export const setLikedResource = ( id ) => {
    return {
        type: actionTypes.SET_LIKED_RESOURCE,
        id: id
    }
}
