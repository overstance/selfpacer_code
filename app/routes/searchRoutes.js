const mongoose = require('mongoose');

const Resource = require('../models/Resource');
const Subject = require('../models/Subject');
const Collection = require('../models/Collection');

module.exports = app => {
  app.get('/api/deploy_search', (req, res) => {
    let searchString = req.query.searchString;
    let searchFilter = req.query.searchFilter;
    let checkForSkill = false;
    checkForResourceTypes = [];
    let checkForCollection = false;

    // console.log(searchString, searchFilter);

    if (searchFilter) {
      checkForSkill = searchFilter.find(filterValue => filterValue === 'skill');
      checkForResourceTypes = searchFilter.filter(
        filterValue =>
          filterValue === 'books' ||
          filterValue === 'mooc' ||
          filterValue === 'youtube'
      );

      let checkForYoutube = checkForResourceTypes.find(
        filterValue => filterValue === 'youtube'
      );

      if (checkForYoutube) {
        checkForResourceTypes.push('youtube#video', 'youtube#playlist');
      }

      checkForCollection = searchFilter.find(
        filterValue => filterValue === 'collection'
      );
    }

    if (
      checkForCollection &&
      checkForSkill &&
      checkForResourceTypes.length > 0
    ) {
      //   console.log(checkForResourceTypes);
      Subject.find({ $text: { $search: searchString } }).exec((err, skill) => {
        if (err) {
          res.send({ error: err.message });
        } else if (skill) {
          if (skill.length > 0) {
            let skillType = skill[0].title;
            let resourcesArray = [];
            let collectionsArray = [];
            Resource.find(
              {
                category: skillType,
                type: { $in: checkForResourceTypes }
              },
              (err, resources) => {
                if (err) {
                  res.send({ searchResult: skill });
                } else if (resources) {
                  resourcesArray = resources;

                  Collection.find({
                    description: skillType,
                    public: true
                  }).exec((err, collections) => {
                    if (err) {
                      res.send({ searchResult: resources });
                    } else if (collections) {
                      collectionsArray = collections;
                      let allResults = [...resourcesArray, ...collectionsArray];

                      res.send({ searchResult: allResults });
                    }
                  });
                }
              }
            );
          } else {
            res.send({ searchResult: skill });
          }
        }
      });
    } else if (checkForSkill && checkForResourceTypes.length > 0) {
      //   console.log(checkForResourceTypes);
      Subject.find({ $text: { $search: searchString } }).exec((err, skill) => {
        if (err) {
          res.send({ error: err.message });
        } else if (skill) {
          if (skill.length > 0) {
            let skillType = skill[0].title;
            Resource.find(
              {
                category: skillType,
                type: { $in: checkForResourceTypes }
              },
              (err, resources) => {
                if (err) {
                  res.send({ error: err.message });
                } else {
                  res.send({ searchResult: resources });
                }
              }
            );
          } else {
            res.send({ searchResult: skill });
          }
        }
      });
    } else if (checkForSkill) {
      Subject.find({ $text: { $search: searchString } }).exec((err, skill) => {
        if (err) {
          res.send({ error: err.message });
        } else {
          res.send({ searchResult: skill });
        }
      });
    } else {
      res.send({ error: 'error driving development' });
    }
  });
};
