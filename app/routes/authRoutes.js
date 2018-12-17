const passport = require('passport');
const mongoose = require('mongoose');
/* const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose'); */
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const middleware = require('../middlewares');

const keys = require('../config/keys');

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
        /* passport.authenticate('local')(req, res, () => {
          return res.json(req.user);
        }); */
        async.waterfall(
          [
            function(done) {
              crypto.randomBytes(20, function(err, buf) {
                if (err) {
                  console.log(err);
                }
                var token = buf.toString('hex');

                // console.log(token);
                done(err, token);
              });
            },
            function(token, done) {
              User.findOne({ email: req.body.email }, function(err, user) {
                if (err) {
                  // console.log('no user');
                  res.send('err.name');
                  console.log(err);
                  return;
                }

                // console.log(user);

                user.verifyEmailToken = token;
                // user.verifyEmailExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                  done(err, token, user);
                });
              });
            },
            function(token, user, done) {
              var smtpTransport = nodemailer.createTransport(
                /* 'SMTP', */ {
                  service: 'SendGrid',
                  auth: {
                    user: 'apikey',
                    pass: keys.sendgridKey
                  }
                }
              );
              var mailOptions = {
                to: user.email,
                from: 'noreply@selfpacer.com',
                subject: 'Verify Email',
                text:
                  'You are receiving this because you signed up for an account on selfacer with this e-mail address.\n\n' +
                  'Please click on the following link, or paste this into your browser to verify and complete the sign up process:\n\n' +
                  'https://' +
                  req.headers.host +
                  '/email_verify/' +
                  token +
                  '\n\n' +
                  'If you did not request this, please ignore this email.\n'
              };
              smtpTransport.sendMail(mailOptions, function(err) {
                res.send(
                  'An e-mail has been sent to ' +
                    user.email +
                    '. Please check your inbox and verify to complete your sign up.'
                );
                done(err, 'done');
              });
            }
          ],
          function(err) {
            if (err) return next(err);
            res.send(err);
          }
        );
      }
    );
  });

  app.post('/api/reverify_email', (req, res) => {
    async.waterfall(
      [
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            if (err) {
              console.log(err);
            }
            var token = buf.toString('hex');

            // console.log(token);
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              // console.log('no user');
              res.send('No account with that email address exists.');
              return;
            }

            user.verifyEmailToken = token;

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport(
            /* 'SMTP', */ {
              service: 'SendGrid',
              auth: {
                user: 'apikey',
                pass: keys.sendgridKey
              }
            }
          );
          var mailOptions = {
            to: user.email,
            from: 'noreply@selfpacer.com',
            subject: 'Verify Email',
            text:
              'You are receiving this because you signed up for an account on selfacer with this e-mail address.\n\n' +
              'Please click on the following link, or paste this into your browser to verify and complete the sign up process:\n\n' +
              'https://' +
              req.headers.host +
              '/email_verify/' +
              token +
              '\n\n' +
              'If you did not request this, please ignore this email.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            res.send(
              'An e-mail has been sent to ' +
                user.email +
                '. Please check your inbox and verify to complete your sign up.'
            );
            done(err, 'done');
          });
        }
      ],
      function(err) {
        if (err) return next(err);
        res.send(err);
      }
    );
  });

  app.get('/api/email_verified/:token', (req, res) => {
    // console.log(req.params.token);
    User.findOne({
      verifyEmailToken: req.params.token
    }).then(user => {
      if (!user) {
        res.send('Email verify token is invalid or has expired.');
        return;
      }

      user.verifyEmailToken = undefined;

      user.active = true;

      user.save(err => {
        if (err) {
          res.send(err.name);
          // console.log(err);
        } else {
          // console.log(user);
          res.send(user);
        }
      });
    });
  });

  app.post('/api/add_admin_user', (req, res) => {
    //console.log(req.body);

    // let id = req.body.userId;

    User.findOneAndUpdate(
      { _id: req.body.userId },
      { accountType: req.body.newAccountType },
      function(err, updatedUser) {
        if (err) {
          // console.log(err.name);
          res.send(err.name);
        } else {
          res.send({ updatedUser: updatedUser });
        }
      }
    );
  });

  app.post('/api/remove_admin_user', (req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.userId },
      { isAdmin: false },
      function(err, updatedUser) {
        if (err) {
          // console.log(err.name);
          res.send(err.name);
        } else {
          res.send({ updatedUser: updatedUser });
        }
      }
    );
  });

  app.post('/api/login', middleware.isInactive, (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.json(errors);
    }

    passport.authenticate('local')(req, res, err => {
      if (err) {
        // console.log(err.name, err.message);
        res.send(err);
      }
      res.send(req.user);
    });
  });

  app.post('/api/forgot_password', function(req, res, next) {
    // console.log(req.body.email);

    async.waterfall(
      [
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            if (err) {
              console.log(err);
            }
            var token = buf.toString('hex');

            // console.log(token);
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              // console.log('no user');
              res.send('No account with that email address exists.');
              return;
            }
            // console.log(user);
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport(
            /* 'SMTP', */ {
              service: 'SendGrid',
              auth: {
                user: 'apikey',
                pass: keys.sendgridKey
              }
            }
          );
          var mailOptions = {
            to: user.email,
            from: 'noreply@selfpacer.com',
            subject: 'Password Reset',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'https://' +
              req.headers.host +
              '/reset/' +
              token +
              '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            res.send(
              'An e-mail has been sent to ' +
                user.email +
                ' with further instructions.'
            );
            done(err, 'done');
          });
        }
      ],
      function(err) {
        if (err) return next(err);
        res.send(err);
      }
    );
  });

  app.get('/api/reset_password/:token', (req, res) => {
    User.findOne(
      {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
      },
      (err, user) => {
        if (!user) {
          res.send('Password reset token is invalid or has expired.');
        } else {
          res.send({ user: user });
        }

        if (err) {
          res.send(err.name);
        }
      }
    );
  });

  app.post('/api/reset_password/:token', (req, res) => {
    User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    }).then(user => {
      // console.log(user);
      user.setPassword(req.body.newPassword, (err, user) => {
        if (err) {
          res.send(err.name);
          console.log(err);
        } else {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(err => {
            if (err) {
              res.send(err.name);
              console.log(err);
            } else {
              res.send({ user: user });
              // console.log(user);
            }
          });
        }
      });
    });
  });
};

/*
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
*/
