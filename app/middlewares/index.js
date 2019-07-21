// const Resource = require('../models/Resource');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// all the middleare goes here
let middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (!req.body.user._id) {
    console.log({ error: 'loginRequired' });
    return res.status(401).send({ error: 'loginRequired' });
  }

  next();
};

middlewareObj.isInactive = (req, res, next) => {
  User.findOne({ email: req.body.username, active: false }, (err, user) => {
    if (user) {
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
