const mongoose = require('mongoose');

const Collection = require('../models/Collection');
const Resource = require('../models/Resource');

module.exports = app => {
  app.get('/api/collections/:userId', (req, res) => {
    Collection.find({ user_id: req.params.userId }, function(err, collections) {
      if (err) {
        console.log(err);
        res.send(err.name);
      } else {
        res.send({ collections: collections });
      }
    });
  });

  app.get('/api/fetch_collection/:id', (req, res) => {
    Collection.findById(req.params.id, (err, collection) => {
      if (err) {
        res.send(err.message);
        console.log(err.message);
        return;
      } else {
        const resources = collection.resources;

        Resource.find({ _id: { $in: resources } }, (err, resources) => {
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

  app.post('/api/create_collection', (req, res) => {
    const collection = {
      title: req.body.title,
      resources: [req.body.resourceId],
      user_id: req.body.userId
    };

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

  app.post('/api/delete_collection_item', (req, res) => {
    Collection.findById(req.body.collectionId, (err, collection) => {
      if (err) {
        res.send(err.message);
        console.log(err.message);
      } else {
        const oldResourceArray = collection.resources;

        const newResourceArray = oldResourceArray.filter(
          resource => resource !== req.body.resourceId
        );

        // console.log(oldResourceArray);
        // console.log(newResourceArray);

        Collection.findByIdAndUpdate(
          req.body.collectionId,
          { resources: newResourceArray },
          (err, collection) => {
            if (err) {
              res.send(err.message);
              console.log(err.message);
            } else {
              // console.log(collection);
              res.send({ collection: collection });
            }
          }
        );
      }
    });
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
      { public: true },
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
      { public: false },
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

  app.post('/api/delete_collection', (req, res) => {
    Collection.findByIdAndRemove(
      req.body.id,
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
};
