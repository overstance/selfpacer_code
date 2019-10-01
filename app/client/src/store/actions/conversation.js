import axios from 'axios';
import * as actionTypes from './actionTypes';

// fetch conversations

export const fetchConversationsStart = () => {
    return {
        type: actionTypes.FETCH_CONVERSATIONS_START
    }
};

export const fetchConversationsSuccess = (onGoing, expired) => {
    return {
        type: actionTypes.FETCH_CONVERSATIONS_SUCCESS,
        expired: expired,
        onGoing: onGoing
    }
}

export const fetchConversationsFail = (error) => {
    return {
        type: actionTypes.FETCH_CONVERSATIONS_SUCCESS,
        error: error
    }
}

export const clearFetchConversationsMessage = () => {
    return {
        type: actionTypes.CLEAR_FETCH_CONVERSATIONS_MESSAGES
    }
}

export const fetchConversations = () => async dispatch => {
    dispatch(fetchConversationsStart());

    const res = await axios.get('/api/fetch_conversations');

    if(res.data.conversations) {
        let conversations = res.data.conversations;
        let currentDate = new Date();
        
        let onGoing = conversations.filter(conversation => (new Date(conversation.closingDate) > new Date(currentDate) ));
        let expired = conversations.filter(conversation => (new Date(conversation.closingDate) < new Date(currentDate)));

        dispatch(fetchConversationsSuccess(onGoing, expired))
    } else if (res.data.error) {
        dispatch(fetchConversationsFail(res.data.error))
    }
}

// start new conversation

export const startNewConversationStart = () => {
    return {
        type: actionTypes.START_NEW_CONVERSATION_START
    }
}

export const startNewConversationSuccess = (updatedOngoingConversations, successInfo) => {
    return {
        type: actionTypes.START_NEW_CONVERSATION_SUCCESS,
        updatedOngoingConversations: updatedOngoingConversations,
        successInfo: successInfo
    }
}

export const startNewConversationFail = (error) => {
    return {
        type: actionTypes.START_NEW_CONVERSATION_FAIL,
        error: error
    }
}

export const clearStartNewConversationInfo = () => {
    return {
        type: actionTypes.CLEAR_START_NEW_CONVERSATION_INFO
    }
}

export const startNewConversation = (type, topic, initiatorId, initiator, onGoingConversations) => async dispatch => {
    dispatch(startNewConversationStart());

    const res = await axios.post('/api/start_new_conversation', {
        type: type,
        topic: topic,
        initiator: initiator,
        initiatorId: initiatorId
    });

    if (res.data.conversation) {
        let updatedOngoingConversations = [res.data.conversation, ...onGoingConversations];
        dispatch(startNewConversationSuccess(updatedOngoingConversations, 'conversation started'));
    } else if (res.data.error) {
        dispatch(startNewConversationFail(res.data.error));
    }
}