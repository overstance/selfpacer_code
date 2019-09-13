const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentDate: {
    type: Date
  },
  commentText: String,
  displayDate: String,
  type: String,
  commentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  commentorName: String,
  parentBlog: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogDraft' },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
  /* replies: {
    type: Array,
    default: []
  } */
});

module.exports = mongoose.model('comments', commentSchema);
