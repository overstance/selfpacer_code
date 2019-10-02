import React, { Component } from 'react';
import classes from './conversation.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Conversation extends Component {

    componentDidMount() {
        
        if (this.props.useTypeContext === '0') {
            this.props.history.push('/login');
        }   

        if (this.props.onGoingConversations.length === 0) {
            this.props.history.push('/facilitate');
        } else {
            // this.props.onFetchOpinions(this.props.match.params.id);
        }
    }

    render() {

        let displayedClosingDate;
        let topic;

        let currentConversation = this.props.onGoingConversations.find(conversation => conversation._id === this.props.match.params.id );

        if (currentConversation) {
            topic = currentConversation.topic;
            displayedClosingDate = new Date(currentConversation.closingDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        
        return (
            <div className={classes.backdrop}>
                <div className={classes.pageContainer}>
                    <Link to='/facilitate' className={classes.goBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"/>
                        </svg>
                        Go Back
                    </Link>
                    <div className={classes.header}>
                        <div className={classes.topic}>
                            {topic}
                        </div>
                        <div className={classes.options}>
                            <div className={classes.closing}>
                                <span>closing: </span><div>{displayedClosingDate}</div>
                            </div>
                            <div className={classes.buttons}>
                                <div className={classes.button}>
                                    close
                                </div>
                                <div className={classes.button}>
                                    extend
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        useTypeContext: state.auth.useTypeContext,
        onGoingConversations: state.conversation.onGoingConversations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onFetchOpinions: (conversationId) => dispatch(fetchOpinions(conversationId)),
        // onFetchConversations: () => dispatch(actions.fetchConversations()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);