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
  /* app.get('/api/youtube_accounting/:id', (req, res) => {
    Resource.findOne({ _id: req.params.id }, function(err, resource) {
      if (err) {
        console.log(err);
        res.send(err.name);
      } else {
        res.send({ resource: resource });
      }
    });
  }); */

  app.post('/api/add_youtube_playlist', (req, res) => {
    Resource.find(
      {
        youtubeId: {
          $in: [req.body.id]
        },
        category: req.body.subject,
        type: 'youtube#playlist'
      },
      async (err, resources) => {
        if (err) {
          res.send(err.name);
        } else if (resources.length > 0) {
          // console.log(resources, req.body.id);
          res.send('resource already added!');
        } else {
          const playlistId = req.body.id;
          const userId = req.body.userId;
          const userType = req.body.userType;
          const subject = req.body.subject;

          let confirmed = false;
          let isAdmin = false;
          if (
            userType === 'Administrator' ||
            /* userType === 'Facilitator' || */
            userType === 'ChiefAdmin'
          ) {
            confirmed = true;
            isAdmin = true;
          }

          const response = await youtube.playlists.list({
            id: playlistId,
            part: 'snippet,contentDetails'
          });

          const responseData = response.data.items;

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
                user_id: userId,
                confirmed: confirmed,
                isAdmin: isAdmin,
                lastEdited: Date.now()
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
      }
    );
  });

  app.put(
    '/api/update_youtube_playlists',
    middleware.isLoggedIn,
    (req, res) => {
      Resource.find(
        {
          type: 'youtube#playlist',
          category: req.body.subject,
          user_id: {
            $in: ['5c16e8de76e09e200c039178', '5c16efcef6d0f300144d3cda']
          }
        },
        async (err, resources) => {
          if (err) {
            res.send({ error: err.message });
          } else if (resources.length === 0) {
            res.send({ error: 'no playlists found' });
          } else {
            const playlistIds = resources.map(playlist => playlist.youtubeId);

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
                {
                  youtubeId: seed.youtubeId,
                  category: req.body.subject,
                  type: 'youtube#playlist'
                },
                {
                  videoCount: seed.videoCount,
                  lastEdited: Date.now()
                },
                function(err, resource) {
                  if (err) {
                    console.log(err);
                    res.send({ error: err.name });
                    return;
                  } else {
                    resource.save();
                  }
                }
              );
            });

            res.send({ playlistIds: playlistIds });
          }
        }
      );
    }
  );

  app.post('/api/add_youtube_video', (req, res) => {
    Resource.find(
      {
        youtubeId: {
          $in: [req.body.id]
        },
        category: req.body.subject,
        type: 'youtube#video'
      },
      async (err, resources) => {
        if (err) {
          res.send(err.name);
        } else if (resources.length > 0) {
          // console.log(resources, req.body.id);
          res.send('resource already added!');
        } else {
          const videoId = req.body.id;
          const userId = req.body.userId;
          const userType = req.body.userType;
          const subject = req.body.subject;

          let confirmed = false;
          let isAdmin = false;
          if (
            userType === 'Administrator' ||
            /* userType === 'Facilitator' || */
            userType === 'ChiefAdmin'
          ) {
            confirmed = true;
            isAdmin = true;
          }

          const response = await youtube.videos.list({
            id: videoId,
            part: 'snippet,contentDetails,statistics'
          });

          const responseData = response.data.items;

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
                user_id: userId,
                confirmed: confirmed,
                isAdmin: isAdmin,
                lastEdited: Date.now()
              };
            });

            seedData.forEach(function(seed) {
              Resource.create(seed, function(err, resource) {
                if (err) {
                  console.log(err);
                  res.send(err.message);
                  return;
                } else {
                  resource.save();
                }
              });
            });

            res.send({ seedData: seedData });
          }
        }
      }
    );
  });

  app.put('/api/update_youtube_videos', middleware.isLoggedIn, (req, res) => {
    // console.log(req.body.subject);
    Resource.find(
      {
        type: 'youtube#video',
        category: req.body.subject,
        user_id: {
          $in: ['5c16e8de76e09e200c039178', '5c16efcef6d0f300144d3cda']
        }
      },
      async (err, resources) => {
        if (err) {
          res.send({ error: err.message });
          // console.log(err.message);
        } else if (resources.length === 0) {
          // console.log('length=0', resources);
          res.send({ error: 'no videos found' });
        } else {
          // console.log('length!=0', resources);
          function numberWithCommas(x) {
            return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
          const videoIds = resources.map(video => video.youtubeId);

          videoIdToString = videoIds.join();

          // console.log(videoIdToString);

          const response = await youtube.videos.list({
            id: videoIdToString,
            part: 'snippet,statistics'
          });

          const responseData = response.data.items;

          // console.log(responseData);

          const seedData = await responseData.map(seed => {
            return {
              youtubeviews: numberWithCommas(seed.statistics.viewCount),
              youtubelikes: numberWithCommas(seed.statistics.likeCount),
              youtubeId: seed.id
            };
          });

          seedData.forEach(function(seed) {
            Resource.findOneAndUpdate(
              {
                youtubeId: seed.youtubeId,
                category: req.body.subject,
                type: 'youtube#video'
              },
              {
                youtubeviews: seed.youtubeviews,
                youtubelikes: seed.youtubelikes,
                lastEdited: Date.now()
              },
              function(err, resource) {
                if (err) {
                  // console.log(err);
                  res.send({ error: err.name });
                  return;
                } else {
                  // console.log(resource);
                  resource.save();
                }
              }
            );
          });

          res.send({ videoIds: videoIds });
        }
      }
    );
  });

  app.put(
    '/api/update_youtube_video_asset/:youtubeId/:resourceId',
    async (req, res) => {
      const response = await youtube.videos.list({
        id: req.params.youtubeId,
        part: 'snippet,statistics'
      });

      function numberWithCommas(x) {
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      if (response.data.items) {
        const responseData = response.data.items[0];
        // console.log(req.params.youtubeId, req.params.resourceId);
        Resource.findOneAndUpdate(
          {
            youtubeId: responseData.id,
            _id: req.params.resourceId
          },
          {
            youtubeviews: numberWithCommas(responseData.statistics.viewCount),
            youtubelikes: numberWithCommas(responseData.statistics.likeCount),
            lastEdited: Date.now()
          },
          { new: true },
          (err, resource) => {
            if (err) {
              res.send(err.message);
            } else {
              // resource.save();
              res.send({ resource: resource });
            }
          }
        );
      } else {
        res.send('update failed');
      }
    }
  );

  app.put('/api/update_youtube_playlist_asset/:youtubeId', async (req, res) => {
    const response = await youtube.playlists.list({
      id: req.params.youtubeId,
      part: 'snippet,contentDetails'
    });

    if (response.data.items) {
      const responseData = response.data.items[0];
      Resource.findOneAndUpdate(
        { youtubeId: responseData.id },
        {
          videoCount: responseData.contentDetails.itemCount,
          lastEdited: Date.now()
        },
        { new: true },
        (err, resource) => {
          if (err) {
            res.send(err.message);
          } else {
            // resource.save();
            res.send({ resource: resource });
          }
        }
      );
    } else {
      res.send('update failed');
    }
  });
};
