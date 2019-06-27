const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.post('/api/add_books', (req, res) => {
    // console.log(req.body);

    let confirmed = false;
    if (
      req.body.agent === '5c16e8de76e09e200c039178' ||
      req.body.agent === '5c16efcef6d0f300144d3cda'
    ) {
      confirmed = true;
    }

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
      user_id: req.body.agent,
      confirmed: confirmed
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

  app.put('/api/update_book_asset', (req, res) => {
    Resource.findByIdAndUpdate(
      req.body.resourceId,
      {
        level: req.body.level,
        avgRating: req.body.avgRating
      },
      { new: true },
      (err, resource) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send({ resource: resource });
        }
      }
    );
  });
};
