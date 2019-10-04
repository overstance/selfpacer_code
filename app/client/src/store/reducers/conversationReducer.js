import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    fetchConversationsLoading: false,
    fetchConversationsError: null,
    expiredConversations: [],
    onGoingConversations: [],
    
    startNewConversationLoading: false,
    startNewConversationError: null,
    startNewConversationSuccessInfo: null,

    fetchOpinionsLoading: false,
    fetchOpinionsError: null,
    fetchMoreOpinionsLoading: false,
    fetchMoreOpinionsError: false,
    latestOpinionsFetchLength: 0,
    opinions: [],

    latestOpinionPostId: null,

    postOpinionTextLoading: false,
    postOpinionTextError: null,
    postOpinionTextSuccessInfo: null,
    postedOpinionTextId: null,
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

const fetchOpinionsStart = (state, action) => {
    return updateObject(state, {
        fetchOpinionsLoading: true,
        fetchOpinionsError: null
    });
}

const fetchOpinionsSuccess = (state, action) => {
    return updateObject(state, {
        fetchOpinionsLoading: false,
        latestOpinionsFetchLength: action.fetchLength,
        opinions: action.opinions,
    });
}

const fetchOpinionsFail = (state, action) => {
    return updateObject(state, {
        fetchOpinionsLoading: false,
        fetchOpinionsError: action.error
    });
}

const fetchMoreOpinionsStart = (state, action) => {
    return updateObject(state, {
        fetchMoreOpinionsLoading: true,
        fetchMoreOpinionsError: null
    });
}

const fetchMoreOpinionsSuccess = (state, action) => {
    return updateObject(state, {
        fetchMoreOpinionsLoading: false,
        latestOpinionsFetchLength: action.fetchLength,
        opinions: action.opinions,
    });
}

const fetchMoreOpinionsFail = (state, action) => {
    return updateObject(state, {
        fetchMoreOpinionsLoading: false,
        fetchMoreOpinionsError: action.error
    });
}

// post opinion text

const postOpinionTextStart = (state, action) => {
    return updateObject(state, {
        postOpinionTextLoading: true,
        postOpinionTextSuccessInfo: null,
        postOpinionTextError: null
    });
}

const postOpinionTextSuccess = (state, action) => {
    return updateObject(state, {
        postOpinionTextLoading: false,
        postedOpinionTextId: action.postedOpinionTextId,
        postOpinionTextSuccessInfo: action.successInfo,
        opinions: action.updatedOpinions,
        latestOpinionPostId: action.postedOpinionTextId
    });
}

const postOpinionTextFail = (state, action) => {
    return updateObject(state, {
        postOpinionTextLoading: false,
        postOpinionTextError: action.error
    });
}

const clearFetchOpinionsMessage = (state, action) => {
    return updateObject(state, {
        fetchOpinionsError: null,
        fetchMoreOpinionsLoading: null,
        postOpinionTextError: null,
        postOpinionTextSuccessInfo: null,
        postedOpinionTextId: null
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

        case actionTypes.FETCH_OPINIONS_START: return fetchOpinionsStart(state, action);
        case actionTypes.FETCH_OPINIONS_SUCCESS: return fetchOpinionsSuccess(state, action);
        case actionTypes.FETCH_OPINIONS_FAIL: return fetchOpinionsFail(state, action);

        case actionTypes.FETCH_MORE_OPINIONS_START: return fetchMoreOpinionsStart(state, action);
        case actionTypes.FETCH_MORE_OPINIONS_SUCCESS: return fetchMoreOpinionsSuccess(state, action);
        case actionTypes.FETCH_MORE_OPINIONS_FAIL: return fetchMoreOpinionsFail(state, action);

        case actionTypes.POST_OPINION_TEXT_START: return postOpinionTextStart(state, action);
        case actionTypes.POST_OPINION_TEXT_SUCCESS: return postOpinionTextSuccess(state, action);
        case actionTypes.POST_OPINION_TEXT_FAIL: return postOpinionTextFail(state, action);

        case actionTypes.CLEAR_FETCH_OPINIONS_MESSAGES: return clearFetchOpinionsMessage(state, action);

        default: return state;
    }
}

export default reducer;