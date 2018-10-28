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

export const updateClickedSubject = ( id ) => {
    return {
        type: actionTypes.UPDATE_CLICKED_SUBJECT,
        subjectId: id,
    };
};

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

/*
 return dispatch => {
export const registerUser = (name, email, password, password2, history) => {
    return dispatch => {
        dispatch(authStart());
        const newUser = {
            name: name,
            username: email,
            email: email,
            password: password,
            password2: password2
        };
    }
};
*/

export const increaseViews = ( id, views ) => {
    return dispatch => {
        dispatch(updateClickedSubject( id ));
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

/*
export const increaseViews = (id, views) => {
    return () => {
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
};*/