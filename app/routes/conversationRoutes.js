const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');
const Opinion = require('../models/Opinion');

module.exports = app => {
  app.get('/api/fetch_conversations', (req, res) => {
    let query = Conversation.find({}).sort({ startDate: -1 });

    query.exec((err, conversations) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ conversations: conversations });
      }
    });
  });

  app.post('/api/start_new_conversation', (req, res) => {
    let currentDate = new Date();
    let closingDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    );
    let newConversation = {
      startDate: new Date(),
      closingDate: closingDate,
      topic: req.body.topic,
      type: req.body.type,
      initiator: req.body.initiator,
      initiatorId: req.body.initiatorId
    };

    Conversation.create(newConversation, (err, conversation) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        conversation.save();
        res.send({ conversation: conversation });
      }
    });
  });

  app.get('/api/fetch_opinions', (req, res) => {
    let pageOptions = {
      page: req.query.pageIndex || 0,
      limit: 10
    };
    let query = Opinion.find({
      conversationId: req.query.conversationId
    })
      .skip(pageOptions.page * pageOptions.limit)
      .sort({ postDate: -1 })
      .limit(pageOptions.limit);

    query.exec((err, opinions) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send({ opinions: opinions });
      }
    });
  });

  app.post('/api/post_opinion_text', (req, res) => {
    let newOpinionText = {
      postDate: new Date(),
      conversationId: req.body.conversationId,
      opiner: req.body.opiner,
      opinerId: req.body.opinerId,
      type: 'text',
      text: req.body.opinionText
    };

    Opinion.create(newOpinionText, (err, postedOpinionText) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        postedOpinionText.save();
        res.send({ postedOpinionText: postedOpinionText });
      }
    });
  });

  app.post('/api/post_opinion_link', (req, res) => {
    let newOpinionLink = {
      postDate: new Date(),
      conversationId: req.body.conversationId,
      opiner: req.body.opiner,
      opinerId: req.body.opinerId,
      type: 'link',
      linkUrl: req.body.linkUrl,
      linkDescription: req.body.linkUrl
    };

    Opinion.create(newOpinionLink, (err, postedOpinionLink) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        postedOpinionLink.save();
        res.send({ postedOpinionLink: postedOpinionLink });
      }
    });
  });
};
