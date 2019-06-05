const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/unconfirmed_resources', (req, res) => {
    Resource.find({ confirmed: false }, function(err, resources) {
      if (err) {
        console.log(err.message);
        res.send(err.message);
      } else {
        res.send({ resources: resources });
      }
    });
  });

  app.get('/api/resources/:subjectTitle', (req, res) => {
    Resource.find(
      { confirmed: true, category: req.params.subjectTitle },
      function(err, resources) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send({ all: resources });
        }
      }
    );
  });

  app.get('/api/all_accounting', (req, res) => {
    Resource.find({ confirmed: true, category: 'Accounting' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_animation', (req, res) => {
    Resource.find({ confirmed: true, category: 'Animation' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_architecture', (req, res) => {
    Resource.find(
      { confirmed: true, category: 'Architectural design' },
      function(err, resources) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send({ all: resources });
        }
      }
    );
  });

  app.get('/api/all_audio', (req, res) => {
    Resource.find({ confirmed: true, category: 'Audio Production' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_beauty', (req, res) => {
    Resource.find({ confirmed: true, category: 'Beauty' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_cloud', (req, res) => {
    Resource.find({ confirmed: true, category: 'Cloud Computing' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_communications', (req, res) => {
    Resource.find({ confirmed: true, category: 'Communications' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_customer', (req, res) => {
    Resource.find({ confirmed: true, category: 'Customer Service' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_data', (req, res) => {
    Resource.find({ confirmed: true, category: 'Data Science' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_database', (req, res) => {
    Resource.find({ confirmed: true, category: 'Database' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_drawing', (req, res) => {
    Resource.find({ confirmed: true, category: 'Drawing' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_fashion', (req, res) => {
    Resource.find({ confirmed: true, category: 'Fashion Design' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_food', (req, res) => {
    Resource.find({ confirmed: true, category: 'Food' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_gamedesign', (req, res) => {
    Resource.find({ confirmed: true, category: 'Game Design' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_gamedev', (req, res) => {
    Resource.find({ confirmed: true, category: 'Game Development' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_gaming', (req, res) => {
    Resource.find({ confirmed: true, category: 'Gaming' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_graphics', (req, res) => {
    Resource.find({ confirmed: true, category: 'Graphic Design' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_hardware', (req, res) => {
    Resource.find({ confirmed: true, category: 'Hardware' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_health', (req, res) => {
    Resource.find({ confirmed: true, category: 'Health and Fitness' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_home', (req, res) => {
    Resource.find({ confirmed: true, category: 'Home Improvement' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_interface', (req, res) => {
    Resource.find({ confirmed: true, category: 'UI/UX' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_interior', (req, res) => {
    Resource.find({ confirmed: true, category: 'Interior design' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_management', (req, res) => {
    Resource.find({ confirmed: true, category: 'Management' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_marketing', (req, res) => {
    Resource.find(
      { confirmed: true, category: 'Marketing and Sales' },
      function(err, resources) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send({ all: resources });
        }
      }
    );
  });

  app.get('/api/all_mobile', (req, res) => {
    Resource.find({ confirmed: true, category: 'Mobile Development' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_modesign', (req, res) => {
    Resource.find({ confirmed: true, category: 'Motion Design/VFX' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_music', (req, res) => {
    Resource.find({ confirmed: true, category: 'Music' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_network', (req, res) => {
    Resource.find(
      { confirmed: true, category: 'Networks and Systems' },
      function(err, resources) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send({ all: resources });
        }
      }
    );
  });

  app.get('/api/all_painting', (req, res) => {
    Resource.find({ confirmed: true, category: 'Painting' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_personal_dev', (req, res) => {
    Resource.find(
      { confirmed: true, category: 'Personal Development' },
      function(err, resources) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send({ all: resources });
        }
      }
    );
  });

  app.get('/api/all_pet', (req, res) => {
    Resource.find({ confirmed: true, category: 'Pet Care' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_photography', (req, res) => {
    Resource.find({ confirmed: true, category: 'Photography' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_prof_dev', (req, res) => {
    Resource.find(
      { confirmed: true, category: 'Professional Development' },
      function(err, resources) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send({ all: resources });
        }
      }
    );
  });

  app.get('/api/all_real_estate', (req, res) => {
    Resource.find({ confirmed: true, category: 'Real Estate' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_software', (req, res) => {
    Resource.find(
      { confirmed: true, category: 'Software Development' },
      function(err, resources) {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send({ all: resources });
        }
      }
    );
  });

  app.get('/api/all_study_skill', (req, res) => {
    Resource.find({ confirmed: true, category: 'Study Skills' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_teaching_skill', (req, res) => {
    Resource.find({ confirmed: true, category: 'Teaching Skills' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_travel', (req, res) => {
    Resource.find({ confirmed: true, category: 'Travel' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_video', (req, res) => {
    Resource.find({ confirmed: true, category: 'Video' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_web_design', (req, res) => {
    Resource.find({ confirmed: true, category: 'Web Design' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_webdev', (req, res) => {
    Resource.find({ confirmed: true, category: 'Web Development' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/all_writing', (req, res) => {
    Resource.find({ confirmed: true, category: 'Writing' }, function(
      err,
      resources
    ) {
      if (err) {
        console.log(err);
        res.send(err.message);
      } else {
        res.send({ all: resources });
      }
    });
  });

  app.get('/api/user_assets/:userId', (req, res) => {
    Resource.find({ user_id: req.params.userId }, (err, resources) => {
      if (err) {
        res.send(err.name);
      } else {
        res.send({ resources: resources });
      }
    });
  });

  app.get('/api/recently_viewed/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        res.send(err.message);
        console.log(err.message);
        return;
      } else {
        const recentlyViewed = user.recentlyViewed;

        Resource.find({ _id: { $in: recentlyViewed } }, (err, resources) => {
          if (err) {
            res.send(err.message);
            console.log(err.message);
            return;
          } else {
            res.send({ resources: resources });
            // console.log(resources);
          }
        });
      }
    });
  });

  app.post('/api/resource_liked', (req, res) => {
    //console.log(req.body);

    let id = req.body.resourceId;
    let likes = req.body.resourceLikes;

    Resource.findOneAndUpdate({ _id: id }, { likes: likes }, function(
      err,
      updatedResource
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ resource: updatedResource });
      }
    });
  });

  app.post('/api/user_liked_resources/:userId', (req, res) => {
    // console.log(req.body);
    // console.log(req.params.userId);

    // let query = { _id: req.body.userId };

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { recentlyViewed: req.body },
      function(err, user) {
        if (err) {
          console.log(err);
          res.send(err.name);
        } else {
          res.send('userRecentlyViewedUpdated');
        }
      }
    );
  });

  app.post('/api/increase_resourceviews', (req, res) => {
    Resource.findOneAndUpdate(
      { _id: req.body.resourceId },
      { views: req.body.resourceViews },
      (err, resource) => {
        if (err) {
          console.log(err);
        } else {
          res.send(resource);
        }
      }
    );
  });

  app.post('/api/update_user_liked_count/:userId', (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { likeCount: req.body.newLikeCount },
      function(err, user) {
        if (err) {
          console.log(err);
          res.send(err.name);
        } else {
          res.send('userLikeCountUpdated');
        }
      }
    );
  });

  app.post('/api/increase_collect_count/:resourceToAdd', (req, res) => {
    Resource.findOne({ _id: req.params.resourceToAdd }, (err, resource) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        const newCount = resource.collectCount + 1;

        Resource.findOneAndUpdate(
          { _id: req.params.resourceToAdd },
          { collectCount: newCount },
          (err, resource) => {
            if (resource) {
              res.send('collectCount increased');
            }
          }
        );
      }
    });
  });

  app.put('/api/confirm_resource', (req, res) => {
    Resource.findByIdAndUpdate(
      req.body.resourceId,
      { confirmed: true },
      (err, resource) => {
        if (err) {
          res.send(err.message);
          console.log(err.message);
        } else if (resource) {
          Resource.find({ confirmed: false }, (err, resources) => {
            if (err) {
              res.send(err.message);
              console.log(err.message);
            } else if (resources) {
              res.send({ resources: resources });
            }
          });
        }
      }
    );
  });

  app.delete('/api/delete_resource/:resourceId', (req, res) => {
    Resource.findByIdAndDelete(req.params.resourceId, (err, resource) => {
      if (err) {
        res.send(err.message);
        console.log(err.message);
      } else if (resource) {
        Resource.find({ confirmed: false }, (err, resources) => {
          if (err) {
            res.send(err.message);
            console.log(err.message);
          } else if (resources) {
            res.send({ resources: resources });
          }
        });
      }
    });
  });

  app.delete('/api/delete_asset/:resourceId/:userId', (req, res) => {
    Resource.findByIdAndDelete(req.params.resourceId, (err, resource) => {
      if (err) {
        res.send(err.message);
        console.log(err.message);
      } else if (resource) {
        Resource.find({ user_id: req.params.userId }, (err, resources) => {
          if (err) {
            res.send(err.name);
          } else {
            res.send({ resources: resources });
          }
        });
      }
    });
  });
};
