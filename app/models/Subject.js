const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
  title: String,
  category: String,
  src: String,
  alt: String,
  to: String,
  paths: Array,
  curriculum: Array,
  views: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('subjects', subjectSchema);
