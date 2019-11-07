const mongoose = require('mongoose');
const middleware = require('../middlewares');

const User = mongoose.model('users');
const Resource = require('../models/Resource');
const Collection = require('../models/Collection');

module.exports = app => {
  app.post('/api/edit_profile', middleware.isLoggedIn, (req, res) => {
    // console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        name: req.body.name,
        specialization: req.body.specialization1
      },
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err.name);
          // console.log(err.name);
        } else {
          // console.log(user);
          res.send({ user });
        }
      }
    );
  });

  app.post('/api/change_password', middleware.isLoggedIn, (req, res) => {
    User.findById(req.body.userId).then(user => {
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

  app.put('/api/become_facilitator', (req, res) => {
    User.findByIdAndUpdate(
      req.body.userId,
      {
        workUrl1: req.body.workUrl1,
        workUrl2: req.body.secondUrl,
        isFacilitateApplicant: true,
        dateOfFacilitateApplication: Date.now()
      },
      { new: true },
      (err, user) => {
        if (err) {
          res.send({ error: err.name });
        } else {
          // console.log(user);
          res.send({ user: user });
        }
      }
    );
  });

  app.delete('/api/delete_own_account', (req, res) => {
    User.findByIdAndRemove(req.query.userId, (err, user) => {
      if (err) {
        res.send({ error: err.message });
      } else if (user) {
        res.send({ successInfo: 'user own account successfully deleted' });
        Resource.deleteMany(
          { user_id: req.query.userId, isAdmin: false },
          (err, resources) => {
            if (resources) {
              console.log(resources);
            }
          }
        );

        Collection.deleteMany(
          { user_id: req.query.userId },
          (err, collections) => {
            if (collections) {
              console.log(collections);
            }
          }
        );
      }
    });
  });
};
