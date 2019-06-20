const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  name: String,
  username: String,
  email: String,
  from_google_email: String,
  from_facebook_email: String,
  password: String,
  accountType: {
    type: String,
    default: 'User'
  },
  specialization: {
    type: String,
    default: 'N/A'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  likeCount: {
    type: Number,
    default: 0
  },
  pinnedCollections: {
    type: Array,
    default: []
  },
  recentlyViewed: {
    type: Array,
    default: []
  },
  active: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verifyEmailToken: String
});

userSchema.plugin(passportLocalMongoose);

mongoose.model('users', userSchema);
