const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: String,
  public: {
    type: Boolean,
    default: false
  },
  description: String,
  resources: Array,
  date: {
    type: Date,
    default: Date.now()
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('collections', collectionSchema);
