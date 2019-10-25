const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Inspiration = require('../models/Inspiration');

module.exports = app => {
  app.put('/api/add_admin_user', (req, res) => {
    let isEditor = false;
    if (req.body.newAccountType === 'Editor') {
      isEditor = true;
    }
    User.findOneAndUpdate(
      { _id: req.body.userId },
      { accountType: req.body.newAccountType, isEditor: isEditor },
      function(err, updatedUser) {
        if (err) {
          // console.log(err.name);
          res.send({ error: err.name });
        } else {
          res.send({ updatedUser: updatedUser });
        }
      }
    );
  });

  app.put('/api/add_admin_type', (req, res) => {
    if (req.body.type === 'author') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isAuthor: true,
          twitterUrl: req.body.twitterUrl
          /* ,
          facebookUrl: req.body.facebookUrl,
          linkedinUrl: req.body.linkedinUrl 
          */
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'editor') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isEditor: true
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'user manager') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isUserManager: true
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'asset manager') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isAssetManager: true
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'artist') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isArtist: true
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'researcher') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isResearcher: true
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'counselor') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isCounselor: true
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'course provider') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isCourseProvider: true
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    }
  });

  app.put('/api/remove_admin_type', (req, res) => {
    if (req.body.type === 'author') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isAuthor: false
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'editor') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isEditor: false
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'user manager') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isUserManager: false
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'asset manager') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isAssetManager: false
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'artist') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isArtist: false
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'researcher') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isResearcher: false
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'counselor') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isCounselor: false
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    } else if (req.body.type === 'course provider') {
      User.findByIdAndUpdate(
        req.body.userId,
        {
          isCourseProvider: false
        },
        { new: true },
        (err, user) => {
          if (err) {
            res.send({ error: err.name });
          } else if (user) {
            res.send({ user: user });
          }
        }
      );
    }
  });

  app.put('/api/add_facilitator', (req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        accountType: 'Facilitator'
      },
      function(err, updatedUser) {
        if (err) {
          res.send({ error: err.name });
        } else {
          res.send({ updatedUser: updatedUser });
        }
      }
    );
  });

  app.put('/api/remove_facilitator', (req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        accountType: 'User',
        isFacilitateApplicant: false,
        workUrl1: undefined,
        workUrl2: undefined,
        dateOfFacilitateApplication: undefined
      },
      function(err, updatedUser) {
        if (err) {
          // console.log(err.name);
          res.send({ error: err.name });
        } else {
          res.send({ updatedUser: updatedUser });
        }
      }
    );
  });

  app.get('/api/fetch_authors', (req, res) => {
    User.find(
      {
        accountType: {
          $in: ['Head Administrator', 'Editor', 'Administartor', 'Facilitator']
        },
        isAuthor: true
      },
      (err, authors) => {
        if (err) {
          res.send(err.message);
        } else if (authors) {
          res.send({ authors: authors });
        }
      }
    );
  });

  app.get('/api/fetch_user_by_attribute', (req, res) => {
    if (req.query.type === 'name') {
      User.find({ name: req.query.attribute }, (err, user) => {
        if (err) {
          res.send({ error: err.name });
        } else if (user) {
          res.send({ user: user });
        }
      });
    } else if (req.query.type === 'email') {
      User.find({ email: req.query.attribute }, (err, user) => {
        if (err) {
          res.send({ error: err.name });
        } else if (user) {
          res.send({ user: user });
        }
      });
    }
  });

  app.post('/api/add_new_inspire_text', (req, res) => {
    let newInspireText = {
      inspireText: req.body.textValue
    };

    Inspiration.create(newInspireText, (err, inspireText) => {
      if (err) {
        res.send({ error: err.name });
      } else {
        res.send({ newInspireText: inspireText });
      }
    });
  });

  app.get('/api/fetch_inspire_text', (req, res) => {
    Inspiration.find({}, (err, inspireTexts) => {
      if (err) {
        res.send({ error: err.name });
      } else {
        res.send({ inspireTexts: inspireTexts });
      }
    });
  });

  app.delete('/api/delete_inspire_text', (req, res) => {
    // console.log(req.query.textId);
    Inspiration.findByIdAndDelete(req.query.textId, (err, inspireText) => {
      if (err) {
        res.send({ error: err.name });
      } else if (inspireText) {
        res.send({ message: 'delete successful' });
      }
    });
  });
};
