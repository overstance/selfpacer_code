import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import { SET_AUTHENTICATION } from './store/actions/actionTypes';

import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';

import authReducer from './store/reducers/authReducer';
import admin1Reducer from './store/reducers/admin1Reducer';
import exploreReducer from './store/reducers/exploreReducer';
import clickedSubjectReducer from './store/reducers/clickedSubjectReducer';
import resourceReducer from './store/reducers/resourceReducer';
import collectionReducer from './store/reducers/collectionReducer';
import profileReducer from './store/reducers/profileReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    explore: exploreReducer,
    clickedSubject: clickedSubjectReducer, 
    admin1: admin1Reducer,
    resource: resourceReducer,
    collection: collectionReducer,
    profile: profileReducer
});


const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(reduxThunk)
));

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: SET_AUTHENTICATION, userId: localStorage.token });
}


const app = (
    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>
);



ReactDom.render(app, document.querySelector('#root'));
unregister();
