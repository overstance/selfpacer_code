const mongoose = require('mongoose');
const { Schema } = mongoose;

const opinionSchema = new Schema({
  postDate: {
    type: Date
  },
  conversationId: String,
  opiner: String,
  opinerId: String,
  type: String,
  text: String,
  linkUrl: String,
  linkDescription: String,
  imageUrl: String,
  imageCaption: String
});

module.exports = mongoose.model('opinions', opinionSchema);
