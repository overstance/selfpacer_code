import React, { Component } from 'react';
import classes from './conversation.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Dialogue from '../../components/Dialogues/Dialogue/Dialogue';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Button from '../../components/UserInterface/Button/Button';
import Opinion from './opinion';
import PostLink from './nonTextOpinionPost/PostLink';
import PostImage from './nonTextOpinionPost/PostImage';
import LoadMorePrompt from '../../components/UserInterface/LoadMorePrompt/LoadMore';


class Conversation extends Component {    

    state = {
        opinionText: '',
        opinionFillError: null,
        pageIndex: 0,
        conversationId: null,
        maxFetchLength: 10,

        showPostLink: false,
        showPostImage: false
    }

    componentDidMount() {
        if (this.props.useTypeContext === '0') {
            this.props.history.push('/login');
        }   

        if (this.props.onGoingConversations.length === 0) {
            this.props.history.push('/facilitate');
        } else {
            this.props.onFetchOpinions(this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.postedOpinionTextId !== prevProps.postedOpinionTextId && this.props.postOpinionTextSuccessInfo) {
            this.setState({ opinionText: '' });
        }

        if(this.props.latestOpinionPostId !== prevProps.latestOpinionPostId) {
            document.getElementById('conversationOpinionsTop').focus();
        }
    }

    componentWillUnmount() {
        this.props.onClearFetchOpinionsMessage();
    }

    opinionInputChange = (event) => {
        this.setState({ opinionText: event.target.value, opinionFillError: null});   
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    postOpinionText = (event) => {
        event.preventDefault();

        if (this.state.opinionText === '') {
            this.setState({ opinionFillError: 'please enter your opinion'});
        } else {
            this.props.onPostOpinionText(this.state.opinionText, this.props.opinions, this.props.match.params.id, this.props.user.name, this.props.user._id);
        }
    }

    showPostLinkModal = () => {
        this.setState({ showPostLink: true });
    }

    closePostLink = () => {
        this.setState({ showPostLink: false });
        this.props.onClearNonTextOpinionPostMessages();
    }

    showPostImageModal = () => {
        this.setState({ showPostImage: true });
    }

    closePostImage = () => {
        this.setState({ showPostImage: false });
        this.props.onClearNonTextOpinionPostMessages();
    }

    /* 
        // this onScroll function is used to automatically load more opinion on reaching bottom of opinions wrapper
        scrollCheck = event => {
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        if (bottom && this.props.latestOpinionsFetchLength === this.state.maxFetchLength && !this.props.fetchMoreOpinionsLoading) {
            this.setState({ pageIndex: this.state.pageIndex + 1}, () => {
                this.props.onFetchMoreOpinions(this.props.match.params.id, this.state.pageIndex, this.props.opinions);
            });       
        }
    }; */

    fetchMoreOpinions = () => {
        this.setState({ pageIndex: this.state.pageIndex + 1}, () => {
            this.props.onFetchMoreOpinions(this.props.match.params.id, this.state.pageIndex, this.props.opinions);
        });
    }

        

    render() {

        let displayedClosingDate;
        let topic;
        let currentConversation = this.props.onGoingConversations.find(conversation => conversation._id === this.props.match.params.id );
        if (currentConversation) {
            topic = currentConversation.topic;
            displayedClosingDate = new Date(currentConversation.closingDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }

        let formButtonText = 'post';
        if (this.props.postOpinionTextLoading) {
            formButtonText = <Spinner isButton/>;
        }

        let opinions = <Spinner isComponent/>

        if (!this.props.fetchOpinionsLoading && !this.props.fetchOpinionsError && this.props.opinions.length === 0) {
            
            opinions =
            <PostActionInfo isSuccess>
                No opinion posted yet, be the first to share an opinion.
            </PostActionInfo>
        } else if (!this.props.fetchOpinionsLoading && !this.props.fetchOpinionsError && this.props.opinions.length > 0) {
            opinions = this.props.opinions.map((opinion, i) => (
                <Opinion 
                    key={i}
                    postDate={opinion.postDate}
                    opiner={opinion.opiner}
                    opinionText={opinion.text}
                    type={opinion.type}
                    linkDescription={opinion.linkDescription}
                    linkUrl={opinion.linkUrl}
                    imageUrl={opinion.imageUrl}
                    imageCaption={opinion.imageCaption}
                />
            ));
        } else if (!this.props.fetchOpinionsLoading) {
            opinions =
            <Dialogue 
                showDialogue
                isFetchError
                handleBack={this.handleBack}
            >
                {this.props.fetchOpinionsError}
            </Dialogue>
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
                            {   this.props.user.accountType === 'Senior Administrator' || 
                                this.props.user.accountType === 'Head Administrator' ?
                                <div className={classes.buttons}>
                                    <div className={classes.button}>
                                        close
                                    </div>
                                    <div className={classes.button}>
                                        extend
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    <div className={classes.postSection}>
                        <form onSubmit={this.postOpinionText}>
                            <div className={classes.textAreaWrapper}>
                                <textarea 
                                    ref={this.textInput}
                                    placeholder="share an opinion"
                                    value={this.state.opinionText} 
                                    onChange={this.opinionInputChange}
                                />
                            </div>
                            { this.state.opinionText === '' || this.state.opinionFillError || this.props.postOpinionTextLoading ? 
                                <Button btnType='Danger' disabled> {formButtonText} </Button> :
                                <Button btnType='Success'> {formButtonText} </Button>    
                            }
                        </form>
                        <div className={classes.otherPostOptions}>  
                            <div className={classes.linkPost} onClick={this.showPostLinkModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 01-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0120.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0020.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 00-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
                                </svg>
                                <span>post link</span>
                            </div>
                            { this.props.user.isArtist ?
                                <div className={classes.imagePost} onClick={this.showPostImageModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"/>
                                    </svg>
                                    <span>post image</span>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    <div className={classes.formFeedBack}> 
                        { this.state.opinionFillError ? <span className={classes.fillError}>{this.state.opinionFillError}</span> : null}
                        { this.props.postOpinionTextError ? <span className={classes.fillError}>{this.props.postOpinionTextError}</span> : null}
                        { this.props.postOpinionTextSuccessInfo ? <span className={classes.postSuccess}>{this.props.postOpinionTextSuccessInfo}</span> : null} 
                    </div>
                    <div className={classes.opinionSectionWrapper} /* onScroll={this.scrollCheck} */>
                        <div tabIndex="0" id="conversationOpinionsTop"/>      
                        <div className={classes.opinions}>        
                            {opinions}
                            {/* {this.props.fetchMoreOpinionsLoading ? <LoadMorePrompt /> : null} */}
                            {this.props.latestOpinionsFetchLength === this.state.maxFetchLength ?
                                <LoadMorePrompt 
                                    isLoadMoreOnClick
                                    loadMore={this.fetchMoreOpinions}
                                    loading={this.props.fetchMoreOpinionsLoading}
                                /> : null
                            }
                        </div>   
                    </div>
                </div>
                <Dialogue
                isPostLinkOpinion
                showDialogue={this.state.showPostLink}
                closeDialogue={this.closePostLink}
                >
                    <PostLink 
                    conversationId={this.props.match.params.id}
                    />
                </Dialogue>
                <Dialogue
                isPostImageOpinion
                showDialogue={this.state.showPostImage}
                closeDialogue={this.closePostImage}
                >
                    <PostImage 
                    conversationId={this.props.match.params.id}
                    />
                </Dialogue>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        useTypeContext: state.auth.useTypeContext,
        user: state.auth.user,

        latestOpinionPostId: state.conversation.latestOpinionPostId,
        
        onGoingConversations: state.conversation.onGoingConversations,
        
        fetchOpinionsLoading: state.conversation.fetchOpinionsLoading,
        fetchOpinionsError: state.conversation.fetchOpinionsError,
        fetchMoreOpinionsLoading: state.conversation.fetchMoreOpinionsLoading,
        fetchMoreOpinionsError: state.conversation.fetchMoreOpinionsError,
        latestOpinionsFetchLength:state.conversation.latestOpinionsFetchLength,
        opinions: state.conversation.opinions,

        postOpinionTextLoading: state.conversation.postOpinionTextLoading,
        postOpinionTextError: state.conversation.postOpinionTextError,
        postOpinionTextSuccessInfo: state.conversation.postOpinionTextSuccessInfo,
        postedOpinionTextId: state.conversation.postedOpinionTextId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOpinions: (conversationId) => dispatch(actions.fetchOpinions(conversationId)),
        onFetchMoreOpinions: (conversationId, pageIndex, opinions) => dispatch(actions.fetchMoreOpinions(conversationId, pageIndex, opinions)),
        onPostOpinionText: (opinionText, opinions, conversationId, opiner, opinerId) => dispatch(actions.postOpinionText(opinionText, opinions, conversationId, opiner, opinerId)),
        onClearNonTextOpinionPostMessages: () => dispatch( actions.clearNonTextOpinionPostMessages()),
        onClearFetchOpinionsMessage: () => dispatch(actions.clearFetchOpinionsMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);