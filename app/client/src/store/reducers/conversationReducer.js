import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    fetchConversationsLoading: false,
    fetchConversationsError: null,
    expiredConversations: [],
    onGoingConversations: [],
    
    startNewConversationLoading: false,
    startNewConversationError: null,
    startNewConversationSuccessInfo: null
}

const fetchConversationsStart = (state, action) => {
    return updateObject(state, {
        fetchConversationsLoading: true,
        fetchConversationsError: null
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

const clearFetchConversationsMessages = (state, action) => {
    return updateObject(state, {
        fetchConversationsError: null
    });
}

const startNewConversationStart = (state, action) => {
    return updateObject(state, {
        startNewConversationLoading: true,
        startNewConversationError: null,
    });
}

const startNewConversationSuccess = (state, action) => {
    return updateObject(state, {
        startNewConversationLoading: false,
        onGoingConversations: action.updatedOngoingConversations,
        startNewConversationSuccessInfo: action.successInfo
    });
}

const startNewConversationFail = (state, action) => {
    return updateObject(state, {
        startNewConversationLoading: false,
        startNewConversationError: action.error
    });
}

const clearStartNewConversationInfo = (state, action) => {
    return updateObject(state, {
        startNewConversationError: null,
        startNewConversationSuccessInfo: null,
        startNewConversationLoading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONVERSATIONS_START: return fetchConversationsStart(state, action);
        case actionTypes.FETCH_CONVERSATIONS_SUCCESS: return fetchConversationsSuccess(state, action);
        case actionTypes.FETCH_CONVERSATIONS_FAIL: return fetchConversationsFail(state, action);
        case actionTypes.CLEAR_FETCH_CONVERSATIONS_MESSAGES: return clearFetchConversationsMessages(state, action);

        case actionTypes.START_NEW_CONVERSATION_START: return startNewConversationStart(state, action);
        case actionTypes.START_NEW_CONVERSATION_SUCCESS: return startNewConversationSuccess(state, action);
        case actionTypes.START_NEW_CONVERSATION_FAIL: return startNewConversationFail(state, action);
        case actionTypes.CLEAR_START_NEW_CONVERSATION_INFO: return clearStartNewConversationInfo(state, action);

        default: return state;
    }
}

export default reducer;