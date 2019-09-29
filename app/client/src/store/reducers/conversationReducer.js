import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    fetchConversationsLoading: false,
    fetchConversationsError: null,
    expiredConversations: [],
    onGoingConversations: [] 
}

const fetchConversationsStart = (state, action) => {
    return updateObject(state, {
        fetchConversationsLoading: true
    });
}

const fetchConversationsSuccess = (state, action) => {
    return updateObject(state, {
        fetchConversationsLoading: false,
        fetchConversationsError: null,
        expiredConversations: action.expired,
        onGoingConversations: action.onGoing
    });
}

const fetchConversationsFail = (state, action) => {
    return updateObject(state, {
        fetchConversationsLoading: false,
        fetchConversationsError: action.error,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONVERSATIONS_START: return fetchConversationsStart(state, action);
        case actionTypes.FETCH_CONVERSATIONS_SUCCESS: return fetchConversationsSuccess(state, action);
        case actionTypes.FETCH_CONVERSATIONS_FAIL: return fetchConversationsFail(state, action);

        default: return state;
    }
}

export default reducer;