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

  /*  async function runSample() {
    const res = await youtube.search.list({
      part: 'full',
      q: 'accounting full course',
      maxResults: 10
    });
    console.log(res.data);
  }

  runSample();*/

  app.get('/api/accounting_youtube', async (err, res) => {
    /*     const response = await youtube.search.list({
      part: 'snippet',
      q: 'accounting full course',
      maxResults: 2
    }); */

    const response = await youtube.videos.list({
      id:
        'YjkRSlTxsZM,kNaxTNSAtLk,BdwiXi9cbRc,suzs0sCeWLc,5eGRi66iUfU,OowV6lQn6qI,v=sXaemwHoDDY',
      part: 'snippet,statistics'
    });

    if (err) {
      console.log(err);
    }

    /* res.send(response.data); */

    const responseData = response.data.items;

    /* console.log(responseData[0].snippet.title); */

    /*     const seedData = responseData.map(seed => {
      let rObj = {};

      rObj[title] = seed.snippet.title;
      rObj[img] = seed.snippet.thumbnails.default.url;
      rObj[link] = 'https://www.youtube.com/results?search_query=' + seed.id;
      rObj[likes] = 0;
      rObj[dislikes] = 0;
      rObj[source] = 'youtube.com';
      rObj[type] = seed.kind;
      rObj[youtubeviews] = seed.statistics.viewCount;

      return rObj;
    });

    res.send(seedData); */

    const seedData = responseData.map(seed => {
      return {
        title: seed.snippet.title,
        img: seed.snippet.thumbnails.default.url,
        link: 'https://www.youtube.com/results?search_query=' + seed.id,
        like: 0,
        dislikes: 0,
        source: 'youtube.com',
        type: seed.kind,
        youtubeviews: seed.statistics.viewCount,
        youtubelikes: seed.statistics.likeCount
      };
    });

    res.send(seedData);
  });

  app.post('/api/subjectviews', (req, res) => {
    //console.log(req.body);

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
};
