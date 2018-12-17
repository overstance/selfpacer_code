const Resource = require('../models/Resource');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// all the middleare goes here
let middlewareObj = {};

/* middlewareObj.youtubeAccountingOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    YoutubeAcct.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        req.flash('error', 'Campground not found');
        res.redirect('back');
      } else {
        // does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
}; */

/* middlewareObj.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect('back');
      } else {
        // does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
}; */

middlewareObj.isLoggedIn = function(req, res, next) {
  if (!req.body.user._id) {
    console.log({ error: 'loginRequired' });
    return res.status(401).send({ error: 'loginRequired' });
  }

  next();
};

/* middlewareObj.isInactive = async (req, res, next) => {
  console.log(req.body.username);

  const activeUser = await User.findOne(
    { email: req.body.username, active: false },
    user => {
      return user;
    }
  );

  console.log(activeUser);

  if (activeUser) {
    // return res.status(401).send({ error: 'loginRequired' });
    res.send('Please verify your email');
  }

  next();
}; */

middlewareObj.isInactive = (req, res, next) => {
  // console.log(req.body.username);

  User.findOne({ email: req.body.username, active: false }, (err, user) => {
    if (user) {
      // console.log(user);
      return res.send({
        emailToVerify: user.email,
        info: 'Please verify your email'
      });
    } else {
      next();
    }
  });
};

module.exports = middlewareObj;
