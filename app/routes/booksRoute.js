const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.post('/api/add_books', (req, res) => {
    // console.log(req.body);

    let confirmed = false;
    if (
      req.body.userType === 'Administrator' ||
      req.body.userType === 'Facilitator'
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
      user_id: req.body.userId,
      confirmed: confirmed,
      lastEdited: Date.now()
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
        avgRating: req.body.avgRating,
        lastEdited: Date.now()
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
