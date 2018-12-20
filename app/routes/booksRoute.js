const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.post('/api/add_books', (req, res) => {
    // console.log(req.body);

    const newBook = {
      category: req.body.subject,
      type: 'books',
      title: req.body.title,
      link: req.body.url,
      img: req.body.imageUrl,
      source: req.body.source,
      author: req.body.author,
      level: req.body.level,
      avgRating: req.body.avgRating,
      user_id: req.body.agent
    };

    Resource.create(newBook, (err, resource) => {
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
