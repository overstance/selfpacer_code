const keys = require('../config/keys');
const butterApiKey = keys.butterApi;
const butter = require('buttercms')(butterApiKey);

const BlogDraft = require('../models/BlogDraft');

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
    /* const newBlogDraft = {
      title: req.body.title,
      content: req.body.content,
      createdOn: Date.now(),
      updatedOn: Date.now()
    }; */
    BlogDraft.findByIdAndUpdate(
      req.body.draftId,
      {
        title: req.body.title,
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
};
