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
  app.get('/api/youtube_accounting', (req, res) => {
    YoutubeAcct.find({}, function(err, resources) {
      if (err) {
        console.log(err);
      } else {
        res.send({ accountingRes: resources });
      }
    });
  });

  app.get('/api/youtube_accounting/:id', (req, res) => {
    YoutubeAcct.findOne({ _id: req.params.id }, function(err, resource) {
      if (err) {
        console.log(err);
        res.send(err.name);
      } else {
        res.send({ resource: resource });
      }
    });
  });

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
        const pdate = new Date(seed.snippet.publishedAt);
        const year = pdate.getFullYear();
        return {
          publishDate: year,
          title: seed.snippet.title,
          img: seed.snippet.thumbnails.medium.url,
          link: 'https://www.youtube.com/results?search_query=' + seed.id,
          views: 0,
          likes: 0,
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

  app.put(
    '/api/youtube_accounting_playlist',
    middleware.isLoggedIn,
    (req, res) => {
      YoutubeAcct.find({ type: 'youtube#playlist' }, async (err, resources) => {
        if (err) {
          console.log(err);
        } else {
          const playlistIds = resources.map(video => video.youtubeId);

          playlistIdToString = playlistIds.join();

          const response = await youtube.playlists.list({
            id: playlistIdToString,
            part: 'snippet,contentDetails'
          });

          const responseData = response.data.items;

          const seedData = await responseData.map(seed => {
            return {
              youtubeId: seed.id,
              videoCount: seed.contentDetails.itemCount
            };
          });

          seedData.forEach(function(seed) {
            let query = seed.youtubeId;
            YoutubeAcct.findOneAndUpdate(
              query,
              { youtubeCount: seed.youtubeCount },
              function(err, resource) {
                if (err) {
                  console.log(err);
                } else {
                  resource.save();
                }
              }
            );
          });

          res.send(playlistIds);
        }
      });
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
        const pdate = new Date(seed.snippet.publishedAt);
        const year = pdate.getFullYear();

        return {
          publishDate: year,
          title: seed.snippet.title,
          img: seed.snippet.thumbnails.medium.url,
          link: 'https://www.youtube.com/results?search_query=' + seed.id,
          views: 0,
          likes: 0,
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

  app.put(
    '/api/youtube_accounting_video',
    middleware.isLoggedIn,
    (req, res) => {
      YoutubeAcct.find({ type: 'youtube#video' }, async (err, resources) => {
        if (err) {
          console.log(err);
        } else {
          const videoIds = resources.map(video => video.youtubeId);

          videoIdToString = videoIds.join();

          const response = await youtube.videos.list({
            id: videoIdToString,
            part: 'snippet,statistics'
          });

          const responseData = response.data.items;

          const seedData = await responseData.map(seed => {
            return {
              youtubeId: seed.id,
              youtubeviews: seed.statistics.viewCount,
              youtubelikes: seed.statistics.likeCount
            };
          });

          seedData.forEach(function(seed) {
            let query = seed.youtubeId;
            YoutubeAcct.findOneAndUpdate(
              query,
              {
                youtubeviews: seed.youtubeviews,
                youtubelikes: seed.youtubelikes
              },
              function(err, resource) {
                if (err) {
                  console.log(err);
                } else {
                  resource.save();
                }
              }
            );
          });

          res.send(videoIds);
        }
      });
    }
  );
};
