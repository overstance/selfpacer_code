/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Resource = require('../models/Resource');

function appendIsAdmin() {
  Resource.find(
    {
      user_id: {
        $in: [
          '5c16e8de76e09e200c039178',
          '5c16efcef6d0f300144d3cda',
          '5c1704963ed7cd0014b0bff5'
        ]
      }
    },
    { new: true },
    (err, resources) => {
      if (err) {
        // console.log(err.message);
      } else {
        // console.log(resources);
        resources.forEach(function(resource) {
          Resource.findOneAndUpdate(
            {
              _id: resource._id
            },
            {
              isAdmin: true
            },
            function(err, resource) {
              if (err) {
                // console.log(err);
              } else {
                resource.save();
                // console.log(resource);
              }
            }
          );
        });
      }
    }
  );
}

module.exports = appendIsAdmin;
