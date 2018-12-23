const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/all_accounting', (req, res) => {
    Resource.find({ category: 'Accounting' }, function(err, resources) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ allAccounting: resources });
      }
    });
  });

  app.get('/api/all_animation', (req, res) => {
    Resource.find({ category: 'Animation' }, function(err, resources) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ allAccounting: resources });
      }
    });
  });

  app.get('/api/user_assets/:userId', (req, res) => {
    Resource.find({ user_id: req.params.userId }, (err, resources) => {
      if (err) {
        res.send(err.name);
      } else {
        res.send({ resources: resources });
      }
    });
  });

  app.post('/api/resource_liked', (req, res) => {
    //console.log(req.body);

    let id = req.body.resourceId;
    let likes = req.body.resourceLikes;

    Resource.findOneAndUpdate({ _id: id }, { likes: likes }, function(
      err,
      updatedResource
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ resource: updatedResource });
      }
    });
  });

  app.post('/api/user_liked_resources/:userId', (req, res) => {
    // console.log(req.body);
    // console.log(req.params.userId);

    // let query = { _id: req.body.userId };

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { recentlyViewed: req.body },
      function(err, user) {
        if (err) {
          console.log(err);
          res.send(err.name);
        } else {
          res.send('userRecentlyViewedUpdated');
        }
      }
    );
  });

  app.post('/api/increase_resourceviews', (req, res) => {
    Resource.findOneAndUpdate(
      { _id: req.body.resourceId },
      { views: req.body.resourceViews },
      (err, resource) => {
        if (err) {
          console.log(err);
        } else {
          res.send(resource);
        }
      }
    );
  });

  app.post('/api/update_user_liked_count/:userId', (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { likeCount: req.body.newLikeCount },
      function(err, user) {
        if (err) {
          console.log(err);
          res.send(err.name);
        } else {
          res.send('userLikeCountUpdated');
        }
      }
    );
  });
};
