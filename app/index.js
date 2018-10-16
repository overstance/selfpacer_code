const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const seedDB = require('./seed');
require('./models/User');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

//mongoose.Promise = global.Promise;
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true
  }
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//seedDB();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());

app.use(passport.session());

authRoutes(app);
subjectRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
