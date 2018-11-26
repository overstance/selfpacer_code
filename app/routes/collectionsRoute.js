const mongoose = require('mongoose');

const Collection = require('../models/Collection');

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

  app.post('/api/create_collection', (req, res) => {
    const collection = {
      title: req.body.title,
      resources: [req.body.resource],
      user_id: req.body.userId,
      resourceCount: 1
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
};
