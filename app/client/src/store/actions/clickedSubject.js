import * as actionTypes from './actionTypes';
import axios from 'axios';

/* function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
} */

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

export const fetchAllStart = () => {
    return {
        type: actionTypes.FETCH_ALL_START
    }
}

export const fetchAllSuccess = ( resources, resourceLength ) => {
    return {
        type: actionTypes.FETCH_ALL_SUCCESS,
        resources: resources ,
        resourceLength: resourceLength
    }
}

export const fetchAllFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_ALL_FAILED,
        error: error 
    }
}

export const fetchSubjectResources = (subject_title, pageIndex) => async dispatch => {
    dispatch(fetchAllStart());

    const res = await axios.get(`/api/resources/${subject_title}/${pageIndex}`);

    if (res.data.all) {
        // const all = [...res.data.all];

        // const allShuffled = shuffleArray(all);

        // dispatch(fetchAllSuccess(res.data.all));
        // console.log(res.data.all.length);
        let resourceLength = res.data.all.length;
        dispatch(fetchAllSuccess(res.data.all, resourceLength));
    } else dispatch(fetchAllFailed(res.data));
}

export const fetchResourcesByPlatform = (subject_title, platform, pageIndex) => async dispatch => {
    dispatch(fetchAllStart());

    // console.log('action reached');

    const res = await axios.get(`/api/resources/${subject_title}/${platform}/${pageIndex}`);

    if (res.data.all) {
        // const all = [...res.data.all];

        // const allShuffled = shuffleArray(all);

        let resourceLength = res.data.all.length;
        dispatch(fetchAllSuccess(res.data.all, resourceLength));
    } else dispatch(fetchAllFailed(res.data));
}

export const fetchMoreStart = () => {
    return {
        type: actionTypes.FETCH_MORE_START
    }
}

export const fetchMoreSuccess = ( resources, resourceLength ) => {
    return {
        type: actionTypes.FETCH_MORE_SUCCESS,
        resources: resources,
        resourceLength: resourceLength 
    }
}

export const fetchMoreFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_MORE_FAILED,
        error: error 
    }
}

export const fetchMoreResources = (subject_title, pageIndex, resources) => async dispatch => {
    dispatch(fetchMoreStart());

    const res = await axios.get(`/api/resources/${subject_title}/${pageIndex}`);

    if (res.data.all) {
        // const all = [...res.data.all];

        // const allShuffled = shuffleArray(all);
        let updatedResources = [...resources, ...res.data.all]

        // dispatch(fetchMoreSuccess(res.data.all));
        let resourceLength = res.data.all.length;
        dispatch(fetchMoreSuccess(updatedResources, resourceLength));
    } else dispatch(fetchMoreFailed(res.data));
}

export const fetchMoreResourcesByPlatform = (subject_title, platform, pageIndex, resources) => async dispatch => {
    dispatch(fetchMoreStart());

    const res = await axios.get(`/api/resources/${subject_title}/${platform}/${pageIndex}`);

    if (res.data.all) {
        // const all = [...res.data.all];

        let updatedResources = [...resources, ...res.data.all]

        // dispatch(fetchMoreSuccess(res.data.all));
        let resourceLength = res.data.all.length;
        dispatch(fetchMoreSuccess(updatedResources, resourceLength));
    } else dispatch(fetchMoreFailed(res.data));
}