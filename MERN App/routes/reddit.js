const express = require('express');
const router = express.Router();

const fetch = require("node-fetch");
const db = require('../mongo/mongo');




db.connect(function(err,client) {
    if (err){
        console.log(`Err ${err}`);
        //return;
    }

    console.log("succ2");
});





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
        let mongo = db.getDB();
        let redditAPIsuggestions = new Array();


        //console.log(gamevar);


        let db_return = mongo.collection("games").find({"redditName":gamevar}).each(function(err,result){
            //console.log(result);
            redditJSON = result;

            if (redditJSON){
                res.render('dbRes',{dbRes:`Our Reddit Databse suggests ${result.reddits} `});
                console.log(result.reddits);
            }

            else{


                fetch("http://www.reddit.com/subreddits/search.json?q=" + gamevar + "&sort=new")
                    .then(response => {
                        return response.json();
                    })
                    .then(json => {
                        lenvar =  json.data.children.length;
                        //const redditAPIsuggestions = [￿];
                        for (let i = 0; i<lenvar;i++){
                            console.log(json.data.children[i].data.display_name_prefixed);
                            redditAPIsuggestions.push(json.data.children[i].data.display_name_prefixed);
                        }

                        res.render('dbRes',{dbRes:`Our Reddit API suggests ${redditAPIsuggestions.toString()} `});
                    })
                    .catch(err => {
                        res.render('index',{title:"An error has occuredS"});
                    })

            }
            //console.log(dbReddits);
        });

        //console.log(db_return);

        console.log("going on top API!");



        fetch("http://www.reddit.com/subreddits/search.json?q=" + gamevar + "&sort=new")
            .then(response => {
                return response.json();
            })
            .then(json => {
                lenvar =  json.data.children.length;
                for (let i = 0; i<lenvar;i++){
                    //console.log(json.data.children[i].data.display_name_prefixed);
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