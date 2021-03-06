const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


const googleRoutes = require('./routes/auth/googleRoutes');
const githubRoutes = require('./routes/auth/githubRoutes');
const authRoutes = require('./routes/api/userRoutes');


require('./passport/passportSetup')(passport);
require('./passport/passportLocal')(passport);
require('./passport/passportGoogle')(passport);
require('./passport/passportGithub')(passport);
require('./models/User');

const keys = require('./config/keys');

const app = express();

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport config
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.secretKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth/google', googleRoutes);
app.use('/auth/github', githubRoutes);
app.use('/api/users', authRoutes);
app.use('/api/events', require('./routes/api/eventRoutes'));



// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));



module.exports = app;