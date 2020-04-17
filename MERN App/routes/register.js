const express = require('express');
const router = express.Router();

const fetch = require("node-fetch");
const db = require('../mongo/mongo');



router.get('/', function(req,res,next){

    //console.log("HERE1");

    res.render('Registration', {titleReddit: 'Reddit Section', reddit_p: "the register section"});

    console.log(req.body);

});

module.exports = router;