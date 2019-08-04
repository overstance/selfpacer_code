const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogTagSchema = new Schema({
  name: String,
  tags: {
    type: Array,
    default: [
      'Graphics',
      'Communications',
      'Design',
      'Art',
      'Music',
      'Enterpreneurship',
      'Management',
      'Marketing',
      'Software',
      'Hardware',
      'Programming',
      'Networks',
      'Database',
      'Social Science',
      'Health',
      'Medicine',
      'Africa',
      'Nigeria',
      'West Africa',
      'Asia',
      'America',
      'World',
      'Popular',
      'Middle East',
      'Australia',
      'Europe',
      'Schooling',
      'College',
      'University',
      'E-learning',
      'Start-up',
      'Ideas',
      'Engineering',
      'Finance',
      'Culture',
      'Social Media'
    ]
  }
});

module.exports = mongoose.model('blogTags', blogTagSchema);
