const Subject = require('../models/Subject');

function renameSkillCategory() {
  Subject.find({ category: 'Life-style' }, (err, subjects) => {
    if (err) {
      // console.log(err.message);
    } else {
      // console.log(subjects);
      subjects.forEach(subject => {
        Subject.findOneAndUpdate(
          {
            category: subject.category
          },
          {
            category: 'Humanities'
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

module.exports = renameSkillCategory;
