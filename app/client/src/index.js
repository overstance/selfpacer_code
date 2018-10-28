import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';

import authReducer from './store/reducers/authReducer';
import exploreReducer from './store/reducers/exploreReducer';
import clickedSubjectReducer from './store/reducers/clickedSubjectReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    explore: exploreReducer,
    clickedSubject: clickedSubjectReducer
});


const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(reduxThunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);



ReactDom.render(app, document.querySelector('#root'));
unregister();
