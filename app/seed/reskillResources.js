/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Resource = require('../models/Resource');

function reskillResources() {
  Resource.find({ category: 'Travel' }, (err, resources) => {
    if (err) {
      // console.log(err.message);
    } else {
      // console.log(resources);
      resources.forEach(function(resource) {
        Resource.findOneAndUpdate(
          {
            category: resource.category
          },
          {
            category: 'Tourism'
          },
          function(err, resource) {
            if (err) {
              // console.log(err);
            } else {
              resource.save();
              Resource.find({ category: 'Data Science' }, (err, resources) => {
                if (err) {
                  // console.log(err.message);
                } else {
                  // console.log(resources);
                  resources.forEach(function(resource) {
                    Resource.findOneAndUpdate(
                      {
                        category: resource.category
                      },
                      {
                        category: 'Data Analysis'
                      },
                      function(err, resource) {
                        if (err) {
                          // console.log(err);
                        } else {
                          resource.save();
                        }
                      }
                    );
                  });
                }
              });
            }
          }
        );
      });
    }
  });
}

module.exports = reskillResources;
