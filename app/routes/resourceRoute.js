const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/unconfirmed_resources', (req, res) => {
    Resource.find({ confirmed: false }, function(err, resources) {
      if (err) {
        console.log(err.message);
        res.send(err.message);
      } else {
        res.send({ resources: resources });
      }
    });
  });

  app.get('/api/resources/:subject_title', (req, res) => {
    Resource.find(
      { confirmed: true, category: req.params.subject_title },
      function(err, resources) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send({ all: resources });
        }
      }
    );
  });

  app.get('/api/resources/:subject_title/:platform', (req, res) => {
    if (req.params.platform === 'youtube') {
      Resource.find(
        {
          confirmed: true,
          category: req.params.subject_title,
          source: 'youtube.com'
        },
        function(err, resources) {
          if (err) {
            console.log(err);
            res.send(err.message);
          } else {
            res.send({ all: resources });
          }
        }
      );
    } else {
      Resource.find(
        {
          confirmed: true,
          category: req.params.subject_title,
          type: req.params.platform
        },
        function(err, resources) {
          if (err) {
            console.log(err);
            res.send(err.message);
          } else {
            res.send({ all: resources });
          }
        }
      );
    }
  });

  app.get('/api/user_assets/:userId', (req, res) => {
    let userId = req.params.userId;

    if (
      userId === '5c16e8de76e09e200c039178' ||
      userId === '5c16efcef6d0f300144d3cda'
    ) {
      Resource.find(
        {
          user_id: {
            $in: ['5c16e8de76e09e200c039178', '5c16efcef6d0f300144d3cda']
          }
        },
        (err, resources) => {
          if (err) {
            res.send(err.name);
          } else {
            res.send({ resources: resources });
          }
        }
      );
    } else {
      Resource.find({ user_id: req.params.userId }, (err, resources) => {
        if (err) {
          res.send(err.name);
        } else {
          res.send({ resources: resources });
        }
      });
    }
  });

  app.get('/api/admin_assets/:platform', (req, res) => {
    if (req.params.platform === 'youtube') {
      Resource.find(
        {
          user_id: {
            $in: ['5c16e8de76e09e200c039178', '5c16efcef6d0f300144d3cda']
          },
          source: 'youtube.com'
        },
        function(err, resources) {
          if (err) {
            console.log(err);
            res.send(err.message);
          } else {
            res.send({ resources: resources });
          }
        }
      );
    } else {
      Resource.find(
        {
          user_id: {
            $in: ['5c16e8de76e09e200c039178', '5c16efcef6d0f300144d3cda']
          },
          type: req.params.platform
        },
        function(err, resources) {
          if (err) {
            console.log(err);
            res.send(err.message);
          } else {
            res.send({ resources: resources });
          }
        }
      );
    }
  });

  app.get('/api/recently_viewed/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        res.send(err.message);
        console.log(err.message);
        return;
      } else {
        const recentlyViewed = user.recentlyViewed;

        Resource.find({ _id: { $in: recentlyViewed } }, (err, resources) => {
          if (err) {
            res.send(err.message);
            console.log(err.message);
            return;
          } else {
            res.send({ resources: resources });
            // console.log(resources);
          }
        });
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

  app.post('/api/increase_collect_count/:resourceToAdd', (req, res) => {
    Resource.findOne({ _id: req.params.resourceToAdd }, (err, resource) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        const newCount = resource.collectCount + 1;

        Resource.findOneAndUpdate(
          { _id: req.params.resourceToAdd },
          { collectCount: newCount },
          (err, resource) => {
            if (resource) {
              res.send('collectCount increased');
            }
          }
        );
      }
    });
  });

  app.put('/api/confirm_resource', (req, res) => {
    Resource.findByIdAndUpdate(
      req.body.resourceId,
      { confirmed: true },
      (err, resource) => {
        if (err) {
          res.send(err.message);
          console.log(err.message);
        } else if (resource) {
          Resource.find({ confirmed: false }, (err, resources) => {
            if (err) {
              res.send(err.message);
              console.log(err.message);
            } else if (resources) {
              res.send({ resources: resources });
            }
          });
        }
      }
    );
  });

  app.delete('/api/delete_resource/:resourceId', (req, res) => {
    Resource.findByIdAndDelete(req.params.resourceId, (err, resource) => {
      if (err) {
        res.send(err.message);
        console.log(err.message);
      } else if (resource) {
        Resource.find({ confirmed: false }, (err, resources) => {
          if (err) {
            res.send(err.message);
            console.log(err.message);
          } else if (resources) {
            res.send({ resources: resources });
          }
        });
      }
    });
  });

  app.delete('/api/delete_asset/:resourceId/:userId', (req, res) => {
    Resource.findByIdAndDelete(req.params.resourceId, (err, resource) => {
      if (err) {
        res.send(err.message);
        console.log(err.message);
      } else if (resource) {
        Resource.find({ user_id: req.params.userId }, (err, resources) => {
          if (err) {
            res.send(err.name);
          } else {
            res.send({ resources: resources });
          }
        });
      }
    });
  });
};
