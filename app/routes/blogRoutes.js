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
    // const response = await butter.post.retrieve(req.query.slug);
    // console.log(response.data);
    BlogDraft.findOne(
      {
        publishYear: req.query.year,
        publishMonth: req.query.month,
        publishDay: req.query.day,
        slug: req.query.slug,
        status: 'published'
      },
      (err, post) => {
        if (err) {
          res.send({ error: err.message });
        } else {
          res.send({ post: post });
        }
      }
    );
  });

  app.get('/api/fetch_blog_drafts', (req, res) => {
    BlogDraft.find({ status: 'draft' }, (err, blogDrafts) => {
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
      authorName: req.body.authorName,
      authorTwitter: req.body.authorTwitter,
      description: req.body.description,
      content: req.body.content,
      htmlContent: req.body.htmlContent,
      editorInChargeId: req.body.editorInChargeId,
      editorInChargeName: req.body.editorInChargeName,
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
        authorName: req.body.authorName,
        authorTwitter: req.body.authorTwitter,
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

  app.delete('/api/delete_blog_draft', (req, res) => {
    BlogDraft.findByIdAndDelete(req.query.id, (err, draft) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send('Draft Deleted');
      }
    });
  });

  app.put('/api/publish_blog_draft', (req, res) => {
    if (req.body.publishedOn === undefined || req.body.publishedOn === null) {
      function fixDigit(val) {
        return val.toString().length === 1 ? '0' + val : val.toString();
      }

      let date = new Date();
      // console.log(now.getFullYear());
      let year = date.getFullYear().toString();

      let month = fixDigit(date.getMonth() + 1);

      let day = fixDigit(date.getDate());

      var options = { month: 'long' };
      let monthInLetter = new Intl.DateTimeFormat('en-US', options).format(
        date
      );

      let displayDate = monthInLetter + ' ' + day + ', ' + year;
      BlogDraft.findByIdAndUpdate(
        req.body.id,
        {
          publishedOn: date,
          publishYear: year,
          publishMonth: month,
          publishDay: day,
          displayDate: displayDate,
          status: 'published'
        },
        { new: true },
        (err, draft) => {
          if (err) {
            res.send({ error: err.message });
          } else if (draft) {
            // console.log(draft);
            res.send({ publishedDraft: draft });
          }
        }
      );
    } else {
      BlogDraft.findByIdAndUpdate(
        req.body.id,
        {
          status: 'published'
        },
        { new: true },
        (err, draft) => {
          if (err) {
            res.send({ error: err.message });
          } else if (draft) {
            res.send({ publishedDraft: draft });
          }
        }
      );
    }
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

  app.get('/api/fetch_featured_blogs', (req, res) => {
    let query = BlogDraft.find({
      tags: 'Featured',
      status: 'published'
    }).select(
      'publishedOn publishYear publishMonth publishDay featuredImage category title description slug author authorName authorTwitter'
    );

    query.exec((err, blogs) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        // console.log(blogs);
        res.send({ blogs: blogs });
      }
    });
  });
};
