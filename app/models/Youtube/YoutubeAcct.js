const mongoose = require('mongoose');
const { Schema } = mongoose;

const youtubeAcctSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  publishDate: Number,
  title: String,
  img: String,
  link: String,
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  youtubeId: String,
  source: String,
  youtubeviews: String,
  youtubelikes: String,
  videoCount: String
});

module.exports = mongoose.model('youtubeAccts', youtubeAcctSchema);
