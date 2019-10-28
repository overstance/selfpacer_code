import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { SET_AUTHENTICATION, SET_USER_SPECIALIZATION, SET_USE_CONTEXT, SET_VISITOR_VIEWED } from './store/actions/actionTypes';

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
import blogReducer from './store/reducers/blogReducer';
import conversationReducer from './store/reducers/conversationReducer';
import searchReducer from './store/reducers/searchReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    explore: exploreReducer,
    clickedSubject: clickedSubjectReducer, 
    admin1: admin1Reducer,
    resource: resourceReducer,
    collection: collectionReducer,
    profile: profileReducer,
    blog: blogReducer,
    conversation: conversationReducer,
    search: searchReducer
});


const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(reduxThunk)
));

const token = localStorage.getItem('token');
const spec = localStorage.getItem('spec');
const useContext = localStorage.getItem('useContext');
const visitorViewed = localStorage.getItem('viewed');

if (token) {
  store.dispatch({ type: SET_AUTHENTICATION, userId: localStorage.token });
}

if (spec) {
    store.dispatch({ type: SET_USER_SPECIALIZATION, specialization: localStorage.spec });
    // console.log('spec available');
}

if (useContext) {
    store.dispatch({ type: SET_USE_CONTEXT, useTypeContext: localStorage.useContext });
}

if (visitorViewed) {
    store.dispatch({ type: SET_VISITOR_VIEWED, visitorRecentlyViewed: localStorage.viewed }); 
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
