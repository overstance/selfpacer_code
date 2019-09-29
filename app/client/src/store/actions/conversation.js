import axios from 'axios';
import * as actionTypes from './actionTypes';

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