const keys = require('../config/keys');
const butterApiKey = keys.butterApi;
const butter = require('buttercms')(butterApiKey);

module.exports = app => {
  app.get('/api/blog_posts', async (req, res) => {
    const response = await butter.post.list({ page: 1, page_size: 10 });
    // console.log(response.data);
    res.send({ posts: response.data });
  });

  app.get('/api/blog_posts/:slug', async (req, res) => {
    const response = await butter.post.retrieve(req.params.slug);
    // console.log(response.data);
    res.send({ post: response.data });
  });
};
