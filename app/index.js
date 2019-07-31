const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
// const seedDB = require('./seed/seedSubjects');
// const seedYoutube = require('./seed/seedAccounting');
// const reSubjectMotionGraphics = require('./seed/reSubjectMotionGraphics');
// const reSubjectDatabase = require('./seed/reSubjectDatabase');
// const seedBookResource = require('./seed/seedBookResource');
// const appendIsAdmin = require('./seed/appendIsAdmin');

const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const youtubeRoutes = require('./routes/YoutubeRoutes');
const collectionsRoute = require('./routes/collectionsRoute');
const resourceRoute = require('./routes/resourceRoute');
const profileRoutes = require('./routes/profileRoutes');
const moocRoutes = require('./routes/moocRoutes');
const booksRoutes = require('./routes/booksRoute');
const blogRoutes = require('./routes/blogRoutes');
const mediaUploadRoutes = require('./routes/mediaUploadRoutes');

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
//seedYoutube();
// reSubjectMotionGraphics();
// reSubjectDatabase();
// seedBookResource();
// appendIsAdmin();

app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
    // maxAge: 0.0007 * 24 * 60 * 60 * 1.008, //1 minutes
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());

app.use(passport.session());

authRoutes(app);
subjectRoutes(app);
youtubeRoutes(app);
collectionsRoute(app);
resourceRoute(app);
profileRoutes(app);
moocRoutes(app);
booksRoutes(app);
blogRoutes(app);
mediaUploadRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
