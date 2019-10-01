const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
  startDate: {
    type: Date
  },
  closingDate: {
    type: Date
  },
  topic: String,
  type: String,
  initiator: String,
  initiatorId: String
});

module.exports = mongoose.model('conversations', conversationSchema);
