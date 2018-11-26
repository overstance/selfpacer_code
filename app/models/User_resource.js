const mongoose = require('mongoose');
const { Schema } = mongoose;

const user_resourceSchema = new Schema({
  subject: String,
  tpye: String,
  date: {
    type: Date,
    default: Date.now()
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  link: String
});

module.exports = mongoose.model('user_resource', user_resourceSchema);
