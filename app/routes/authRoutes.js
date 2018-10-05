const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = mongoose.model('users');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/home');
    }
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/home');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  /*app.get('/api/login', (req, res) => {
    res.render('login');
  });*/

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.json(errors);
    }

    User.register(
      new User({
        name: req.body.name,
        username: req.body.email,
        email: req.body.email
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        passport.authenticate('local')(req, res, () => {
          return res.json(req.user);
        });
      }
    );
  });

  /*app.post(
    '/api/login',
    passport.authenticate('local', {
      //successRedirect: '/api/current_user',
      //failureRedirect: '/api/login'
      successRedirect: '/home',
      failureRedirect: '/login'
    }),
    (res, req) => {
      res.send(requestAnimationFrame.user);
    }
  );
  User.register(
      new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        passport.authenticate('local')(req, res, () => {
          return res.json(req.user);
        });
      }
    );
  */

  app.post('/api/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.json(errors);
    }

    passport.authenticate('local')(req, res, err => {
      if (err) {
        res.send(err);
      }
      res.send(req.user);
    });
  });
};
