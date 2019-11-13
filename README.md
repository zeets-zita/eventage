# eventage

A Full stack application using Node/Express/Mongoose for back end, React/Redux for front end & Passport for authentication.

Live Heroku deployment: https://powerful-anchorage-69004.herokuapp.com/


## Quick Start

```
# Install dependencies for server
npm install

# Install dependencies for client
npm install --prefix client

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

You will need to create a dev.js in the server config folder with

```
module.exports = {
  googleClientID: 'YOUR_OWN_GOOGLE_CLIENT_ID',
  googleClientSecret: 'YOUR_OWN_CLIENT_SECRET',
  githubClientID: 'YOUR_OWN_GITHUB_CLIENT_ID',
  githubClientSecret: 'YOUR_OWN_CLIENT_SECRET',
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretKey: 'YOUR_OWN_SECRET_KEY'
};
```
