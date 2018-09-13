const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

const User = mongoose.model('users');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/register', (req, res) => {
    res.render('register');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/login', (req, res) => {
    res.render('login');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/register', (req, res) => {
    User.register(
      new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
          res.redirect('/api/current_user');
        });
      }
    );
  });

  app.post(
    '/api/login',
    passport.authenticate('local', {
      successRedirect: '/api/current_user',
      failureRedirect: '/api/login'
    }),
    (req, res) => {}
  );
};
