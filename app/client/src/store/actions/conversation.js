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

//  post opinion link

export const postLinkOpinionStart = () => {
    return {
        type: actionTypes.POST_LINK_OPINION_START
    }
}

export const postLinkOpinionSuccess = (updatedOpinions, postedOpinionLinkId, successInfo) => {
    return {
        type: actionTypes.POST_LINK_OPINION_SUCCESS,
        updatedOpinions: updatedOpinions,
        postedOpinionLinkId: postedOpinionLinkId,
        successInfo: successInfo
    }
}

export const postLinkOpinionFail = (error) => {
    return {
        type: actionTypes.POST_LINK_OPINION_FAIL,
        error: error
    }
}

export const postLinkOpinion = (linkUrl, opinions, opiner, opinerId, conversationId) => async dispatch => {
    dispatch(postLinkOpinionStart());

    const res = await axios.post('/api/post_opinion_link', {
            linkUrl: linkUrl,
            conversationId: conversationId,
            opiner: opiner,
            opinerId: opinerId
        }
    );

    if(res.data.postedOpinionLink) {
        let updatedOpinions = [res.data.postedOpinionLink, ...opinions];
        dispatch(postLinkOpinionSuccess(updatedOpinions, res.data.postedOpinionLink._id, 'link posted'))
    } else if (res.data.error) {
        dispatch(postLinkOpinionFail(res.data.error));
    }
}

//  post opinion image

export const postImageOpinionStart = () => {
    return {
        type: actionTypes.POST_IMAGE_OPINION_START
    }
}

export const postImageOpinionSuccess = (updatedOpinions, postedOpinionImageId, successInfo) => {
    return {
        type: actionTypes.POST_IMAGE_OPINION_SUCCESS,
        updatedOpinions: updatedOpinions,
        postedOpinionImageId: postedOpinionImageId,
        successInfo: successInfo
    }
}

export const postImageOpinionFail = (error) => {
    return {
        type: actionTypes.POST_IMAGE_OPINION_FAIL,
        error: error
    }
}

export const postImageOpinion = (imageFile, caption, opinions, opiner, opinerId, conversationId) => async dispatch => {
    dispatch(postImageOpinionStart());

    let data = new FormData();   
    data.append('file', imageFile);

    let captionValue = caption;

    if ( captionValue === '') {
        captionValue = undefined
    }

    const res = await axios.post('/api/post_opinion_image', data, {params:  {
            captionValue: captionValue,
            conversationId: conversationId,
            opiner: opiner,
            opinerId: opinerId
        }}
    );

    if(res.data.postedOpinionImage) {
        let updatedOpinions = [res.data.postedOpinionImage, ...opinions];
        dispatch(postImageOpinionSuccess(updatedOpinions, res.data.postedOpinionImage._id, 'link posted'))
    } else if (res.data.error) {
        dispatch(postImageOpinionFail(res.data.error));
    }
}

//  close conversation

export const closeConversationStart = () => {
    return {
        type: actionTypes.CLOSE_CONVERSATION_START
    }
}

export const closeConversationSuccess = (successInfo) => {
    return {
        type: actionTypes.CLOSE_CONVERSATION_SUCCESS,
        successInfo: successInfo
    }
}

export const closeConversationFail = (error) => {
    return {
        type: actionTypes.CLOSE_CONVERSATION_FAIL,
        error: error
    }
}

export const closeConversation = (conversationId) => async dispatch => {
    dispatch(closeConversationStart());

    const res = await axios.put('/api/close_conversation', {conversationId: conversationId});

    if(res.data.successInfo) {
        dispatch(closeConversationSuccess(res.data.successInfo))
    } else if (res.data.error) {
        dispatch(closeConversationFail(res.data.error));
    }
}

//  extend conversation

export const extendConversationStart = () => {
    return {
        type: actionTypes.EXTEND_CONVERSATION_START
    }
}

export const extendConversationSuccess = (newCloseDate) => {
    return {
        type: actionTypes.EXTEND_CONVERSATION_SUCCESS,
        newCloseDate: newCloseDate
    }
}

export const extendConversationFail = (error) => {
    return {
        type: actionTypes.EXTEND_CONVERSATION_FAIL,
        error: error
    }
}

export const extendConversation = (conversationId) => async dispatch => {
    dispatch(extendConversationStart());

    const res = await axios.put('/api/extend_conversation', {conversationId: conversationId});

    if(res.data.newCloseDate) {
        dispatch(extendConversationSuccess(res.data.newCloseDate))
    } else if (res.data.error) {
        dispatch(extendConversationFail(res.data.error));
    }
}

// clear messages

export const clearConversationMessages = () => {
    return {
        type: actionTypes.CLEAR_CONVERSATION_MESSAGES
    }
}

export const clearNonTextOpinionPostMessages = () => {
    return {
        type: actionTypes.CLEAR_NON_TEXT_OPINION_POST_MESSAGES
    }
}