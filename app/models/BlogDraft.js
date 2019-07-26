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
  createdOn: {
    type: Date
  },
  updatedOn: {
    type: Date
  }
});

module.exports = mongoose.model('blogDrafts', blogDraftSchema);
