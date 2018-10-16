const mongoose = require('mongoose');
const Subject = require('./models/Subject');

const data = [
  {
    title: 'Food',
    category: 'Creative',
    src: '/images/utensils.svg',
    alt: 'food icon',
    views: 0
  },
  {
    title: 'Beauty',
    category: 'Creative',
    src: '/images/spa.svg',
    alt: 'Spa icon',
    views: 0
  },
  {
    title: 'Painting',
    category: 'Creative',
    src: '/images/paint-brush.svg',
    alt: 'painting icon',
    views: 0
  },
  {
    title: 'Drawing',
    category: 'Creative',
    src: '/images/drafting-compass.svg',
    alt: 'drawing icon',
    views: 0
  },
  {
    title: 'Photography',
    category: 'Creative',
    src: '/images/camera-retro.svg',
    alt: 'Photography icon',
    views: 0
  },
  {
    title: 'Communication',
    category: 'Creative',
    src: '/images/edit.svg',
    alt: 'Communication icon',
    views: 0
  },
  {
    title: 'Music',
    category: 'Creative',
    src: '/images/music.svg',
    alt: 'Music icon',
    views: 0
  },
  {
    title: 'Web design',
    category: 'Creative',
    src: '/images/web.svg',
    alt: 'Web design icon',
    views: 0
  },
  {
    title: 'Graphic design',
    category: 'Creative',
    src: '/images/object-group.svg',
    alt: 'Graphic design icon',
    views: 0
  },
  {
    title: 'UI/UX',
    category: 'Creative',
    src: '/images/userinterface.svg',
    alt: 'UI/UX icon',
    views: 0
  },
  {
    title: 'Game design',
    category: 'Creative',
    src: '/images/dice.svg',
    alt: 'Game design icon',
    views: 0
  },
  {
    title: 'Animation',
    category: 'Creative',
    src: '/images/keyframe.svg',
    alt: 'Animation icon',
    views: 0
  },
  {
    title: 'Fashion design',
    category: 'Creative',
    src: '/images/cut.svg',
    alt: 'Fashion design icon',
    views: 0
  },
  {
    title: 'Architectural design',
    category: 'Creative',
    src: '/images/archway.svg',
    alt: 'Architectural design icon',
    views: 0
  },
  {
    title: 'Interior design',
    category: 'Creative',
    src: '/images/couch.svg',
    alt: 'Interior design icon',
    views: 0
  },
  {
    title: 'Motion graphics and vfx',
    category: 'Creative',
    src: '/images/blur.svg',
    alt: 'Motion graphics and vfx icon',
    views: 0
  },
  {
    title: 'Marketing and sales',
    category: 'Business',
    src: '/images/funnel-dollar.svg',
    alt: 'Marketing and sales icon',
    views: 0
  },
  {
    title: 'Finance',
    category: 'Business',
    src: '/images/hand-holding-usd.svg',
    alt: 'Finance icon',
    views: 0
  },
  {
    title: 'Enterpreneurship',
    category: 'Business',
    src: '/images/briefcase.svg',
    alt: 'Enterpreneurship icon',
    views: 0
  },
  {
    title: 'Management',
    category: 'Business',
    src: '/images/user-tie.svg',
    alt: 'Management icon',
    views: 0
  },
  {
    title: 'Business law',
    category: 'Business',
    src: '/images/registered.svg',
    alt: 'Business law icon',
    views: 0
  },
  {
    title: 'Business analytics',
    category: 'Business',
    src: '/images/search-dollar.svg',
    alt: 'Business analytics icon',
    views: 0
  },
  {
    title: 'Human resources',
    category: 'Business',
    src: '/images/people-carry.svg',
    alt: 'Human resources icon',
    views: 0
  },
  {
    title: 'Real estate',
    category: 'Business',
    src: '/images/city.svg',
    alt: 'Real estate icon',
    views: 0
  },
  {
    title: 'Customer service',
    category: 'Business',
    src: '/images/headset.svg',
    alt: 'Customer service icon',
    views: 0
  },
  {
    title: 'Cloud computing',
    category: 'Technology',
    src: '/images/cloud.svg',
    alt: 'Cloud computing icon',
    views: 0
  },
  {
    title: 'Data science',
    category: 'Technology',
    src: '/images/chart-area.svg',
    alt: 'Data science icon',
    views: 0
  },
  {
    title: 'Database',
    category: 'Technology',
    src: '/images/database.svg',
    alt: 'Database icon',
    views: 0
  },
  {
    title: 'Hardware',
    category: 'Technology',
    src: '/images/microchip.svg',
    alt: 'Hardware icon',
    views: 0
  },
  {
    title: 'IT support',
    category: 'Technology',
    src: '/images/headphones.svg',
    alt: 'IT support icon',
    views: 0
  },
  {
    title: 'Mobile development',
    category: 'Technology',
    src: '/images/android.svg',
    alt: 'Mobile development icon',
    views: 0
  },
  {
    title: 'Network and systems',
    category: 'Technology',
    src: '/images/router.svg',
    alt: 'Network and systems icon',
    views: 0
  },
  {
    title: 'Security',
    category: 'Technology',
    src: '/images/shield-alt.svg',
    alt: 'Security icon',
    views: 0
  },
  {
    title: 'Software Engineering',
    category: 'Technology',
    src: '/images/file-code.svg',
    alt: 'Software Engineering icon',
    views: 0
  },
  {
    title: 'Web development',
    category: 'Technology',
    src: '/images/http.svg',
    alt: 'Web development',
    views: 0
  },
  {
    title: 'Personal development',
    category: 'Life-style',
    src: '/images/dove.svg',
    alt: 'Personal development icon',
    views: 0
  },
  {
    title: 'Career development',
    category: 'Life-style',
    src: '/images/certificate.svg',
    alt: 'Career development icon',
    views: 0
  },
  {
    title: 'Study skills',
    category: 'Life-style',
    src: '/images/brain.svg',
    alt: 'Study skills icon',
    views: 0
  },
  {
    title: 'Health and fitness',
    category: 'Life-style',
    src: '/images/heartbeat.svg',
    alt: 'Health and fitness icon',
    views: 0
  },
  {
    title: 'Teaching training',
    category: 'Life-style',
    src: '/images/chalkboard-teacher.svg',
    alt: 'Teaching training icon',
    views: 0
  },
  {
    title: 'Travel',
    category: 'Life-style',
    src: '/images/map-marked-alt.svg',
    alt: 'Travel icon',
    views: 0
  },
  {
    title: 'Gaming',
    category: 'Life-style',
    src: '/images/gamepad.svg',
    alt: 'Gaming icon',
    views: 0
  },
  {
    title: 'Home improvement',
    category: 'Life-style',
    src: '/images/home.svg',
    alt: 'Home improvement icon',
    views: 0
  },
  {
    title: 'Pet care',
    category: 'Life-style',
    src: '/images/paw.svg',
    alt: 'Pet care icon',
    views: 0
  }
];

function seedDB() {
  data.forEach(function(seed) {
    Subject.create(seed, function(err, subject) {
      if (err) {
        console.log(err);
      } else {
        subject.save();
      }
    });
  });
}

module.exports = seedDB;
