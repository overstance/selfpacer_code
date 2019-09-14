import React, { Component } from 'react';
import classes from './comment.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Comment from './Comment';
import Button from '../../components/UserInterface/Button/Button';
// import Input from '../../components/UserInterface/Input/Input';
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
        /* commentToReplyId: null,
        commentToReplyCommentor: null,
        commentToReplyText: null,
        isReplyingComment: false, */
        commentText: '',
        commentFillError: null,
        // comments: [],
    }

    /* componentDidMount() {
        // this.props.onFetchBlogComments(this.props.blogId);
        this.setState({ comments: this.props.comments});
    } */

    componentDidUpdate(prevProps) {
        if(this.props.postedComment !== prevProps.postedComment && this.props.postCommentSuccessMessage) {
            this.setState({ commentText: ''});
            // console.log(this.props.currentBlogComments, prevProps.currentBlogComments);
            // this.setState({ comments: this.props.currentBlogComments});
        }
    }

    componentWillUnmount() {
        this.setState({ commentToReplyId: null, commentToReplyCommentor: null, isReplyingComment: false });
        this.props.onClearBlogCommentMessages()
    }

    replyingComment = (commentId, commentor, commentText) => {
        this.props.onReplyingComment(commentId, commentor, commentText);
        // this.setState({ commentToReplyId: commentId, commentToReplyCommentor: commentor, commentToReplyText: commentText, isReplyingComment: true });
        this.focus();
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
    
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
    
        return isValid;
    }
    
      captureCommentText = (event) => {
        /* const updated = {
            ...this.state.commentText,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.commentText.validation),
            touched: true
        } */
        this.setState({ commentText: event.target.value, commentFillError: null});   
      }
    
      postComment = (event) => {
        event.preventDefault();
    
        if (/* !this.state.commentText.touched || */ this.state.commentText === '') {
           /*  const updated = {
                ...this.state.commentText,
                touched: true,
                valid: false
            } */
    
            this.setState({ fillError: 'comment box empty'/* , commentText: updated */ });
        } else {
          if (this.props.isReplyingComment) {
              console.log(this.props.isReplyingComment, this.props.commentToReplyText)
            this.props.onPostUserCommentReply(
                this.props.commentToReplyId,
                this.props.userId, 
                this.props.userName, 
                this.props.blogId, 
                this.state.commentText, 
                this.props.currentBlogReplies
            );
            /* const updated = {
              ...this.state.commentText,
              value: '',
              touched: false
            } */
            // console.log(this.state.commentToReplyText);
            // this.setState({ commentText: '', isReplyingComment: false, commentToReplyId: null, commentToReplyCommentor: null }, () =>{console.log(this.state.commentToReplyText)});
          } else {
            console.log(this.props.isReplyingComment, this.props.commentToReplyText)
            this.props.onPostUserComment(this.props.userId, this.props.userName, this.props.blogId, this.state.commentText, this.props.currentBlogComments);
            /* const updated = {
              ...this.state.commentText,
              value: '',
              touched: false
            } */
            // console.log(this.state.commentToReplyText);
            // this.setState({ commentText: '', isReplyingComment: false, commentToReplyId: null, commentToReplyCommentor: null}, () =>{console.log(this.state.commentToReplyText)});
          }
        }   
      };

    render() {

        let formButtonText = 'Post';

        if (this.props.postCommentLoading) {
            formButtonText = <Spinner isButton/>;
        }  

        let comments = this.props.currentBlogComments.map((comment, i) => (
            <Comment 
            key={i}
            commentId={comment._id}
            commentor={comment.commentorName}
            displayDate={comment.displayDate}
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

        let attachedClasses = [classes.commentSection, classes.Close];

        if (this.props.showComments) {
            attachedClasses = [classes.commentSection, classes.Open];
        }

        let currentBlogTitle = this.props.blogTitle;
        if(currentBlogTitle.length > 30) {
            let elipses = '...';
            let shortenedTitle = currentBlogTitle.slice(0, 30);

            currentBlogTitle = shortenedTitle.concat(elipses)
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
                    // show={this.props.show}
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
                        <div className={classes.blogTitle}>
                            {currentBlogTitle}
                        </div>  
                        { this.state.commentFillError ? <div className={classes.fillError}>{this.state.commentFillError}</div> : null}
                        { this.props.postCommentError ? <div className={classes.fillError}>{this.props.postCommentError}</div> : null}
                        { this.props.postCommentSuccessMessage ? <div className={classes.commentPostSuccess}>{this.props.postCommentSuccessMessage}</div> : null} 
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
                    </div>
                    <div className={classes.commentSectionWrapper}>  
                        <div className={classes.comments}>        
                            {comments}
                        </div>
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

        postedComment: state.blog.postedComment,
        postCommentLoading: state.blog.postCommentLoading,
        postCommentError: state.blog.postCommentError,
        postCommentSuccessMessage: state.blog.postCommentSuccessMessage
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onFetchBlogComments: (blogId) => dispatch(actions.fetchBlogComments(blogId)),
        onPostUserComment: (userId, userName, blogId, commentText, comments) => dispatch(actions.postUserComment(userId, userName, blogId, commentText, comments)),
        onReplyingComment: (commentId, commentor, commentText) => dispatch(actions.replyingComment(commentId, commentor, commentText)),
        onPostUserCommentReply: (commentToReplyId, userId, userName, blogId, commentText, replies) => dispatch(actions.postUserCommentReply(commentToReplyId, userId, userName, blogId, commentText, replies)),
        onClearBlogCommentMessages: () => dispatch(actions.clearBlogCommentMessages())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Comments);