const express = require('express')
const passport = require('passport')
const router = express.Router()


router.get('/steam',
  passport.authenticate('steam'),
  function (req, res) {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/steam');
  });

module.exports = router;