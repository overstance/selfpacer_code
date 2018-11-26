import * as actionTypes from './actionTypes';
import axios from 'axios';


// ************ACTIONS

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

export const updateClickedSubject = ( clickedSubject ) => {
    return {
        type: actionTypes.UPDATE_CLICKED_SUBJECT,
        clickedSubject: clickedSubject,
    };
};

//Set to Id of Resource to Collect



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


//*********/DISPATCHES

export const fetchCreativeSubjects = ( history ) => {

    return dispatch => {
        dispatch(fetchSubjectsStart());
        
        axios.get( '/api/creative' )
            .then( 
                
                res => {
                const fetchedSubjects = [...res.data.subjects];
                dispatch(fetchSubjectsSuccess(fetchedSubjects));
            } )
            .catch( err => {
                dispatch(fetchSubjectsFail(err));
            } );
    };

}

export const fetchBusinessSubjects = () => {

    return dispatch => {
        dispatch(fetchSubjectsStart());
        
        axios.get( '/api/business' )
            .then( 
                
                res => {
                const fetchedSubjects = [...res.data.subjects];
                dispatch(fetchSubjectsSuccess(fetchedSubjects));
            } )
            .catch( err => {
                dispatch(fetchSubjectsFail(err));
            } );
    };

}

export const fetchTechnologySubjects = () => {

    return dispatch => {
        dispatch(fetchSubjectsStart());
        
        axios.get( '/api/technology' )
            .then( 
                
                res => {
                const fetchedSubjects = [...res.data.subjects];
                dispatch(fetchSubjectsSuccess(fetchedSubjects));
            } )
            .catch( err => {
                dispatch(fetchSubjectsFail(err));
            } );
    };

}

export const fetchLifeStyleSubjects = () => {

    return dispatch => {
        dispatch(fetchSubjectsStart());
        
        axios.get( '/api/lifestyle' )
            .then( 
                
                res => {
                const fetchedSubjects = [...res.data.subjects];
                dispatch(fetchSubjectsSuccess(fetchedSubjects));
            } )
            .catch( err => {
                dispatch(fetchSubjectsFail(err));
            } );
    };

}

export const fetchSubjects = () => {
    return dispatch => {
        dispatch(fetchSubjectsStart());
        
        axios.get( '/api/explore' )
            .then( 
                
                res => {
                const fetchedSubjects = [...res.data.subjects];
                dispatch(fetchSubjectsSuccess(fetchedSubjects));
            } )
            .catch( err => {
                dispatch(fetchSubjectsFail(err));
            } );
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
