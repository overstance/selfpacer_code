const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
  title: String,
  category: String,
  src: String,
  alt: String,
  /* to: String, */
  paths: Array,
  curriculum: Array,
  views: {
    type: Number,
    default: 0
  }
});

subjectSchema.index({ title: 'text', path: 'text' });

module.exports = mongoose.model('subjects', subjectSchema);
