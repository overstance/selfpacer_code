const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');

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
};
