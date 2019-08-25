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
  workUrl1: String,
  workUrl2: String,
  dateOfFacilitateApplication: Date,
  isFacilitateApplicant: {
    type: Boolean,
    default: false
  },
  isAuthor: {
    type: Boolean,
    default: false
  },
  isDesigner: {
    type: Boolean,
    default: false
  },
  isResearcher: {
    type: Boolean,
    default: false
  },
  isAssetManager: {
    type: Boolean,
    default: false
  },
  isUserManager: {
    type: Boolean,
    default: false
  },
  isCounselor: {
    type: Boolean,
    default: false
  },
  isCourseProvider: {
    type: Boolean,
    default: false
  },
  twitterUrl: String,
  facebookUrl: String,
  linkedinUrl: String,
  isEditor: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verifyEmailToken: String,
  accountDeactivated: Boolean,
  deactivationDate: Date,
  reactivationDate: Date
});

userSchema.plugin(passportLocalMongoose);

mongoose.model('users', userSchema);
