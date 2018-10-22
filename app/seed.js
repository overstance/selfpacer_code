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
      'Client Consultation and Safety',
      'Basic and Dimensional Color',
      'Texture Services',
      'Skincare and Facials',
      'Manicures and Pedicures',
      'Special Occasion Styling',
      'Wax for the Face and Body',
      'Makeup Application',
      'Skin Analysis and Skin Types',
      'Cosmetic Chemistry and the PH Scale',
      'Chemical Peels and Exfoliation',
      'Makeup Application',
      'Waxing for the Face and Body',
      'Nails',
      'Acrylic Nails',
      'Nail Disorders and Diseases',
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
      'General Drawing',
      'Figure Drawing',
      'Comic Drawing',
      'Technical Drawing'
    ],
    curriculum: [
      'Art History',
      'Drawings Fundamentals',
      'Drawing beyond Observation',
      'Comics',
      'Figure drawing and anatomy',
      'Image & Form',
      'Representation and Abstraction',
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
      'Potrait Photography',
      'Street Photography',
      'Event Photography',
      'Nature Photography',
      'Product Photography',
      'Drone Photography',
      'Architecture Photography',
      'Food Photography',
      'Underwater Photography'
    ],
    curriculum: [
      'Art History',
      'Introduction to Photography',
      'Digital Photo Imaging',
      'Lighting Fundamentals',
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
    paths: ['Cinematography', 'Videography', 'Video Editing'],
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
      'Media Law and Ethics',
      'Online Journalism',
      'Introduction to Reporting',
      'Screen Language',
      'Storytelling for Film & Television',
      'Technical Writing'
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
      'Foundations of Human Communication',
      'Introduction to Communication Writing',
      'Understanding Media',
      'Mass Communication Research',
      'Principles and Practice of Public Relation',
      'Media Relations',
      'Professional Presentation',
      'Corporate Communication',
      'Public Relations in Non-profit Settings',
      'Law of Communication',
      'Investor Relations',
      'Interactive Marketing Communication',
      'Managing Corporate Crises and Issues',
      'Public Relations Ethics',
      'Writing for Multimedia'
    ]
  },
  {
    title: 'Music',
    category: 'Creative',
    src: '/images/music.svg',
    alt: 'Music icon',
    views: 0,
    to: '/explore/music',
    paths: ['Songwriting', 'Instruments', 'Voice'],
    curriculum: [
      'Music history',
      'Music Theory and Analysis',
      'Ear Training',
      'Brass',
      'Piano',
      'Guitar',
      'Harp',
      'Organ',
      'Percussion',
      'Piano',
      'Strings',
      'Woodwinds'
    ]
  },
  {
    title: 'Audio Production',
    category: 'Creative',
    src: '/images/poll.svg',
    alt: 'audio icon',
    views: 0,
    to: '/explore/audio-production',
    paths: ['Audio Production'],
    curriculum: [
      'Audio Technology',
      'Remote and Field Recording',
      'Music Fundamentals',
      'Science of Sound',
      'Audio Recording',
      'Broadcast Audio',
      'Music and Studio Business',
      'MIDI Production',
      'Digital Audio Workstations',
      'Audio Post-Production',
      'Audio Electronics',
      'Audio Engineering',
      'Studio Recording',
      'Audio Mixing',
      'Audio for Interactive Media',
      'Sound Design',
      'Streaming Media and Webcast'
    ]
  },
  {
    title: 'Web Design',
    category: 'Creative',
    src: '/images/web.svg',
    alt: 'Web design icon',
    views: 0,
    to: '/explore/web-design',
    paths: ['Web Design'],
    curriculum: [
      'PhotoImaging',
      'Visual Communication',
      'Visual Design Principles and Elements',
      'Design Thinking',
      'Typography',
      'User Interface Design'
    ]
  },
  {
    title: 'Graphic Design',
    category: 'Creative',
    src: '/images/object-group.svg',
    alt: 'Graphic design icon',
    views: 0,
    to: '/explore/graphic-design',
    paths: ['Graphic Design'],
    curriculum: [
      'PhotoImaging',
      'Visual Communication',
      'Illustration',
      'Visual Design Principles and Elements',
      'Design Thinking',
      'Typography',
      'Package Design',
      'Electronic Publishing',
      'Printing'
    ]
  },
  {
    title: 'UI/UX',
    category: 'Creative',
    src: '/images/userinterface.svg',
    alt: 'UI/UX icon',
    views: 0,
    to: '/explore/ui-ux',
    paths: ['UI/UX'],
    curriculum: [
      'PhotoImaging',
      'Visual Communication',
      'Visual Design Principles and Elements',
      'Design Thinking',
      'Typography',
      'User Interface Design',
      'Interactive Design',
      'Design Psychology'
    ]
  },
  {
    title: 'Game Design',
    category: 'Creative',
    src: '/images/dice.svg',
    alt: 'Game design icon',
    views: 0,
    to: '/explore/game-design',
    paths: ['Game design'],
    curriculum: [
      'Visual Communication',
      'Visual Design Principles and Elements',
      'Design Thinking',
      'Typography',
      'Digital Imaging',
      'Life Drawing',
      'Drawing & Anatomy',
      'Digital Storytelling',
      'Character and Object Design',
      '3D Modeling',
      'Texture Mapping',
      'Material & Lighting',
      'Game Modeling',
      'Game Production Pipeline',
      'Designing Interior Spaces and Worlds'
    ]
  },
  {
    title: 'Animation',
    category: 'Creative',
    src: '/images/keyframe.svg',
    alt: 'Animation icon',
    views: 0,
    to: '/explore/animation',
    paths: ['Animation'],
    curriculum: [
      'Visual Communication',
      'Visual Design Principles and Elements',
      'Design Thinking',
      'Typography',
      'Digital Imaging',
      'Life Drawing',
      'Drawing & Anatomy',
      'Digital Storytelling',
      'Character and Object Design',
      '3D Modeling',
      'Texture Mapping',
      'Material & Lighting',
      'Principles of Animation',
      'Introduction to Computer Animation',
      'Stop-Motion Animation',
      'Animation Pre-Production',
      'Digital Tools for Animation',
      '2D Character Animation',
      '3D Character Animation',
      'History of Animation'
    ]
  },
  {
    title: 'Fashion Design',
    category: 'Creative',
    src: '/images/cut.svg',
    alt: 'Fashion design icon',
    views: 0,
    to: '/explore/fashion-design',
    paths: ['Fashion design'],
    curriculum: [
      'Visual Communication',
      'Visual Design Principles and Elements',
      'Design Thinking',
      'Fashion Drawing, Sketching and illustration',
      'Sewing Techniques',
      'Event and Fashion Show Production',
      'Trends and Concepts in Apparel',
      'Fashion History',
      'Current Designers',
      'Textile Fundamentals',
      'Concept and Product Development',
      'Apparel and Accessory',
      'Pattern-making and draping',
      'Garment construction',
      'Computer Aided design',
      'Clothing Design',
      'Footwear Design',
      'Headwear Design'
    ]
  },
  {
    title: 'Architectural design',
    category: 'Creative',
    src: '/images/archway.svg',
    alt: 'Architectural design icon',
    views: 0,
    to: '/explore/architectural-design',
    paths: ['Architectural design'],
    curriculum: [
      'Visual Communication',
      'Visual Design Principles and Elements',
      'Design Thinking',
      'Introduction to architectural Design',
      'Interior and Exterior',
      'Materials and Fabrication',
      'Building Technology',
      'Digital Drawing, and Integrated 3D Design',
      'World Architecture',
      'Modern Architecture & Urbanism'
    ]
  },
  {
    title: 'Interior design',
    category: 'Creative',
    src: '/images/couch.svg',
    alt: 'Interior design icon',
    views: 0,
    to: '/explore/interior-design',
    paths: ['Interior design'],
    curriculum: [
      'Visual Communication',
      'Visual Design Principles and Elements',
      'Design Thinking',
      'Traditional and Computerized Design',
      'Space Planning',
      'Textiles',
      'Lighting',
      'Interior Architectural Systems',
      'Residential Design',
      'Commercial Design',
      'Institutional Design',
      'Office Design',
      'Materials and Specifications',
      'Building and Safety Codes'
    ]
  },
  {
    title: 'Motion Design/VFX',
    category: 'Creative',
    src: '/images/blur.svg',
    alt: 'Motion graphics icon',
    views: 0,
    to: '/explore/motion-design-vfx',
    paths: ['Motion Design', 'Visual Effect'],
    curriculum: [
      'Visual Communication',
      'Visual Design Principles and Elements',
      'Design Thinking',
      'Principles of Animation',
      '3D Design',
      'Maps, Mattes, and Masks',
      'Conceptual Storytelling',
      'Video for Visual Effects',
      '3D Modeling and Animation Techniques',
      'Post-Production Management',
      'Camera and Lighting Techniques',
      'Editing for Visual Effects',
      '3D Textures',
      '3D Effects',
      'Interactive Visual Design',
      'Production Studio'
    ]
  },
  {
    title: 'Marketing and Sales',
    category: 'Business',
    src: '/images/funnel-dollar.svg',
    alt: 'Marketing icon',
    views: 0,
    to: '/explore/marketing-and-sales',
    paths: ['Marketing', 'Sales'],
    curriculum: [
      'Consumer Behavior',
      'Introductory Marketing Research',
      'Marketing Strategy and Planning',
      'Retail and Distribution Management',
      'Promotion Management',
      'Personal Selling',
      'Services Marketing Management',
      'International Marketing',
      'Sports Marketing',
      'Digital Marketing'
    ]
  },
  {
    title: 'Accounting',
    category: 'Business',
    src: '/images/hand-holding-usd.svg',
    alt: 'Finance icon',
    views: 0,
    to: '/explore/accounting',
    paths: ['Accounting'],
    curriculum: [
      'Accounting Measurement and Disclosure',
      'Decision Making for Accounting',
      'Accounting Institutions and Regulations',
      'Accounting Control Systems',
      'Principles of Taxation',
      'Assurance and Attestation',
      'Auditing Standards and Practice'
    ]
  },
  {
    title: 'Management',
    category: 'Business',
    src: '/images/briefcase.svg',
    alt: 'Management icon',
    views: 0,
    to: '/explore/accounting',
    paths: [
      'Business Management',
      'Project Management',
      'Business Law',
      'Business Analytics',
      'Human Resource Management',
      'Entrepreneurship'
    ],
    curriculum: [
      'Introduction to Business',
      'Introduction to Financial Accounting',
      'Managerial Accounting',
      'Principles of Finance',
      'Principles of Marketing',
      'Business Statistics',
      'Business Law',
      'Management Information Systems',
      'Principles of Management',
      'Organizational Behavior',
      'Corporate Communication',
      'Operations Management',
      'Human Resource Management',
      'Strategic Information Technology',
      'Small Business Management',
      'Management Leadership',
      'Project Management',
      'Negotiations and Conflict Management',
      'Strategic Management',
      'E-Commerce',
      'Entrepreneurship'
    ]
  },
  {
    title: 'Real Estate',
    category: 'Business',
    src: '/images/city.svg',
    alt: 'Real estate icon',
    views: 0,
    to: '/explore/accounting',
    paths: ['Real Estate'],
    curriculum: [
      'Introduction to Business',
      'Introduction to Financial Accounting',
      'Principles of Finance',
      'Principles of Marketing',
      'Financial Economic Concepts and Tools for Real Estate',
      'Real Estate System and the Space Market',
      'Property Valuation  and Investment Analysis',
      'Real Estate Leveraging and Financing',
      'Strategic Tools for Portfolio Management',
      'Investment Analysis of Real Estate Development Projects'
    ]
  },
  {
    title: 'Customer Service',
    category: 'Business',
    src: '/images/headset.svg',
    alt: 'Customer service icon',
    views: 0,
    to: '/explore/accounting',
    paths: ['Customer Service'],
    curriculum: [
      'Interpersonal Communication',
      'Quality Customer Servicing',
      'Business Communication',
      'Teamwork Dynamics',
      'Elements of Intercultural Communication',
      'Business Organization and Management',
      'Human Relations in Business',
      'Gender and Society',
      'Leadership for Front-Line Employees'
    ]
  },
  {
    title: 'Cloud Computing',
    category: 'Technology',
    src: '/images/cloud.svg',
    alt: 'Cloud computing icon',
    views: 0
  },
  {
    title: 'Data Science',
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
    title: 'IT Support',
    category: 'Technology',
    src: '/images/headphones.svg',
    alt: 'IT support icon',
    views: 0
  },
  {
    title: 'Mobile Development',
    category: 'Technology',
    src: '/images/android.svg',
    alt: 'Mobile development icon',
    views: 0
  },
  {
    title: 'Network and Systems',
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
    title: 'Web Development',
    category: 'Technology',
    src: '/images/http.svg',
    alt: 'Web development',
    views: 0
  },
  {
    title: 'Personal Development',
    category: 'Life-style',
    src: '/images/dove.svg',
    alt: 'Personal development icon',
    views: 0
  },
  {
    title: 'Career Development',
    category: 'Life-style',
    src: '/images/certificate.svg',
    alt: 'Career development icon',
    views: 0
  },
  {
    title: 'Study Skills',
    category: 'Life-style',
    src: '/images/brain.svg',
    alt: 'Study skills icon',
    views: 0
  },
  {
    title: 'Health and Fitness',
    category: 'Life-style',
    src: '/images/heartbeat.svg',
    alt: 'Health and fitness icon',
    views: 0
  },
  {
    title: 'Teaching Training',
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
    title: 'Home Improvement',
    category: 'Life-style',
    src: '/images/home.svg',
    alt: 'Home improvement icon',
    views: 0
  },
  {
    title: 'Pet Care',
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
