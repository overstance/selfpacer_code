const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  meta: {
    type: Object
  },
  caption: {
    type: String
  },
  imageType: {
    type: String
  }
});

module.exports = mongoose.model('images', imageSchema);
