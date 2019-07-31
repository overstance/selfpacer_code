const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogDraftSchema = new Schema({
  content: {
    type: Object
  },
  htmlContent: {
    type: Object
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  featuredImage: {
    type: Object
  },
  featuredImageUrl: {
    type: String
  },
  createdOn: {
    type: Date
  },
  category: {
    type: String
  },
  Tags: {
    type: Array
  },
  status: {
    type: String,
    default: 'draft'
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedOn: {
    type: Date
  },
  publishedOn: {
    type: Date
  }
});

module.exports = mongoose.model('blogDrafts', blogDraftSchema);
