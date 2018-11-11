const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const { google } = require('googleapis');
const youtube = google.youtube({
  version: 'v3',
  auth: keys.youtubeAPI
});
const middleware = require('../middlewares');

const YoutubeAcct = require('../models/Youtube/YoutubeAcct');

module.exports = app => {
  app.get('/api/yaccounting_res', (req, res) => {
    YoutubeAcct.find({}, function(err, resources) {
      if (err) {
        console.log(err);
      } else {
        res.send({ accountingRes: resources });
      }
    });
  });

  /* app.get('/api/youtube_accounting', async (err, res) => {
    const response = await youtube.videos.list({
      id:
        'YjkRSlTxsZM,kNaxTNSAtLk,BdwiXi9cbRc,E5gxATVojT0,suzs0sCeWLc,5eGRi66iUfU,OowV6lQn6qI,sXaemwHoDDY',
      part: 'snippet,statistics'
    });

    const response = await youtube.playlists.list({
      id:
        'PL301238C9BC6E0B83,PLuDogk1rsivCeUWyWrHm1y1sBs2n7QeVL,PLnxFTRWqUJUuSGpUvfZOzbfu_K2HS6c22,PLRFN7dMESvQTnxNuX0e94ynXK9yim9qb3,',
      part: 'snippet,contentDetails'
    });

    if (err) {
      console.log(err);
    }

    const responseData = response.data.items;

    res.send(responseData);

     const seedData = await responseData.map(seed => {
      return {
        title: seed.snippet.title,
        img: seed.snippet.thumbnails.default.url,
        link: 'https://www.youtube.com/results?search_query=' + seed.id,
        like: 0,
        dislikes: 0,
        source: 'youtube.com',
        type: seed.kind,
        videoCount: seed.contentDetails.itemCount
      };
    });

    res.send(seedData);
  }); */

  app.post(
    '/api/youtube_accounting_playlist',
    middleware.isLoggedIn,
    async (req, res) => {
      const playlistId = req.body.id;
      const user = req.body.user;
      const response = await youtube.playlists.list({
        id: playlistId,
        part: 'snippet,contentDetails'
      });

      const responseData = response.data.items;

      const seedData = await responseData.map(seed => {
        return {
          title: seed.snippet.title,
          img: seed.snippet.thumbnails.default.url,
          link: 'https://www.youtube.com/results?search_query=' + seed.id,
          like: 0,
          dislikes: 0,
          youtubeId: seed.id,
          source: 'youtube.com',
          type: seed.kind,
          videoCount: seed.contentDetails.itemCount,
          user_id: user._id
        };
      });

      seedData.forEach(function(seed) {
        YoutubeAcct.create(seed, function(err, resource) {
          if (err) {
            console.log(err);
          } else {
            resource.save();
          }
        });
      });

      res.send(seedData);
    }
  );

  app.post(
    '/api/youtube_accounting_video',
    middleware.isLoggedIn,
    async (req, res) => {
      const videoId = req.body.id;
      const user = req.body.user;
      const response = await youtube.videos.list({
        id: videoId,
        part: 'snippet,statistics'
      });

      const responseData = response.data.items;

      const seedData = await responseData.map(seed => {
        return {
          title: seed.snippet.title,
          img: seed.snippet.thumbnails.default.url,
          link: 'https://www.youtube.com/results?search_query=' + seed.id,
          like: 0,
          dislikes: 0,
          youtubeId: seed.id,
          source: 'youtube.com',
          type: seed.kind,
          youtubeviews: seed.statistics.viewCount,
          youtubelikes: seed.statistics.likeCount,
          user_id: user._id
        };
      });

      seedData.forEach(function(seed) {
        YoutubeAcct.create(seed, function(err, resource) {
          if (err) {
            console.log(err);
          } else {
            resource.save();
          }
        });
      });

      res.send(seedData);
    }
  );
};
