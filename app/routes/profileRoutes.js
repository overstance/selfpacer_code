const mongoose = require('mongoose');
const middleware = require('../middlewares');

const User = mongoose.model('users');

module.exports = app => {
  app.post('/api/edit_profile', middleware.isLoggedIn, (req, res) => {
    // console.log(req.body);
    User.findOneAndUpdate(
      { id: req.body.user._Id },
      {
        name: req.body.name,
        specialization: req.body.specialization1,
        specialization_alt: req.body.specialization2
      },
      (err, user) => {
        if (err) {
          res.send(err.name);
          //   console.log(err.name);
        } else {
          //   console.log(user);
          res.send({ user });
        }
      }
    );
  });

  app.post('/api/change_password', middleware.isLoggedIn, (req, res) => {
    User.findById(req.body.user._id).then(user => {
      if (user) {
        user.changePassword(
          req.body.oldPassword,
          req.body.newPassword,
          (err, user) => {
            if (err) {
              res.send(err.name);
            } else {
              res.send('password changed');
            }
          }
        );
      }
    });
  });
};
