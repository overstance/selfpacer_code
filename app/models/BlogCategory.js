const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogCategorySchema = new Schema({
  name: String,
  categories: {
    type: Array,
    default: [
      'Business',
      'Science',
      'Technology',
      'Creative',
      'Humanities',
      'Videos',
      'Writers',
      'Books',
      'Podcasts'
    ]
  }
});

module.exports = mongoose.model('blogCategories', blogCategorySchema);
