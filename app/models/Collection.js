const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: String,
  resources: Array,
  date: {
    type: Date,
    default: Date.now()
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('collections', collectionSchema);
