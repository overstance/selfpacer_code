const mongoose = require('mongoose');
const { Schema } = mongoose;

const resourceSchema = new Schema({
  dateAdded: {
    type: Date,
    default: Date.now()
  },
  lastEdited: {
    type: Date
  },
  category: String,
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
  collectCount: {
    type: Number,
    default: 0
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  source: String,
  youtubeId: String,
  youtubeviews: String,
  youtubelikes: String,
  videoCount: String,
  tutor: String,
  enrollees: String,
  duration: String,
  level: String,
  lastUpdated: String,
  avgRating: String,
  author: String,
  confirmed: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('resources', resourceSchema);
