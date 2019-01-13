const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.post('/api/add_mooc', (req, res) => {
    let confirmed = false;
    if (
      req.body.agent === '5c16e8de76e09e200c039178' ||
      req.body.agent === '5c16efcef6d0f300144d3cda'
    ) {
      confirmed = true;
    }
    // console.log(req.body);

    const newMooc = {
      category: req.body.subject,
      type: 'mooc',
      title: req.body.title,
      link: req.body.url,
      img: req.body.imageUrl,
      source: req.body.source,
      videoCount: req.body.videoCount,
      tutor: req.body.tutor,
      enrollees: req.body.enrollees,
      duration: req.body.duration,
      level: req.body.level,
      lastUpdated: req.body.lastUpdated,
      avgRating: req.body.avgRating,
      user_id: req.body.agent,
      confirmed: confirmed
    };

    Resource.create(newMooc, (err, resource) => {
      if (err) {
        res.send(err.name);
        // console.log(err);
      } else {
        resource.save();
        res.send({ resource: resource });
        // console.log(resource);
      }
    });
  });
};
