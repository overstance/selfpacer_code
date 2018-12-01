const mongoose = require('mongoose');
const Resource = require('../models/Resource');

/* const data = [
  {
    title: 'Accounting full course',
    img: 'https://i.ytimg.com/vi/ZkZ6Q67Q15E/default.jpg',
    link: 'https://www.youtube.com/results?search_query=PL301238C9BC6E0B83',
    likes: 0,
    dislikes: 0,
    isAdmin: true
  },
  {
    title: 'Accounting full course',
    img: 'https://i.ytimg.com/vi/ZkZ6Q67Q15E/default.jpg',
    link: 'https://www.youtube.com/results?search_query=PL301238C9BC6E0B83',
    likes: 0,
    dislikes: 0,
    isAdmin: true
  },
  {
    title: 'Accounting full course',
    img: 'https://i.ytimg.com/vi/ZkZ6Q67Q15E/default.jpg',
    link: 'https://www.youtube.com/results?search_query=PL301238C9BC6E0B83',
    likes: 0,
    dislikes: 0,
    isAdmin: true
  },
  {
    title: 'Accounting full course',
    img: 'https://i.ytimg.com/vi/ZkZ6Q67Q15E/default.jpg',
    link: 'https://www.youtube.com/results?search_query=PL301238C9BC6E0B83',
    likes: 0,
    dislikes: 0,
    isAdmin: true
  },
  {
    title: 'Accounting',
    img: 'https://i.ytimg.com/vi/ZkZ6Q67Q15E/default.jpg',
    link: 'https://www.youtube.com/results?search_query=PL301238C9BC6E0B83',
    likes: 0,
    dislikes: 0
  },
  {
    title: 'Accounting course',
    img: 'https://i.ytimg.com/vi/ZkZ6Q67Q15E/default.jpg',
    link: 'https://www.youtube.com/results?search_query=PL301238C9BC6E0B83',
    likes: 0,
    dislikes: 0
  }
]; */

const data = [
  {
    title: 'Accounting full course',
    img: 'https://i.ytimg.com/vi/IL_egHqaU3s/default.jpg',
    link: 'https://www.youtube.com/results?search_query=PL301238C9BC6E0B83',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#playlist',
    videocount: 39
  },
  {
    title: 'accounting Khan Academy',
    img: 'https://i.ytimg.com/vi/cHzCOA3b9So/default.jpg',
    link:
      'https://www.youtube.com/results?search_query=PLuDogk1rsivCeUWyWrHm1y1sBs2n7QeVL',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#playlist',
    videocount: 146
  },
  {
    title: 'Managerial Accounting - Relevant Costs for Short Term Decisions',
    img: 'https://i.ytimg.com/vi/S4BTgdcrFL8/default.jpg',
    link:
      'https://www.youtube.com/results?search_query=PLnxFTRWqUJUuSGpUvfZOzbfu_K2HS6c22',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#playlist',
    videocount: 13
  },
  {
    title: 'Strategic Management Control Systems',
    img: 'https://i.ytimg.com/vi/j34otrXr-RQ/default.jpg',
    link:
      'https://www.youtube.com/results?search_query=PLRFN7dMESvQTnxNuX0e94ynXK9yim9qb3',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#playlist',
    videocount: 47
  },
  {
    title: 'accounting 101, accounting overview, basics, and best practices',
    img: 'https://i.ytimg.com/vi/YjkRSlTxsZM/default.jpg',
    link: 'https://www.youtube.com/results?search_query=YjkRSlTxsZM',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#video',
    youtubeviews: '1852',
    youtubelikes: '33'
  },
  {
    title:
      'Excel for Accounting: Formulas, VLOOKUP & INDEX, PivotTables, Recorded Macros, Charts, Keyboards',
    img: 'https://i.ytimg.com/vi/kNaxTNSAtLk/default.jpg',
    link: 'https://www.youtube.com/results?search_query=kNaxTNSAtLk',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#video',
    youtubeviews: '2999929',
    youtubelikes: '15348'
  },
  {
    title: 'Decision Making, Management Accounting by Vimal B com (H) L1',
    img: 'https://i.ytimg.com/vi/BdwiXi9cbRc/default.jpg',
    link: 'https://www.youtube.com/results?search_query=BdwiXi9cbRc',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#video',
    youtubeviews: '9852',
    youtubelikes: '112'
  },
  {
    title: 'Management Accounting By Vimal Bhatnagar B com Final L1',
    img: 'https://i.ytimg.com/vi/suzs0sCeWLc/default.jpg',
    link: 'https://www.youtube.com/results?search_query=suzs0sCeWLc',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#video',
    youtubeviews: '5165',
    youtubelikes: '59'
  },
  {
    title:
      'Introduction to Corporate Finance - FREE Course | Corporate Finance Institute',
    img: 'https://i.ytimg.com/vi/5eGRi66iUfU/default.jpg',
    link: 'https://www.youtube.com/results?search_query=5eGRi66iUfU',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#video',
    youtubeviews: '129654',
    youtubelikes: '1460'
  },
  {
    title: 'Topic 5 - Understanding internal controls',
    img: 'https://i.ytimg.com/vi/OowV6lQn6qI/default.jpg',
    link: 'https://www.youtube.com/results?search_query=OowV6lQn6qI',
    like: 0,
    dislikes: 0,
    source: 'youtube.com',
    type: 'youtube#video',
    youtubeviews: '25117',
    youtubelikes: '165'
  }
];

function seedYoutube() {
  YoutubeAcct.remove({}, function(err) {
    if (err) {
      console.log(err);
    }

    data.forEach(function(seed) {
      YoutubeAcct.create(seed, function(err, resource) {
        if (err) {
          console.log(err);
        } else {
          resource.save();
          console.log(resource);
        }
      });
    });
  });
}

module.exports = seedYoutube;
