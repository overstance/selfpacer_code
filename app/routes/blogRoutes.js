const keys = require('../config/keys');
const butterApiKey = keys.butterApi;
const butter = require('buttercms')(butterApiKey);

const BlogDraft = require('../models/BlogDraft');
const BlogCategory = require('../models/BlogCategory');
const BlogTag = require('../models/BlogTag');

module.exports = app => {
  app.get('/api/blog_posts', async (req, res) => {
    const response = await butter.post.list({ page: 1, page_size: 10 });
    // console.log(response.data);
    res.send({ posts: response.data });
  });

  app.get('/api/blog_post', async (req, res) => {
    const response = await butter.post.retrieve(req.query.slug);
    // console.log(response.data);
    res.send({ post: response.data });
  });

  app.get('/api/fetch_blog_drafts', (req, res) => {
    BlogDraft.find({}, (err, blogDrafts) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ blogDrafts: blogDrafts });
      }
    });
  });

  app.post('/api/create_blog_draft', (req, res) => {
    const newBlogDraft = {
      title: req.body.title,
      featuredImage: req.body.heroImage,
      slug: req.body.slug,
      category: req.body.category,
      tags: req.body.tags,
      author: req.body.author,
      description: req.body.description,
      content: req.body.content,
      htmlContent: req.body.htmlContent,
      createdOn: Date.now(),
      updatedOn: Date.now()
    };
    BlogDraft.create(newBlogDraft, (err, newDraft) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        newDraft.save();
        res.send({ newDraft: newDraft });
      }
    });
  });

  app.put('/api/update_blog_draft', (req, res) => {
    BlogDraft.findByIdAndUpdate(
      req.body.draftId,
      {
        title: req.body.title,
        featuredImage: req.body.heroImage,
        slug: req.body.slug,
        category: req.body.category,
        tags: req.body.tags,
        author: req.body.author,
        description: req.body.description,
        content: req.body.content,
        htmlContent: req.body.htmlContent,
        updatedOn: Date.now()
      },
      { new: true },
      (err, updatedDraft) => {
        if (err) {
          res.send({ error: err.message });
        } else {
          res.send({ updatedDraft: updatedDraft });
        }
      }
    );
  });

  app.get('/api/initialize_blog_categories', (req, res) => {
    BlogCategory.create({}, (err, categories) => {
      if (categories) {
        categories.save();
        res.send({ categories: categories });
        // console.log(categories);
      }
    });
  });

  app.get('/api/initialize_blog_tags', (req, res) => {
    BlogTag.create({}, (err, tags) => {
      if (tags) {
        tags.save();
        res.send({ tags: tags });
        // console.log(tags);
      }
    });
  });

  app.put('/api/edit_blog_categories', (req, res) => {
    BlogCategory.findByIdAndUpdate(
      req.body.id,
      { categories: req.body.categoriesArray },
      { new: true },
      (err, categories) => {
        if (err) {
          res.send({ error: error });
        } else if (categories) {
          res.send({ categories: categories });
        }
      }
    );
  });

  app.put('/api/edit_blog_tags', (req, res) => {
    BlogTag.findByIdAndUpdate(
      req.body.id,
      { tags: req.body.tagsArray },
      { new: true },
      (err, tags) => {
        if (err) {
          res.send({ error: error });
        } else if (tags) {
          res.send({ tags: tags });
        }
      }
    );
  });

  app.get('/api/fetch_blog_categories', (req, res) => {
    BlogCategory.find({}, (err, categories) => {
      if (err) {
        // console.log(err);
        res.send(err.message);
      } else if (categories && categories.length > 0) {
        let categoriesArray = categories[0];
        // console.log(categories, categoriesArray);
        res.send({ categories: categoriesArray });
      } else {
        res.send('no categories found');
        // console.log('no categories found');
      }
    });
  });

  app.get('/api/fetch_blog_tags', (req, res) => {
    BlogTag.find({}, (err, tags) => {
      if (err) {
        // console.log(err);
        res.send(err.message);
      } else if (tags && tags.length > 0) {
        let tagsArray = tags[0];
        // console.log(tags, tagsArray);
        res.send({ tags: tagsArray });
      } else {
        res.send('no tags found');
        // console.log('no tags found');
      }
    });
  });
};

/* 
function fixDigit(val){
  return val.toString().length === 1 ? "0" + val : val.toString();
};

let date = new Date();
// console.log(now.getFullYear());
let year = date.getFullYear().toString();

let month = fixDigit(date.getMonth() + 1);

let day = fixDigit(date.getDate());

var options = { month: 'long'};
let monthInLetter =new Intl.DateTimeFormat('en-US', options).format(date);

let displayDate = monthInLetter + ' ' + day + ', ' + year;

console.log(year, month, monthInLetter, day, displayDate);
*/
