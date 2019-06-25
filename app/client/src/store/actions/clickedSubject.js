import * as actionTypes from './actionTypes';
import axios from 'axios';

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Fetch clicked subject with path and study topics && fetch all Resources Dispatches

export const fetchClickedSubjectSuccess = ( clickedSubject ) => {
    return {
        type: actionTypes.FETCH_CLICKEDSUBJECT_SUCCESS,
        clickedSubject: clickedSubject
    };
};

export const fetchClickedSubjectFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CLICKEDSUBJECT_FAIL,
        error: error
    };
};

export const fetchClickedSubjectStart = () => {
    return {
        type: actionTypes.FETCH_CLICKEDSUBJECT_START
    };
};

export const fetchAllStart = () => {
    return {
        type: actionTypes.FETCH_ALL_START
    }
}

export const fetchAllSuccess = ( resources ) => {
    return {
        type: actionTypes.FETCH_ALL_SUCCESS,
        resources: resources 
    }
}

export const fetchAllFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_ALL_FAILED,
        error: error 
    }
}

// dynamic Subject Page

export const fetchSubjectDetails = (subject_title) => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get(`/api/subject/${subject_title}`)
            .then(                
                res => {
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};

export const fetchSubjectResources = (subject_title) => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get(`/api/resources/${subject_title}`);

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

export const fetchResourcesByPlatform = (subject_title, platform) => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get(`/api/resources/${subject_title}/${platform}`);

    if (res.data.all) {
        const all = [...res.data.all];

        const allShuffled = shuffleArray(all);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}