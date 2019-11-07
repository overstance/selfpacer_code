const mongoose = require('mongoose');

const Collection = require('../models/Collection');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/user_collections', (req, res) => {
    Collection.find({ user_id: req.query.userId })
      .sort({ lastUpdated: -1 })
      .exec((err, collections) => {
        if (err) {
          console.log(err);
          res.send(err.name);
        } else {
          res.send({ collections: collections });
          // console.log(collections);
        }
      });
  });

  app.get('/api/shared_collections', (req, res) => {
    Collection.find({ public: true, description: req.query.userSpec })
      .sort({ lastUpdated: -1 })
      .exec(function(err, collections) {
        if (err) {
          // console.log(err);
          res.send(err.name);
        } else {
          res.send({ collections: collections });
          // console.log(collections);
        }
      });
  });

  app.get('/api/featured_collections', (req, res) => {
    Collection.find({
      public: true,
      featured: true,
      description: req.query.userSpec
    })
      .sort({ lastUpdated: -1 })
      .exec(function(err, collections) {
        if (err) {
          console.log(err);
          res.send(err.name);
        } else {
          res.send({ collections: collections });
          // console.log(collections);
        }
      });
  });

  app.get('/api/fetch_collection', (req, res) => {
    Collection.findById(req.query.id, (err, collection) => {
      if (err) {
        res.send(err.message);
        // console.log(err.message);
        return;
      } else {
        const resources = collection.resources;

        Resource.find({ _id: { $in: resources } }, (err, resources) => {
          if (err) {
            res.send({ error: err.message });
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

  app.get('/api/fetch_collection_attributes', (req, res) => {
    Collection.findById(req.query.id, (err, collection) => {
      if (collection) {
        res.send({ collection: collection });
        // console.log(collection);
      } else if (err) {
        // console.log(err);
      }
    });
  });

  app.get('/api/fetch_user_pinned_collections', (req, res) => {
    User.findById(req.query.userId, (err, user) => {
      if (err) {
        res.send(err.message);
        // console.log(err.message);
        return;
      } else {
        const pinnedCollections = user.pinnedCollections;
        Collection.find(
          { _id: { $in: pinnedCollections } },
          (err, collections) => {
            if (err) {
              res.send(err.message);
              // console.log(err.message);
              return;
            } else {
              res.send({ collections: collections });
              // console.log(resources);
            }
          }
        );
      }
    });
  });

  app.post('/api/create_collection', (req, res) => {
    let collection = {};

    if (req.body.resourceId === '') {
      collection = {
        title: req.body.title,
        user_id: req.body.userId,
        curator: req.body.username,
        lastUpdated: Date.now()
      };
    } else {
      collection = {
        title: req.body.title,
        resources: [req.body.resourceId],
        user_id: req.body.userId,
        curator: req.body.username,
        lastUpdated: Date.now()
      };
    }

    Collection.create(collection, function(err, resource) {
      if (err) {
        console.log(err);
        res.send(err.name);
      } else {
        resource.save();
        res.send('Collection created!');
      }
    });
  });

  app.post('/api/add_resource_to_collection', (req, res) => {
    const query = { _id: req.body.collectionId };

    Collection.findOneAndUpdate(
      query,
      {
        resources: req.body.updatedCollectionResources
      },
      function(err, collection) {
        if (err) {
          console.log(err);
          res.send(err.name);
        } else {
          res.send('Resource Collected!');
        }
      }
    );
  });

  app.put('/api/delete_collection_item', (req, res) => {
    Collection.findByIdAndUpdate(
      { _id: req.body.collectionId },
      { resources: req.body.updatedResourceIds },
      (err, collection) => {
        if (err) {
          res.send(err.message);
          console.log(err.message);
        } else {
          res.send({ collection: collection });
        }
      }
    );
  });

  app.post('/api/edit_collection', (req, res) => {
    // console.log(req.body);
    Collection.findByIdAndUpdate(
      req.body.id,
      { title: req.body.title, description: req.body.description },
      { new: true },
      (err, collection) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send({ collection: collection });
          // console.log(collection);
        }
      }
    );
  });

  app.post('/api/publish_collection', (req, res) => {
    Collection.findByIdAndUpdate(
      req.body.id,
      { public: true, description: req.body.description },
      { new: true },
      (err, collection) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send({ collection: collection });
        }
      }
    );
  });

  app.post('/api/unpublish_collection', (req, res) => {
    Collection.findByIdAndUpdate(
      req.body.id,
      { public: false, description: '' },
      { new: true },
      (err, collection) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send({ collection: collection });
        }
      }
    );
  });

  app.post('/api/pin_collection', (req, res) => {
    User.findByIdAndUpdate(
      req.body.userId,
      { pinnedCollections: req.body.userPinnedCollections },
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send(user);
        }
      }
    );
  });

  app.post('/api/unpin_collection', (req, res) => {
    User.findByIdAndUpdate(
      req.body.userId,
      { pinnedCollections: req.body.userPinnedCollections },
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send(user);
        }
      }
    );
  });

  app.put('/api/feature_collection', (req, res) => {
    // console.log('featured route reached');
    Collection.findByIdAndUpdate(
      req.body.collectionId,
      { featured: true },
      { new: true },
      (err, collection) => {
        if (collection) {
          // console.log(collection);
          res.send({ collection: collection });
        }
      }
    );
  });

  app.put('/api/unfeature_collection', (req, res) => {
    // console.log('featured route reached');
    Collection.findByIdAndUpdate(
      req.body.collectionId,
      { featured: false },
      { new: true },
      (err, collection) => {
        if (collection) {
          // console.log(collection);
          res.send({ collection: collection });
        }
      }
    );
  });

  app.delete('/api/delete_collection', (req, res) => {
    Collection.findByIdAndRemove(
      req.query.id,
      { public: false },
      (err, collection) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send({ collection: collection });
        }
      }
    );
  });

  app.post('/api/change_update_time', (req, res) => {
    Collection.findOneAndUpdate(
      { _id: req.body.collectionId },
      { lastUpdated: Date.now() },
      (err, resource) => {
        if (resource) {
          res.send(resource);
        } else if (err) {
          res.send(err);
        }
      }
    );
  });

  app.put('/api/update_collection_resources', (req, res) => {
    Collection.findByIdAndUpdate(
      req.body.collectionId,
      { resources: req.body.resourceIds },
      (err, collection) => {
        if (err) {
          res.send({ error: err.message });
        } else if (collection) {
          res.send({ message: 'update succesful' });
        }
      }
    );
  });
};
