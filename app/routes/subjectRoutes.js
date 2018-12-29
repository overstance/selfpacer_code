const multer = require('multer');
const keys = require('../config/keys');
const { google } = require('googleapis');

/* const youtube = google.youtube({
  version: 'v3',
  auth: keys.youtubeAPI
}); */

const storage = multer.diskStorage({
  destination: './client/public/images',
  filename(req, file, cb) {
    console.log(file);
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({ storage });

const Subject = require('../models/Subject');
const User_resource = require('../models/User_resource');

//GET ROUTES

module.exports = app => {
  app.get('/api/fetch_subject', (req, res) => {
    Subject.find({}, function(err, allSubject) {
      if (err) {
        console.log(err);
        res.send(err.name);
      } else {
        //console.log(allSubject);
        res.send({ subjects: allSubject });
      }
    });
  });

  app.get('/api/fetch_subject_info/:subject', (req, res) => {
    Subject.findOne({ title: req.params.subject }, (err, subject) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(subject);
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

  app.get('/api/animation', (req, res) => {
    Subject.find({ title: 'Animation' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/architecture', (req, res) => {
    Subject.find({ title: 'Architectural design' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/audio', (req, res) => {
    Subject.find({ title: 'Audio Production' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/beauty', (req, res) => {
    Subject.find({ title: 'Beauty' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/cloud', (req, res) => {
    Subject.find({ title: 'Cloud Computing' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/communications', (req, res) => {
    Subject.find({ title: 'Communications' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/customer', (req, res) => {
    Subject.find({ title: 'Customer Service' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/data', (req, res) => {
    Subject.find({ title: 'Data Science' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/database', (req, res) => {
    Subject.find({ title: 'Database' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/drawing', (req, res) => {
    Subject.find({ title: 'Drawing' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/fashion', (req, res) => {
    Subject.find({ title: 'Fashion Design' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/food', (req, res) => {
    Subject.find({ title: 'Food' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/gamedesign', (req, res) => {
    Subject.find({ title: 'Game Design' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/gamedev', (req, res) => {
    Subject.find({ title: 'Game Development' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/gaming', (req, res) => {
    Subject.find({ title: 'Gaming' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/graphics', (req, res) => {
    Subject.find({ title: 'Graphic Design' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/hardware', (req, res) => {
    Subject.find({ title: 'Hardware' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/health', (req, res) => {
    Subject.find({ title: 'Health and Fitness' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/home', (req, res) => {
    Subject.find({ title: 'Home Improvement' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/interface', (req, res) => {
    Subject.find({ title: 'UI/UX' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/interior', (req, res) => {
    Subject.find({ title: 'Interior design' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/management', (req, res) => {
    Subject.find({ title: 'Management' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/architecture', (req, res) => {
    Subject.find({ title: 'Architectural design' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/audio', (req, res) => {
    Subject.find({ title: 'Audio Production' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/beauty', (req, res) => {
    Subject.find({ title: 'Beauty' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/cloud', (req, res) => {
    Subject.find({ title: 'Cloud Computing' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/communications', (req, res) => {
    Subject.find({ title: 'Communications' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/customer', (req, res) => {
    Subject.find({ title: 'Customer Service' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/data', (req, res) => {
    Subject.find({ title: 'Data Science' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/database', (req, res) => {
    Subject.find({ title: 'Database' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/drawing', (req, res) => {
    Subject.find({ title: 'Drawing' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/fashion', (req, res) => {
    Subject.find({ title: 'Fashion Design' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/food', (req, res) => {
    Subject.find({ title: 'Food' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/gamedesign', (req, res) => {
    Subject.find({ title: 'Game Design' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/gamedev', (req, res) => {
    Subject.find({ title: 'Game Development' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/gaming', (req, res) => {
    Subject.find({ title: 'Gaming' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/graphics', (req, res) => {
    Subject.find({ title: 'Graphic Design' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/hardware', (req, res) => {
    Subject.find({ title: 'Hardware' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/health', (req, res) => {
    Subject.find({ title: 'Health and Fitness' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/home', (req, res) => {
    Subject.find({ title: 'Home Improvement' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/interface', (req, res) => {
    Subject.find({ title: 'UI/UX' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/interior', (req, res) => {
    Subject.find({ title: 'Interior design' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/management', (req, res) => {
    Subject.find({ title: 'Management' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/marketing', (req, res) => {
    Subject.find({ title: 'Marketing and Sales' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/mobile', (req, res) => {
    Subject.find({ title: 'Mobile Development' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/modesign', (req, res) => {
    Subject.find({ title: 'Motion Design/VFX' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/music', (req, res) => {
    Subject.find({ title: 'Music' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/network', (req, res) => {
    Subject.find({ title: 'Networks and Systems' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/painting', (req, res) => {
    Subject.find({ title: 'Painting' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/personal_dev', (req, res) => {
    Subject.find({ title: 'Personal Development' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/pet', (req, res) => {
    Subject.find({ title: 'Pet Care' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/photography', (req, res) => {
    Subject.find({ title: 'Photography' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/prof_dev', (req, res) => {
    Subject.find({ title: 'Professional Development' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/real_estate', (req, res) => {
    Subject.find({ title: 'Real Estate' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/software', (req, res) => {
    Subject.find({ title: 'Software Development' }, function(
      err,
      clickedSubject
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/study_skill', (req, res) => {
    Subject.find({ title: 'Study Skills' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/teaching_skill', (req, res) => {
    Subject.find({ title: 'Teaching Skills' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/travel', (req, res) => {
    Subject.find({ title: 'Travel' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/video', (req, res) => {
    Subject.find({ title: 'Video' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/web_design', (req, res) => {
    Subject.find({ title: 'Web Design' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/webdev', (req, res) => {
    Subject.find({ title: 'Web Development' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  app.get('/api/writing', (req, res) => {
    Subject.find({ title: 'Creative Writing' }, function(err, clickedSubject) {
      if (err) {
        console.log(err);
      } else {
        res.send({ subjects: clickedSubject });
      }
    });
  });

  /*  app.get('/api/accounting_youtube', async (err, res) => {
    const response = await youtube.playlists.list({
      id: 'PL301238C9BC6E0B83,PLuDogk1rsivCeUWyWrHm1y1sBs2n7QeVL',
      part: 'snippet,contentDetails'
    });

    if (err) {
      console.log(err);
    }

    res.send(response.data.items);
  }); */

  //POST ROUTES

  app.post('/api/edit_subject', (req, res) => {
    Subject.findOneAndUpdate(
      { title: req.body.subject },
      { paths: req.body.path, curriculum: req.body.curriculum },
      (err, subject) => {
        if (err) {
          console.log(err);
          res.send(err.message);
        } else {
          res.send(subject);
        }
      }
    );
  });

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

  app.post(
    '/api/upload_subjectIcon',
    upload.single('file'),
    async (req, res) => {
      // console.log(req.body.file);
      res.send(req.body.file);
    }
  );
};
