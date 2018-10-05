const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  name: String,
  username: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

userSchema.plugin(passportLocalMongoose);

mongoose.model('users', userSchema);
