const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/unconfirmed_resources/:pageIndex', (req, res) => {
    let pageOptions = {
      page: req.params.pageIndex || 0,
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

  app.get('/api/resources/:subject_title/:pageIndex', (req, res) => {
    let pageOptions = {
      page: req.params.pageIndex || 0,
      limit: 10
    };

    /* Resource.find(
      { confirmed: true, category: req.params.subject_title },
      function(err, resources) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send({ all: resources });
        }
      }
    ); */

    Resource.find({ confirmed: true, category: req.params.subject_title })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .exec(function(err, resources) {
        if (err) {
          res.send(err.message);
          return;
        }
        res.send({ all: resources });
      });
  });

  app.get('/api/resources/:subject_title/:platform/:pageIndex', (req, res) => {
    // console.log('route reached');
    let pageOptions = {
      page: req.params.pageIndex || 0,
      limit: 10
    };
    if (req.params.platform === 'youtube') {
      Resource.find({
        confirmed: true,
        category: req.params.subject_title,
        source: 'youtube.com'
      })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
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
        category: req.params.subject_title,
        type: req.params.platform
      })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function(err, resources) {
          if (err) {
            res.send(err.message);
            return;
          }
          res.send({ all: resources });
        });
    }
  });

  app.get('/api/user_asset_count/:userId/:accountType', (req, res) => {
    // let userId = req.params.userId;
    let accountType = req.params.accountType;
    if (
      /* check if user is an administrator with the following user ids 
      userId === '5c16e8de76e09e200c039178' ||
      userId === '5c16efcef6d0f300144d3cda' ||
      userId === '5d227bbb58790b1c7006b0d3' */
      accountType === 'Administrator' ||
      accountType === 'ChiefAdmin'
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
          user_id: req.params.userId
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

  app.get('/api/user_assets/:userId/:useTypeContext/:pageIndex', (req, res) => {
    // let userId = req.params.userId;
    let pageOptions = {
      page: req.params.pageIndex || 0,
      limit: 10
    };

    if (
      /*check if user is ad administrator 
      userId === '5c16e8de76e09e200c039178' ||
      userId === '5c16efcef6d0f300144d3cda' ||
      userId === '5d227bbb58790b1c7006b0d3'*/
      req.params.useTypeContext === '2' ||
      req.params.useTypeContext === '3'
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
        } /* ,
        (err, resources) => {
          if (err) {
            res.send(err.name);
          } else {
            res.send({ resources: resources });
          }
        } */
      )
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function(err, resources) {
          if (err) {
            res.send(err.name);
            return;
          }
          res.send({ resources: resources });
        });
    } else {
      Resource.find(
        {
          confirmed: true,
          user_id: req.params.userId
        } /* , (err, resources) => {
        if (err) {
          res.send(err.name);
        } else {
          res.send({ resources: resources });
        }
      } */
      )
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function(err, resources) {
          if (err) {
            res.send(err.name);
            return;
          }
          res.send({ resources: resources });
        });
    }
  });

  app.get('/api/admin_assets/:platform/:pageIndex', (req, res) => {
    // console.log(req.params.pageIndex, req.params.platform);
    let pageOptions = {
      page: req.params.pageIndex || 0,
      limit: 10
    };
    if (req.params.platform === 'youtube') {
      Resource.find(
        {
          confirmed: true,
          /* user_id: {
              $in: ['5c16e8de76e09e200c039178', '5c16efcef6d0f300144d3cda']
            } */
          isAdmin: true,
          source: 'youtube.com'
        } /* ,
        function(err, resources) {
          if (err) {
            console.log(err);
            res.send(err.message);
          } else {
            res.send({ resources: resources });
          }
        } */
      )
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function(err, resources) {
          if (err) {
            res.send(err.name);
            return;
          }
          res.send({ resources: resources });
        });
    } else {
      Resource.find(
        {
          confirmed: true,
          /* user_id: {
            $in: ['5c16e8de76e09e200c039178', '5c16efcef6d0f300144d3cda']
          }, */
          isAdmin: true,
          type: req.params.platform
        } /* ,
        function(err, resources) {
          if (err) {
            console.log(err);
            res.send(err.message);
          } else {
            res.send({ resources: resources });
          }
        } */
      )
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function(err, resources) {
          if (err) {
            res.send(err.name);
            // console.log(err.message);
            return;
          }
          res.send({ resources: resources });
        });
    }
  });

  app.get('/api/recently_viewed/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
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

  app.post('/api/user_liked_resources/:userId', (req, res) => {
    // console.log(req.body);
    // console.log(req.params.userId);

    // let query = { _id: req.body.userId };

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { recentlyViewed: req.body },
      function(err, user) {
        if (err) {
          // console.log(err);
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
          // console.log(err);
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
          // console.log(err);
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

  app.delete('/api/delete_unconfirmed_resource/:resourceId', (req, res) => {
    Resource.findByIdAndDelete(req.params.resourceId, (err, resource) => {
      if (err) {
        res.send({ error: err.name });
        // console.log(err.message);
      } else if (resource) {
        res.send({ resource: resource });
      }
    });
  });

  app.delete('/api/delete_asset/:resourceId', (req, res) => {
    Resource.findByIdAndDelete(req.params.resourceId, (err, resource) => {
      if (err) {
        res.send({ error: err.message });
        // console.log(err.message);
      } else if (resource) {
        res.send({ resource: resource });
      }
    });
  });
};
