// const multer = require('multer');

/* const storage = multer.diskStorage({
  destination: './images',
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
}); */

// const upload = multer({ storage });

const Subject = require('../models/Subject');

module.exports = app => {
  app.get('/api/fetch_subjects', (req, res) => {
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

  app.get('/api/fetch_subject_info', (req, res) => {
    Subject.findOne({ title: req.query.subject }, (err, subject) => {
      if (err) {
        console.log(err);
        res.send({ error: err.name });
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
    Subject.find({ category: 'Humanities' }, function(err, lifestyleSubject) {
      if (err) {
        console.log(err);
      } else {
        //console.log(allSubject);
        res.send({ subjects: lifestyleSubject });
      }
    });
  });

  app.get('/api/subject', (req, res) => {
    Subject.find({ title: req.query.subject_title }, function(
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

  app.post('/api/edit_subject', (req, res) => {
    Subject.findOneAndUpdate(
      { title: req.body.subject },
      {
        paths: req.body.path,
        curriculum: req.body.curriculum,
        src: req.body.iconPath
      },
      (err, subject) => {
        if (err) {
          console.log(err);
          res.send({ error: err.name });
        } else {
          res.send(subject);
        }
      }
    );
  });

  app.post('/api/add_subject', (req, res) => {
    const newSubject = {
      title: req.body.subjectTitle,
      category: req.body.category,
      src: req.body.iconPath,
      alt: req.body.iconAlt,
      paths: req.body.path,
      curriculum: req.body.curriculum
    };

    Subject.create(newSubject, (err, subject) => {
      if (err) {
        res.send({ error: err.name });
      } else {
        subject.save();
        res.send({ subject: subject });
      }
    });
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

  /*  app.post('/api/upload_subjectIcon', upload.single('file'), (req, res) => {
    console.log(req.file.path);
    res.send({ path: req.file.path });
  }); */

  app.delete('/api/delete_subject', (req, res) => {
    Subject.findOneAndDelete(
      { title: req.query.subjectTitle },
      (err, subject) => {
        if (err) {
          res.send({ error: err.name });
          // console.log(err.message);
        } else if (subject) {
          res.send({ subject: subject });
        }
      }
    );
  });
};
