import * as actionTypes from './actionTypes';
import axios from 'axios';


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

        axios.get( '/api/accounting')
            .then(                
                res => {
                    console.log(res.data);
                const clickedSubject = [...res.data.subjects];
                dispatch(fetchClickedSubjectSuccess(clickedSubject));
            } )
            .catch( err => {
                dispatch(fetchClickedSubjectFail(err));
            } );
    };
};