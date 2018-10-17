const mongoose = require('mongoose');
const Subject = require('./models/Subject');

const data = [
  {
    title: 'Food',
    category: 'Creative',
    src: '/images/utensils.svg',
    alt: 'food icon',
    views: 0,
    to: '/explore/food',
    paths: [
      'Baking and Pastry',
      'Indian Cooking',
      'Wine Making',
      'Japanese Cooking',
      'Chinese Cooking',
      'Vegan Cooking',
      'Italian Cooking',
      'African Cooking'
    ],
    curriculum: [
      'Food Safety',
      'Culinary Fundamentals',
      'Meat Identification, Fabrication, and Utilization',
      'Seafood Identification and Fabrication',
      'Modern Banquet Cookery',
      'Introduction to À La Carte Cooking',
      'High-Volume Production Cookery',
      'Garde Manger',
      'Cuisines and Cultures',
      'Wine Studies',
      'Introduction to Hospitality and Customer Service',
      'Restaurant Cooking',
      'Contemporary Hospitality and Service',
      'Baking and Pastry Techniques',
      'Baking Ingredients and Equipment Technology',
      'Principles of Design',
      'Café Savory Foods Production',
      'Basic and Classical Cakes',
      'Hearth Breads and Rolls',
      'Confectionery Art and Special Occasion Cakes',
      'Chocolate and Confectionery Technology and Techniques',
      'Contemporary Cakes and Desserts',
      'Specialty Breads',
      'Advanced Baking Principles',
      'Café Operations',
      'Beverages and Customer Service',
      'Restaurant and Production Desserts',
      'Restaurant Operations'
    ]
  },
  {
    title: 'Beauty',
    category: 'Creative',
    src: '/images/spa.svg',
    alt: 'Spa icon',
    views: 0,
    to: '/explore/beauty',
    paths: [
      'Makeup Artistry',
      'Nail Art',
      'Skincare',
      'Hair Styling',
      'Body and Facial Massage'
    ],
    curriculum: [
      'Hair Design',
      'Client consultation and safety',
      'Basic and dimensional color',
      'Texture services',
      'Skincare and facials',
      'Manicures and pedicures',
      'Special occasion styling',
      'Wax for the face and body',
      'Makeup application',
      'Skin analysis and skin types',
      'Cosmetic chemistry and the pH scale',
      'Chemical peels and exfoliation',
      'Makeup application',
      'Waxing for the face and body',
      'Nails',
      'Acrylic Nails',
      'Nail disorders and diseases',
      'Anatomy and Physiology',
      'Nail Art'
    ]
  },
  {
    title: 'Painting',
    category: 'Creative',
    src: '/images/paint-brush.svg',
    alt: 'painting icon',
    views: 0,
    to: '/explore/painting',
    paths: ['Digital Painting', 'Traditional painting'],
    curriculum: [
      'Art History',
      'Painting beyond Observation',
      'Painting after the Photograph',
      'Image & Form',
      'Reproducibility: 2D or 3D',
      'Aesthetics, Style, and Content',
      'The Role of Artist as Producer',
      'Digital Color',
      'Material Color',
      'Principals of Design',
      'Drawing Fundamentals'
    ]
  },
  {
    title: 'Drawing',
    category: 'Creative',
    src: '/images/drafting-compass.svg',
    alt: 'drawing icon',
    views: 0,
    to: '/explore/drawing',
    paths: [
      'General drawing',
      'Figure drawing',
      'Comic drawing',
      'Technical drawing'
    ],
    curriculum: [
      'Art History',
      'Drawings Fundamentals',
      'Drawing beyond Observation',
      'Comics',
      'Figure drawing and anatomy',
      'Image & Form',
      'Representation and abstraction',
      'Reproducibility: 2D OR 3D',
      'Aesthetics, Style & Content',
      'Drawing Materials and Techniques',
      'Hybrid Approaches to Drawing: Mixed and Digital Media',
      'The Role of the Artist as Producer'
    ]
  },
  {
    title: 'Photography',
    category: 'Creative',
    src: '/images/camera-retro.svg',
    alt: 'Photography icon',
    views: 0,
    to: '/explore/photograpghy',
    paths: [
      'Potrait photograhpy',
      'Street photography',
      'Event photography',
      'Nature photography',
      'Product photography',
      'Drone photography',
      'Architecture photography',
      'Food Photography',
      'Underwater photograph'
    ],
    curriculum: [
      'History of Photography',
      'Introduction to Photography',
      'Digital Photo Imaging',
      'Lighting fundamentals',
      'Color Concepts and Post-Production',
      'Visual Thinking'
    ]
  },
  {
    title: 'Video',
    category: 'Creative',
    src: '/images/video.svg',
    alt: 'video icon',
    views: 0,
    to: '/explore/video',
    paths: [
      'Cinematography',
      'Videography',
      'Video editing',
      'Visual effects',
      'Sound design'
    ],
    curriculum: [
      'Introduction to Photography',
      'Digital Photo Imaging',
      'Moving Image',
      'Lighting fundamentals',
      'Color Concepts and Post-Production',
      'Visual Thinking',
      'Introduction to Sound',
      'Cinematic Sound',
      'Lighting and Cinematography',
      'Directing Actors for Film and Video'
    ]
  },
  {
    title: 'Creative Writing',
    category: 'Creative',
    src: '/images/edit.svg',
    alt: 'Writing icon',
    views: 0,
    to: '/explore/creative-writing',
    paths: [
      'Copywriting',
      'Blogging',
      'Fiction writing',
      'Screenwriting',
      'Podcasting',
      'Journalism'
    ],
    curriculum: [
      'Media law and ethics',
      'Online journalism',
      'Introduction to reporting',
      'Screen language',
      'Storytelling for film & television'
    ]
  },
  {
    title: 'Communications',
    category: 'Creative',
    src: '/images/micropphone-alt.svg',
    alt: 'Communication icon',
    views: 0,
    to: '/explore/communications',
    paths: ['Public speaking', 'Public relations'],
    curriculum: [
      'Foundations of human communication',
      'Introduction to communication writing',
      'Understanding media',
      'Mass communication research',
      'Principles and practice of public relation',
      'Media relations',
      'Professional presentation',
      'Corporate communication',
      'Public relations in non-profit settings',
      'Law of communication',
      'Investor relations',
      'Interactive marketing communication',
      'Managing corporate crises and issues',
      'Public relations ethics',
      'Writing for multimedia'
    ]
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
    title: 'Motion graphics',
    category: 'Creative',
    src: '/images/blur.svg',
    alt: 'Motion graphics icon',
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
