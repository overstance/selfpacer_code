const mongoose = require('mongoose');
const { Schema } = mongoose;

const inspiration = new Schema({
  inspireText: String
});

module.exports = mongoose.model('inspirations', inspiration);
