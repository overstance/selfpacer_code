const Subject = require('../models/Subject');

function renameSkill() {
  Subject.find({ title: 'Data Science' }, (err, subjects) => {
    if (err) {
      // console.log(err.message);
    } else {
      // console.log(subjects);
      subjects.forEach(subject => {
        Subject.findOneAndUpdate(
          {
            title: subject.title
          },
          {
            title: 'Data Analysis'
          },
          (err, subject) => {
            if (err) {
              // console.log(err);
            } else {
              subject.save();
            }
          }
        );
      });
    }
  });
}

module.exports = renameSkill;
