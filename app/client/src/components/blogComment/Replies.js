import React, { Component } from 'react';
import classes from './comment.module.css';
import { connect } from 'react-redux';
import Reply from './reply';

class Replies extends Component {

    render () {
        let commentReplies = this.props.replies.filter(reply => reply.parentComment === this.props.commentId).map((reply, i) => (
            <Reply 
            key={i}
            commentor={reply.commentorName}
            displayDate={reply.displayDate}
            commentDate={reply.commentDate}
            commentText={reply.commentText}
            />
        ));
        
        return(
            <div className={classes.repliesContainer}>
               { commentReplies}
            </div>    
        );
    }
    
}

const mapStateToProps = state => {
    return {
        replies: state.blog.replies,
        isReplyingComment: state.blog.isReplyingComment,
    };
};

export default connect(mapStateToProps)(Replies);