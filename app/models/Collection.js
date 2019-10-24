const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: String,
  public: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  resources: Array,
  date: {
    type: Date,
    default: Date.now()
  },
  lastUpdated: {
    type: Date
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  curator: String
});

collectionSchema.index({ title: 'text' });

module.exports = mongoose.model('collections', collectionSchema);
