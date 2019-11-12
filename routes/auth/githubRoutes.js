const express = require('express');
const passport = require('passport');

const User = require('../../models/User');

const router = express.Router();

// @route  GET auth/github/
// @desc   Register user with Github Oauth
// @access Public
router.get(
    '/',
    passport.authenticate('github', {
    scope:['profile','email'],
    prompt: 'select_account'
  })
);

// @route  GET auth/github/callback
// @desc   Login user with Github Oauth
// @access Private
router.get('/callback', passport.authenticate('github'), (req, res) => {
    res.redirect('/dashboard');
});


module.exports = router;
