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

// Fetch clicked subject with path and study topics

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

export const fetchAccounting = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/accounting')
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

export const fetchAnimation = () => {
    return dispatch => {
        dispatch(fetchClickedSubjectStart());

        axios.get('/api/animation')
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


// Fetch all resources

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

export const fetchAllAccounting = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_accounting');

    if (res.data.allAccounting) {
        const allAccounting = [...res.data.allAccounting];

        const allShuffled = shuffleArray(allAccounting);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}

export const fetchAllAnimation = () => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get('/api/all_animation');

    if (res.data.allAccounting) {
        const allAccounting = [...res.data.allAccounting];

        const allShuffled = shuffleArray(allAccounting);

        dispatch(fetchAllSuccess(allShuffled));
    } else dispatch(fetchAllFailed(res.data));
}