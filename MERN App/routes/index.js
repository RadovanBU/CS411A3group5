const express = require('express');
const router = express.Router();

const fetch = require("node-fetch");
const db = require('../mongo/mongo');


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/redditAPI', function (req, res, next) {
  res.render('redditAPI', { titleReddit: 'Reddit Section', reddit_p: "the reddit section" });
});

module.exports = router;
