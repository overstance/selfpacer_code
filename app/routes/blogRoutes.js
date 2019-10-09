const mongoose = require('mongoose');
const keys = require('../config/keys');

const BlogDraft = require('../models/BlogDraft');
const BlogCategory = require('../models/BlogCategory');
const BlogTag = require('../models/BlogTag');

const User = mongoose.model('users');
const Comment = require('../models/Comment');

module.exports = app => {
  app.get('/api/blog_post', (req, res) => {
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
    })
      .select(
        'publishedOn views displayDate publishYear publishMonth publishDay featuredImage category title description slug author authorName authorTwitter'
      )
      .sort({ publishedOn: -1 })
      .limit(100);

    query.exec((err, blogs) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        // console.log(blogs);
        res.send({ blogs: blogs });
      }
    });
  });

  app.get('/api/fetch_more_blog_in_category', (req, res) => {
    let query = BlogDraft.find({
      category: req.query.category,
      status: 'published'
    })
      .select(
        'publishedOn displayDate publishYear publishMonth views publishDay featuredImage category title description slug author authorName authorTwitter'
      )
      .sort({ publishedOn: -1 })
      .limit(4);

    query.exec((err, posts) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ posts: posts });
      }
    });
  });

  app.get('/api/fetch_blog_comments', (req, res) => {
    Comment.find({ parentBlog: req.query.blogId }, (err, comments) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ comments: comments });
      }
    });
  });

  app.post('/api/post_user_comments', (req, res) => {
    function fixDigit(val) {
      return val.toString().length === 1 ? '0' + val : val.toString();
    }

    let date = new Date();

    let year = date.getFullYear().toString();

    let day = fixDigit(date.getDate());

    var options = { month: 'long' };
    let monthInLetter = new Intl.DateTimeFormat('en-US', options).format(date);

    let displayDate =
      monthInLetter + ' ' + day + ', ' + year /* + ' - ' + postTime */;

    let newComment = {
      commentDate: new Date(),
      commentText: req.body.commentText,
      displayDate: displayDate,
      type: 'mainComment',
      commentor: req.body.userId,
      commentorName: req.body.userName,
      parentBlog: req.body.blogId
    };

    Comment.create(newComment, (err, comment) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ comment: comment });
      }
    });
  });

  app.post('/api/post_user_comments_reply', (req, res) => {
    function fixDigit(val) {
      return val.toString().length === 1 ? '0' + val : val.toString();
    }

    let date = new Date();
    let year = date.getFullYear().toString();

    let day = fixDigit(date.getDate());

    var options = { month: 'long' };
    let monthInLetter = new Intl.DateTimeFormat('en-US', options).format(date);

    let displayDate = monthInLetter + ' ' + day + ', ' + year;

    let newComment = {
      commentDate: new Date(),
      commentText: req.body.commentText,
      displayDate: displayDate,
      type: 'reply',
      commentor: req.body.userId,
      commentorName: req.body.userName,
      parentBlog: req.body.blogId,
      parentComment: req.body.parentComment
    };

    Comment.create(newComment, (err, reply) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ reply: reply });
      }
    });
  });

  app.post('/api/save_blog_post', (req, res) => {
    // console.log(req.body.updatedUserSavedBlogs);
    User.findByIdAndUpdate(
      req.body.userId,
      {
        blogSaves: req.body.updatedUserSavedBlogs
      },
      { new: true },
      (err, user) => {
        if (err) {
          res.send({ error: err.message });
        } else {
          // console.log(user.blogSaves);
          res.send({ updatedBlogSaves: user.blogSaves });
        }
      }
    );
  });

  app.post('/api/unpublish_blog_post', (req, res) => {
    BlogDraft.findByIdAndUpdate(
      req.body.postId,
      {
        status: 'draft'
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

  app.get('/api/fetch_blogs_by_section', (req, res) => {
    let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
    };
    let query = BlogDraft.find({
      category: req.query.category,
      status: 'published'
    })
      .select(
        'publishedOn displayDate publishYear publishMonth views publishDay featuredImage category title description slug author authorName authorTwitter'
      )
      .skip(pageOptions.page * pageOptions.limit)
      .sort({ publishedOn: -1 })
      .limit(pageOptions.limit);

    query.exec((err, blogs) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ blogs: blogs });
      }
    });
  });

  app.get('/api/fetch_blogs_by_popularity', (req, res) => {
    let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
    };
    let query = BlogDraft.find({
      isPopular: true,
      status: 'published'
    })
      .select(
        'publishedOn displayDate publishYear publishMonth views publishDay featuredImage category title description slug author authorName authorTwitter'
      )
      .skip(pageOptions.page * pageOptions.limit)
      .sort({ publishedOn: -1 })
      .limit(pageOptions.limit);

    query.exec((err, blogs) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ blogs: blogs });
      }
    });
  });

  app.get('/api/fetch_user_blog_saves', (req, res) => {
    User.findById(req.query.userId, (err, user) => {
      if (err) {
        res.send(err.message);
      } else {
        /* let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
        }; 
      */
        const userSavedBlogs = user.blogSaves;
        let query = BlogDraft.find({
          _id: { $in: userSavedBlogs },
          status: 'published'
        })
          .select(
            'publishedOn displayDate publishYear publishMonth views publishDay featuredImage category title description slug author authorName authorTwitter'
          )
          .sort({ publishedOn: -1 });

        query.exec((err, blogs) => {
          if (err) {
            res.send({ error: err.message });
          } else {
            res.send({ blogs: blogs });
          }
        });
      }
    });
  });

  app.get('/api/fetch_blogs_by_recent', (req, res) => {
    let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
    };
    let query = BlogDraft.find({
      status: 'published'
    })
      .select(
        'publishedOn displayDate publishYear publishMonth views publishDay featuredImage category title description slug author authorName authorTwitter'
      )
      .skip(pageOptions.page * pageOptions.limit)
      .sort({ publishedOn: -1 })
      .limit(pageOptions.limit);

    query.exec((err, blogs) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ blogs: blogs });
      }
    });
  });

  app.put('/api/increase_post_viewCount', (req, res) => {
    let popularityCutoff = 100;

    if (req.body.updatedViews >= popularityCutoff) {
      BlogDraft.findByIdAndUpdate(
        req.body.postId,
        {
          views: req.body.updatedViews,
          isPopular: true
        },
        (err, post) => {
          if (err) {
            res.send({ error: err.message });
          } else {
            res.send({ successInfo: 'view count succesfully updated' });
          }
        }
      );
    } else {
      BlogDraft.findByIdAndUpdate(
        req.body.postId,
        {
          views: req.body.updatedViews
        },
        (err, post) => {
          if (err) {
            res.send({ error: err.message });
          } else {
            res.send({ successInfo: 'view count succesfully updated' });
          }
        }
      );
    }
  });

  app.put('/api/remove_saved_blog', (req, res) => {
    User.findByIdAndUpdate(
      req.body.userId,
      {
        blogSaves: req.body.updatedBlogSavesId
      },
      (err, user) => {
        if (err) {
          res.send({ error: err.name });
        } else {
          res.send({ successMessage: 'user blog saves updated' });
        }
      }
    );
  });
};
