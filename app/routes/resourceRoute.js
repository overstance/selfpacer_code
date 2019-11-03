const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/fetch_resource_by_id', (req, res) => {
    Resource.findById(req.query.id, (err, resource) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ resource: resource });
      }
    });
  });

  app.get('/api/unconfirmed_resources', (req, res) => {
    let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
    };
    Resource.find({
      confirmed: false
    })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .exec(function(err, resources) {
        if (err) {
          // console.log(err.message);
          res.send(err.message);
        } else {
          // console.log(resources);
          res.send({ resources: resources });
        }
      });
  });

  app.get('/api/resources', (req, res) => {
    let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
    };

    Resource.find({ confirmed: true, category: req.query.subject_title })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .sort({ lastEdited: -1 })
      .exec(function(err, resources) {
        if (err) {
          res.send(err.message);
          return;
        }
        res.send({ all: resources });
      });
  });

  app.get('/api/resources_by_platform', (req, res) => {
    // console.log('route reached');
    let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
    };
    if (req.query.platform === 'youtube') {
      Resource.find({
        confirmed: true,
        category: req.query.subject_title,
        source: 'youtube.com'
      })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .sort({ lastEdited: -1 })
        .exec(function(err, resources) {
          if (err) {
            res.send(err.message);
            return;
          }
          res.send({ all: resources });
        });
    } else {
      Resource.find({
        confirmed: true,
        category: req.query.subject_title,
        type: req.query.platform
      })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .sort({ lastEdited: -1 })
        .exec(function(err, resources) {
          if (err) {
            res.send(err.message);
            return;
          }
          res.send({ all: resources });
        });
    }
  });

  app.get('/api/user_asset_count', (req, res) => {
    // let userId = req.params.userId;
    let accountType = req.query.accountType;
    if (
      /* check if user is an administrator with the following user ids 
      userId === '5c16e8de76e09e200c039178' ||
      userId === '5c16efcef6d0f300144d3cda' ||
      userId === '5d227bbb58790b1c7006b0d3' */
      accountType === 'Administrator' ||
      accountType === 'Head Administrator' ||
      accountType === 'Senior Administrator'
    ) {
      Resource.find(
        {
          confirmed: true,
          isAdmin: true
          /* user_id: {
            $in: [
              '5c16e8de76e09e200c039178',
              '5c16efcef6d0f300144d3cda',
              '5d227bbb58790b1c7006b0d3'
            ]
          } */
        },
        (err, resources) => {
          if (err) {
            res.send({ error: err.name });
          } else {
            let assetCount = resources.length;
            res.send({ assetCount: assetCount });
          }
        }
      );
    } else {
      Resource.find(
        {
          confirmed: true,
          user_id: req.query.userId
        },
        (err, resources) => {
          if (err) {
            res.send({ error: err.name });
          } else {
            let assetCount = resources.length;
            // console.log(resources, assetCount);
            res.send({ assetCount: assetCount });
          }
        }
      );
    }
  });

  app.get('/api/fetch_user_assets', (req, res) => {
    let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
    };

    if (
      req.query.useTypeContext === '3.2' ||
      req.query.useTypeContext === '4' ||
      req.query.useTypeContext === '5'
    ) {
      Resource.find({
        confirmed: true,
        isAdmin: true
      })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .sort({ lastEdited: -1 })
        .exec(function(err, resources) {
          if (err) {
            res.send(err.name);
            return;
          }
          res.send({ resources: resources });
        });
    } else {
      Resource.find({
        confirmed: true,
        user_id: req.query.userId
      })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .sort({ lastEdited: -1 })
        .exec(function(err, resources) {
          if (err) {
            res.send(err.name);
            return;
          }
          res.send({ resources: resources });
        });
    }
  });

  app.get('/api/fetch_admin_assets_by_platform', (req, res) => {
    let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
    };
    if (req.query.platform === 'youtube') {
      Resource.find({
        confirmed: true,
        isAdmin: true,
        source: 'youtube.com'
      })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .sort({ lastEdited: -1 })
        .exec(function(err, resources) {
          if (err) {
            res.send(err.name);
            return;
          }
          res.send({ resources: resources });
        });
    } else {
      Resource.find({
        confirmed: true,
        isAdmin: true,
        type: req.query.platform
      })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .sort({ lastEdited: -1 })
        .exec(function(err, resources) {
          if (err) {
            res.send(err.name);
            return;
          }
          res.send({ resources: resources });
        });
    }
  });

  app.get('/api/recently_viewed', (req, res) => {
    User.findById(req.query.userId, (err, user) => {
      if (err) {
        res.send(err.message);
        // console.log(err.message);
        return;
      } else {
        const recentlyViewed = user.recentlyViewed;

        Resource.find({ _id: { $in: recentlyViewed } }, (err, resources) => {
          if (err) {
            res.send(err.message);
            // console.log(err.message);
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
        // console.log(err);
      } else {
        res.send({ resource: updatedResource });
      }
    });
  });

  app.put('/api/update_user_viewed_resources', (req, res) => {
    // console.log(req.body);
    // console.log(req.params.userId);

    // let query = { _id: req.body.userId };

    User.findOneAndUpdate(
      { _id: req.body.userId },
      { recentlyViewed: req.body.updatedRecentlyViewedResources },
      function(err, user) {
        if (user) {
          res.send('userRecentlyViewedUpdated');
        }
      }
    );
  });

  app.put('/api/increase_resourceviews', (req, res) => {
    Resource.findOneAndUpdate(
      { _id: req.body.resourceId },
      { views: req.body.resourceViews },
      (err, resource) => {
        if (err) {
          // console.log(err);
        } else {
          res.send(resource);
        }
      }
    );
  });

  app.put('/api/update_user_like_count', (req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.userId },
      { likeCount: req.body.newLikeCount },
      function(err, user) {
        if (user) {
          res.send('userLikeCountUpdated');
        }
      }
    );
  });

  app.post('/api/increase_collect_count', (req, res) => {
    Resource.findOne({ _id: req.body.resourceToAdd }, (err, resource) => {
      if (err) {
        // console.log(err);
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
          res.send({ error: err.name });
          // console.log(err.message);
        } else if (resource) {
          res.send({ resource: resource });
        }
      }
    );
  });

  app.delete('/api/delete_unconfirmed_resource', (req, res) => {
    Resource.findByIdAndDelete(req.query.resourceId, (err, resource) => {
      if (err) {
        res.send({ error: err.name });
        // console.log(err.message);
      } else if (resource) {
        res.send({ resource: resource });
      }
    });
  });

  app.delete('/api/delete_asset', (req, res) => {
    Resource.findByIdAndDelete(req.query.resourceId, (err, resource) => {
      if (err) {
        res.send({ error: err.message });
        // console.log(err.message);
      } else if (resource) {
        res.send({ resource: resource });
      }
    });
  });

  app.get('/api/fetch_recently_viewed_resources', (req, res) => {
    Resource.find(
      {
        _id: { $in: req.query.ids }
      },
      (err, resources) => {
        if (err) {
          res.send({ error: err.message });
        }

        if (resources) {
          res.send({ resources: resources });
        }
      }
    );
  });
};
