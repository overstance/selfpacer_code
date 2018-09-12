const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,
  Date: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('users', userSchema);
