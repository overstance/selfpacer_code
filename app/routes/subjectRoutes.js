/* const passport = require('passport');
const mongoose = require('mongoose'); */
const keys = require('../config/keys');
const { google } = require('googleapis');
const youtube = google.youtube({
  version: 'v3',
  auth: keys.youtubeAPI
});

/*const googleapis = require('googleapis');
googleapis.client.setApiKey(keys.youtubeAPI);*/

const Subject = require('../models/Subject');
const User_resource = require('../models/User_resource');

//GET ROUTES

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

  app.get('/api/accounting_youtube', async (err, res) => {
    const response = await youtube.playlists.list({
      id: 'PL301238C9BC6E0B83,PLuDogk1rsivCeUWyWrHm1y1sBs2n7QeVL',
      part: 'snippet,contentDetails'
    });

    if (err) {
      console.log(err);
    }

    res.send(response.data.items);
  });

  //POST ROUTES

  app.post('/api/subjectviews', (req, res) => {
    let id = req.body.subjectId;
    let views = req.body.subjectViews;

    Subject.findOneAndUpdate({ _id: id }, { views: views }, function(
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

  app.post('/api/add_resources', (req, res) => {
    // console.log(req.body);

    const resource = {
      subject: req.body.subject,
      type: req.body.type,
      user_id: req.body.userId,
      link: req.body.link
    };

    User_resource.create(resource, function(err, resource) {
      if (err) {
        console.log(err);
        res.send(err.name);
      } else {
        resource.save();
        // console.log('resource saved');
        res.send('Resource submitted!!');
      }
    });
  });
};
