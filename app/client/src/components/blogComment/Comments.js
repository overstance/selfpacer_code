import React, { Component } from 'react';
import classes from './comment.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Comment from './Comment';

class Comments extends Component {

    componentDidMount() {
        this.props.onFetchBlogComments(this.props.blogId);
    }

    replyingComment = (commentId, commentor) => {
        this.props.onReplyingComment(commentId, commentor);
    }

    render() {

        let comments = this.props.comments.map((comment, i) => (
            <Comment 
            key={i}
            commentId={comment._id}
            commentor={comment.commentorName}
            displayDate={comment.displayDate}
            commentText={comment.commentText}
            replyClicked={() => this.replyingComment(comment._id, comment.commentorName)}
            />
        ))
        return(
            <div className={classes.allCommentsContainer}>
                {comments}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        comments: state.blog.comments.mainComments,
        replies: state.blog.comments.replies
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onSetIsBlogPage: () => dispatch(actions.setIsBlogPage()),
        onUnsetIsBlogPage: () => dispatch(actions.unsetIsBlogPage()),
        onFetchBlogPost: (year, month, day, slug) => dispatch(actions.fetchBlogPost(year, month, day, slug))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Comments);