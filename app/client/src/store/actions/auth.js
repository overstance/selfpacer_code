import axios from 'axios';

import { FETCH_USER, LOGOUT_USER } from './actionTypes';
import * as actionTypes from './actionTypes';



export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const logout = () => async (dispatch) => {
    const res = await axios.get('/api/logout');
    dispatch({ type: LOGOUT_USER, payload: res.data });
};

export const googleAuth = () => async (dispatch) => {
    await axios.get('/auth/google');
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user
    };
};


export const ValidationErrors = (errors) => {
    return {
        type: actionTypes.VALIDATION_ERRORS,
        errors: errors
    };
};


export const clearErrors = () => {
    return {
        type: actionTypes.CLEAR_ERRORS
    };
}


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

        axios.post('/api/register', newUser)
            .then(res => {
                if (res.data._id) {
                    dispatch(authSuccess(res.data._id));
                    history.push('/login');
                    return;
                }

                if (res.data.name === 'UserExistsError') {
                    let error = res.data
                    dispatch(authFail(error))
                    return
                }
                dispatch(ValidationErrors(res.data));
                return;
            })
            .catch(error => dispatch(authFail(error))
            );

    }
};

export const loginUser = (email, password, history) => {
    return dispatch => {
        dispatch(authStart());
        const user = {
            username: email,
            password: password,
        };

        axios.post('/api/login', user)
            .then(res => {
                if (res.data._id) {
                    dispatch(authSuccess(res.data));
                    history.push('/home');
                    return;
                }

                if (res.data.username || res.data.password) {
                    dispatch(ValidationErrors(res.data));
                    return;
                }
            })
            .catch(error => dispatch(authFail(error))
            );

    }
};



