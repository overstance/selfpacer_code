import React, { Component } from 'react';
import classes from './comment.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './comment';
import Button from '../../components/UserInterface/Button/Button';
import Spinner from '../../components/UserInterface/Spinner/Spinner';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.focus = this.focus.bind(this);
    }

    focus() {
        this.textInput.current.focus();
    }

    state = {
        commentText: '',
        commentFillError: null,
    }

    componentDidUpdate(prevProps) {
        if(this.props.postedComment !== prevProps.postedComment && this.props.postCommentSuccessMessage) {
            this.setState({ commentText: ''});
        }
    }

    componentWillUnmount() {
        this.setState({ commentToReplyId: null, commentToReplyCommentor: null, isReplyingComment: false });
        this.props.onClearBlogPostMessages()
    }

    replyingComment = (commentId, commentor, commentText) => {
        this.props.onReplyingComment(commentId, commentor, commentText);
        this.focus();
    }
    
    captureCommentText = (event) => {
        this.setState({ commentText: event.target.value, commentFillError: null});   
    }

    postComment = (event) => {
        event.preventDefault();

        if (this.state.commentText === '') {

            this.setState({ fillError: 'comment box empty' });
        
        } else {
            if (this.props.isReplyingComment) {
                // console.log(this.props.isReplyingComment, this.props.commentToReplyText)
                this.props.onPostUserCommentReply(
                    this.props.commentToReplyId,
                    this.props.userId, 
                    this.props.userName, 
                    this.props.blogId, 
                    this.state.commentText, 
                    this.props.currentBlogReplies
                );
            } else {
                // console.log(this.props.isReplyingComment, this.props.commentToReplyText)
                this.props.onPostUserComment(this.props.userId, this.props.userName, this.props.blogId, this.state.commentText, this.props.currentBlogComments);
            }
        }   
    };

    cancelReply = () => {
        this.props.onCancelReply();
        this.setState({ commentText: ''});
    }

    render() {

        let formButtonText = 'Post';

        if (this.props.postCommentLoading) {
            formButtonText = <Spinner isButton/>;
        } 

        let comments = this.props.currentBlogComments.map((comment, i) => (
            <Comment 
            key={i}
            isAuthenticated={this.props.isAuthenticated}
            commentId={comment._id}
            commentor={comment.commentorName}
            displayDate={comment.displayDate}
            commentDate={comment.commentDate}
            commentText={comment.commentText}
            replyClicked={() => this.replyingComment(comment._id, comment.commentorName, comment.commentText)}
            />
        ))

        if (this.props.fetchBlogCommentsLoading) {
            comments = 
            <div className={classes.commentsLoading}>
                Comments Loading ...
            </div>
        } else if (!this.props.fetchBlogCommentsLoading && this.props.fetchBlogCommentsError) {
            comments =
            <div className={classes.fetchCommentsError}>
                {this.props.fetchBlogCommentsError}
            </div>
        }

        if (this.props.currentBlogComments.length === 0) {
            comments = 
            <div className={classes.noComments}>
                <div>No comments yet,</div>
                <div>Be the fist to comment.</div>
            </div>
        }

        let attachedClasses = [classes.commentSection, classes.Close];

        if (this.props.showComments) {
            attachedClasses = [classes.commentSection, classes.Open];
        }

        let currentBlogTitle = this.props.blogTitle;
        
        if(currentBlogTitle.length > 60) {
            let elipses = '...';
            let shortenedTitle = currentBlogTitle.slice(0, 60);

            currentBlogTitle = shortenedTitle.concat(elipses)
        }

        let commentToReplyInfo = null;

        if (this.props.isReplyingComment) {
            commentToReplyInfo = 
            <span>
                <button onClick={this.cancelReply}>cancel</button>
                replying...
                <strong>{this.props.commentToReplyCommentor}</strong>
            </span>
        }

        return(
            <React.Fragment
            >
                <div
                className={classes.backdrop}
                onClick={this.props.closeCommentsClicked}
                />    
                <div
                    className={attachedClasses.join(' ')}
                >
                    <div className={classes.headerWrapper}>
                        <div className={classes.commentSectionHeader}>
                            <span onClick={this.props.closeCommentsClicked}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                            </svg>
                            </span>
                            <div>Comments</div>
                        </div>
                        { this.props.isAuthenticated && this.props.userId ?   
                            <div className={classes.commentTextInputSection}>
                                <form onSubmit={this.postComment}>
                                    <textarea 
                                        ref={this.textInput}
                                        placeholder="enter your comment"
                                        className={classes.commentInput}
                                        value={this.state.commentText} 
                                        onChange={this.captureCommentText}
                                    />
                                    { this.state.commentText === '' || this.state.commentFillError ? 
                                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                                        <Button btnType='Success'> {formButtonText} </Button>    
                                    }
                                </form>
                            </div>
                            :
                            <div className={classes.commentAuthRequiredSection}>
                                <Link to='/login'>log in to comment</Link>
                            </div>
                        }
                        <div className={classes.replyingBlog}>
                            {commentToReplyInfo}
                        </div>
                        <div className={classes.formFeedBack}> 
                            { this.state.commentFillError ? <span className={classes.fillError}>{this.state.commentFillError}</span> : null}
                            { this.props.postCommentError ? <span className={classes.fillError}>{this.props.postCommentError}</span> : null}
                            { this.props.postCommentSuccessMessage ? <span className={classes.commentPostSuccess}>{this.props.postCommentSuccessMessage}</span> : null} 
                        </div>
                    </div>
                    <div className={classes.commentSectionWrapper}>  
                        <div className={classes.comments}>        
                            {comments}
                        </div>   
                    </div>
                    <div className={classes.blogTitle}>
                        {currentBlogTitle}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetchBlogCommentsLoading: state.blog.fetchBlogCommentsLoading,
        fetchBlogCommentsError: state.blog.fetchBlogCommentsError,
        currentBlogComments: state.blog.mainComments,
        currentBlogReplies: state.blog.replies,

        userId: state.auth.user._id,
        userName: state.auth.user.name,
        isAuthenticated: state.auth.isAuthenticated,

        commentToReplyId: state.blog.commentToReplyId,
        commentToReplyCommentor: state.blog.commentToReplyCommentor,
        commentToReplyText: state.blog.commentToReplyText,
        isReplyingComment: state.blog.isReplyingComment,

        postedComment: state.blog.postedCommentId,
        postCommentLoading: state.blog.postCommentLoading,
        postCommentError: state.blog.postCommentError,
        postCommentSuccessMessage: state.blog.postCommentSuccessMessage
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onCancelReply: () => dispatch(actions.cancelReply()),
        onFetchBlogComments: (blogId) => dispatch(actions.fetchBlogComments(blogId)),
        onPostUserComment: (userId, userName, blogId, commentText, comments) => dispatch(actions.postUserComment(userId, userName, blogId, commentText, comments)),
        onReplyingComment: (commentId, commentor, commentText) => dispatch(actions.replyingComment(commentId, commentor, commentText)),
        onPostUserCommentReply: (commentToReplyId, userId, userName, blogId, commentText, replies) => dispatch(actions.postUserCommentReply(commentToReplyId, userId, userName, blogId, commentText, replies)),
        onClearBlogPostMessages: () => dispatch(actions.clearBlogPostMessages())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Comments);