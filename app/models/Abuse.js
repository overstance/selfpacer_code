const mongoose = require('mongoose');
const { Schema } = mongoose;

const abuse = new Schema({
  report: String,
  reporterId: String,
  reporter: String,
  reportDate: {
    type: Date
  }
});

module.exports = mongoose.model('abuses', abuse);
