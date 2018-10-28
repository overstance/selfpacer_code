const passport = require('passport');
const mongoose = require('mongoose');

const Subject = require('../models/Subject');

module.exports = app => {
  app.get('/api/explore', (req, res) => {
    Subject.find({}, function(err, allSubject) {
      if (err) {
        console.log(err);
      } else {
        //console.log(allSubject);
        res.send({ subjects: allSubject });
      }
    });
  });

  app.get('/api/creative', (req, res) => {
    Subject.find({ category: 'Creative' }, function(err, creativeSubject) {
      if (err) {
        console.log(err);
      } else {
        //console.log(allSubject);
        res.send({ subjects: creativeSubject });
      }
    });
  });

  app.get('/api/business', (req, res) => {
    Subject.find({ category: 'Business' }, function(err, businessSubject) {
      if (err) {
        console.log(err);
      } else {
        //console.log(allSubject);
        res.send({ subjects: businessSubject });
      }
    });
  });

  app.get('/api/technology', (req, res) => {
    Subject.find({ category: 'Technology' }, function(err, technologySubject) {
      if (err) {
        console.log(err);
      } else {
        //console.log(allSubject);
        res.send({ subjects: technologySubject });
      }
    });
  });

  app.get('/api/lifestyle', (req, res) => {
    Subject.find({ category: 'Life-style' }, function(err, lifestyleSubject) {
      if (err) {
        console.log(err);
      } else {
        //console.log(allSubject);
        res.send({ subjects: lifestyleSubject });
      }
    });
  });

  app.get('/api/accounting', (req, res) => {
    Subject.find({ title: 'Accounting' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.post('/api/subjectviews', (req, res) => {
    //console.log(req.body);

    let id = req.body.subjectId;
    let views = req.body.subjectViews;

    Subject.findByIdAndUpdate(id, { views: views }, function(
      err,
      updatedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: updatedSubject });
      }
    });
  });
};
