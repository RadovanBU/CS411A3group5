const express = require('express');
const router = express.Router();

const fetch = require("node-fetch");
const db = require('../mongo/mongo');


router.get('/', function(req,res,next){
    res.render('redditAPI', {titleReddit: 'Reddit Section', reddit_p: "the reddit section"});
    console.log(res.body.gamename);


});

router.route('/')
    .get(function(req,res,next){
        res.send(`The Game input is ${req.params.gameID}`);

    })

    .post(function(req,res,next){
        const gamevar = req.body.gameName;



        fetch("http://www.reddit.com/subreddits/search.json?q=" + gamevar + "&sort=new")
            .then(response => {
                return response.json();
            })
            .then(json => {
                lenvar =  json.data.children.length;
                for (let i = 0; i<lenvar;i++){
                    console.log(json.data.children[i].data.display_name_prefixed);



                }
            })
            .catch(err => {
                res.render('index',{title:"An error has occured"});
            })

    })

    .put(function (req,res,next){
    res.send(`The input is ${req.params.game}`)


})


router.get('/register', function(req,res,next){

    console.log("here!");

});
module.exports = router;