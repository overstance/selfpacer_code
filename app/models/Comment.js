const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentDate: {
    type: Date
  },
  commentText: String,
  displayDate: String,
  type: String,
  commentor: String,
  commentorName: String,
  parentBlog: String,
  parentComment: String
  /* replies: {
    type: Array,
    default: []
  } */
});

module.exports = mongoose.model('comments', commentSchema);
