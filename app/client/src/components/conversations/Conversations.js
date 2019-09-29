import React, { Component } from 'react';
import classes from './conversations.module.css';
// import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Conversation from './conversation';

class Conversations extends Component {

    componentDidMount() {
        // this.props.onFetchConversations();
    }
    render() {

        let conversationCount = this.props.onGoingConversations.length;

        let conversationsArray = [
            {
                title: 'The poor state of education in Nigeria',
                type: 'Publication Research',
                initiator: 'Babatunde Ali-Brown',
                closingDate: new Date(),
            },
            {
                title: 'The poor state of education in Nigeria',
                type: 'Publication Research',
                initiator: 'Babatunde Ali-Brown',
                closingDate: new Date(),
            },
            {
                title: 'The poor state of education in Nigeria',
                type: 'Publication Research',
                initiator: 'Babatunde Ali-Brown',
                closingDate: new Date(),
            },
            {
                title: 'The poor state of education in Nigeria',
                type: 'Publication Research',
                initiator: 'Babatunde Ali-Brown',
                closingDate: new Date(),
            },
            {
                title: 'The poor state of education in Nigeria',
                type: 'Publication Research',
                initiator: 'Babatunde Ali-Brown',
                closingDate: new Date(),
            },
            {
                title: 'The poor state of education in Nigeria',
                type: 'Publication Research',
                initiator: 'Babatunde Ali-Brown',
                closingDate: new Date(),
            }
        ];

        let conversations = conversationsArray.map((conversation, i) => (
            <Conversation 
            key={i}
            title={conversation.title}
            type={conversation.type}
            initiator={conversation.initiator}
            closingDate={conversation.closingDate}
            />
        ))


        return(
            <div className={classes.container}>
                <div className={classes.conversations}>
                    <div className={classes.header}>
                        <div className={classes.heading}>
                            {'(' + conversationCount + ') conversations'}
                        </div>
                        { conversationCount < 10 ?
                            <div className={classes.startNew}>
                                <div className={classes.startNewButton}>
                                    start new
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    {conversations}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fetchConversationsLoading: state.conversation.fetchConversationsLoading,
    fetchConversationsError: state.conversation.fetchConversationsError,
    onGoingConversations: state.conversation.onGoingConversations
});

const mapDispatchToProps = dispatch => ({
    onFetchConversations: () => dispatch(actions.fetchConversations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations)