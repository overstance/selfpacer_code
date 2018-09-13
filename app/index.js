const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());

app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
