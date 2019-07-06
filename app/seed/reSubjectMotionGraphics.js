/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Resource = require('../models/Resource');

function reSubjectMotionGraphics() {
  Resource.find({ category: 'Motion Design/VFX' }, (err, resources) => {
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
            category: 'Motion Graphics'
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

module.exports = reSubjectMotionGraphics;
