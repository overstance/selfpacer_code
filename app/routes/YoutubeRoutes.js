const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const { google } = require('googleapis');
const youtube = google.youtube({
  version: 'v3',
  auth: keys.youtubeAPI
});
const middleware = require('../middlewares');

const Resource = require('../models/Resource');

module.exports = app => {
  app.get('/api/youtube_accounting/:id', (req, res) => {
    Resource.findOne({ _id: req.params.id }, function(err, resource) {
      if (err) {
        console.log(err);
        res.send(err.name);
      } else {
        res.send({ resource: resource });
      }
    });
  });

  app.post(
    '/api/youtube_playlist' /* ,
    middleware.isLoggedIn */,
    async (req, res) => {
      const playlistId = req.body.id;
      const user = req.body.user;
      const subject = req.body.subject;

      let confirmed = false;
      if (
        user === '5c16e8de76e09e200c039178' ||
        user === '5c16efcef6d0f300144d3cda'
      ) {
        confirmed = true;
      }

      // console.log(user, confirmed);

      const response = await youtube.playlists.list({
        id: playlistId,
        part: 'snippet,contentDetails'
      });

      const responseData = response.data.items;
      // console.log(response.data);

      if (responseData.length === 0) {
        res.send('playlist not found!');
      } else {
        const seedData = await responseData.map(seed => {
          const pdate = new Date(seed.snippet.publishedAt);
          const year = pdate.getFullYear();

          return {
            publishDate: year,
            category: subject,
            title: seed.snippet.title,
            img: seed.snippet.thumbnails.medium.url,
            link: 'https://www.youtube.com/results?search_query=' + seed.id,
            views: 0,
            likes: 0,
            youtubeId: seed.id,
            source: 'youtube.com',
            type: seed.kind,
            videoCount: seed.contentDetails.itemCount,
            user_id: user,
            confirmed: confirmed
          };
        });

        seedData.forEach(function(seed) {
          Resource.create(seed, function(err, resource) {
            if (err) {
              console.log(err);
            } else {
              resource.save();
            }
          });
        });
        res.send({ seedData: seedData });
      }
    }
  );

  app.put('/api/youtube_playlist', middleware.isLoggedIn, (req, res) => {
    Resource.find(
      { type: 'youtube#playlist', category: req.body.subject },
      async (err, resources) => {
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
            Resource.findOneAndUpdate(
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
      }
    );
  });

  app.post(
    '/api/youtube_video' /* ,
    middleware.isLoggedIn */,
    async (req, res) => {
      const videoId = req.body.id;
      const user = req.body.user;
      const subject = req.body.subject;

      let confirmed = false;
      if (
        user === '5c16e8de76e09e200c039178' ||
        user === '5c16efcef6d0f300144d3cda'
      ) {
        confirmed = true;
      }

      const response = await youtube.videos.list({
        id: videoId,
        part: 'snippet,contentDetails,statistics'
      });

      const responseData = response.data.items;

      // console.log(responseData);

      function numberWithCommas(x) {
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      if (responseData.length === 0) {
        res.send('video not found!');
      } else {
        const seedData = await responseData.map(seed => {
          const pdate = new Date(seed.snippet.publishedAt);
          const year = pdate.getFullYear();

          return {
            publishDate: year,
            category: subject,
            title: seed.snippet.title,
            img: seed.snippet.thumbnails.medium.url,
            link: 'https://www.youtube.com/watch?v=' + seed.id,
            views: 0,
            likes: 0,
            youtubeId: seed.id,
            source: 'youtube.com',
            duration: seed.contentDetails.duration.slice(2),
            type: seed.kind,
            youtubeviews: numberWithCommas(seed.statistics.viewCount),
            youtubelikes: numberWithCommas(seed.statistics.likeCount),
            user_id: user,
            confirmed: confirmed
          };
        });

        seedData.forEach(function(seed) {
          Resource.create(seed, function(err, resource) {
            if (err) {
              console.log(err);
            } else {
              resource.save();
            }
          });
        });

        res.send({ seedData: seedData });
      }
    }
  );

  app.put('/api/youtube_video', middleware.isLoggedIn, (req, res) => {
    Resource.find(
      { type: 'youtube#video', category: req.body.subject },
      async (err, resources) => {
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
            Resource.findOneAndUpdate(
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
      }
    );
  });
};
