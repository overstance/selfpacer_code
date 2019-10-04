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

//  fetch conversation opinions

export const fetchOpinionsStart = () => {
    return {
        type: actionTypes.FETCH_OPINIONS_START
    }
}

export const fetchOpinionsSuccess = (opinions, fetchLength) => {
    return {
        type: actionTypes.FETCH_OPINIONS_SUCCESS,
        opinions: opinions,
        fetchLength: fetchLength
    }
}

export const fetchOpinionsFail = (error) => {
    return {
        type: actionTypes.FETCH_OPINIONS_FAIL,
        error: error
    }
}

export const fetchMoreOpinionsStart = () => {
    return {
        type: actionTypes.FETCH_MORE_OPINIONS_START
    }
}

export const fetchMoreOpinionsSuccess = (opinions, fetchLength) => {
    return {
        type: actionTypes.FETCH_MORE_OPINIONS_SUCCESS,
        opinions: opinions,
        fetchLength: fetchLength
    }
}

export const fetchMoreOpinionsFail = (error) => {
    return {
        type: actionTypes.FETCH_MORE_OPINIONS_FAIL,
        error: error
    }
}

export const fetchOpinions = (conversationId) => async dispatch => {
    dispatch(fetchOpinionsStart());

    const res = await axios.get('/api/fetch_opinions', {params: {conversationId: conversationId, pageIndex: 0}});

    if(res.data.opinions) {

        dispatch(fetchOpinionsSuccess(res.data.opinions, res.data.opinions.length))
    } else if (res.data.error) {
        dispatch(fetchOpinionsFail(res.data.error));
    }
}

export const fetchMoreOpinions = (conversationId, pageIndex, opinions) => async dispatch => {
    dispatch(fetchMoreOpinionsStart());

    const res = await axios.get('/api/fetch_opinions', {params: {conversationId: conversationId, pageIndex: pageIndex}});

    if(res.data.opinions) {

        let updatedOpinions = [...opinions, ...res.data.opinions]
        dispatch(fetchMoreOpinionsSuccess(updatedOpinions, res.data.opinions.length))
    } else if (res.data.error) {
        dispatch(fetchMoreOpinionsFail(res.data.error));
    }
}


export const clearFetchOpinionsMessage = () => {
    return {
        type: actionTypes.CLEAR_FETCH_OPINIONS_MESSAGES
    }
}

//  post opinion text

export const postOpinionTextStart = () => {
    return {
        type: actionTypes.POST_OPINION_TEXT_START
    }
}

export const postOpinionTextSuccess = (updatedOpinions, postedOpinionTextId, successInfo) => {
    return {
        type: actionTypes.POST_OPINION_TEXT_SUCCESS,
        updatedOpinions: updatedOpinions,
        postedOpinionTextId: postedOpinionTextId,
        successInfo: successInfo
    }
}

export const postOpinionTextFail = (error) => {
    return {
        type: actionTypes.POST_OPINION_TEXT_FAIL,
        error: error
    }
}

export const postOpinionText = (opinionText, opinions, conversationId, opiner, opinerId) => async dispatch => {
    dispatch(postOpinionTextStart());

    const res = await axios.post('/api/post_opinion_text', {
            opinionText: opinionText,
            conversationId: conversationId,
            opiner: opiner,
            opinerId: opinerId
        }
    );

    if(res.data.postedOpinionText) {
        let updatedOpinions = [res.data.postedOpinionText, ...opinions];
        dispatch(postOpinionTextSuccess(updatedOpinions, res.data.postedOpinionText._id, 'opinion posted'))
    } else if (res.data.error) {
        dispatch(postOpinionTextFail(res.data.error));
    }
}