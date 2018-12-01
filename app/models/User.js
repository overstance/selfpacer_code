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
  accountType: {
    type: String,
    default: 'User'
  },
  specialization: String,
  date: {
    type: Date,
    default: Date.now()
  },
  likeCount: {
    type: Number,
    default: 0
  },
  recentlyViewed: Array,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(passportLocalMongoose);

mongoose.model('users', userSchema);
