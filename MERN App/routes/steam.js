const express = require('express');
const router = express.Router();

const fetch = require("node-fetch");
const db = require('../mongo/mongo');
const key = require('../config/keys');

//var redditAPIresults = new Array();

db.connect(function (err, client) {
  if (err) {
    console.log(`Err ${err}`);
  }
});

router.get('/', function (req, res, next) {
  //res.render('steamAPI');

  let mongo = db.getDB();
  let steamGames = new Array();
  let redditAPIresults = new Array();

  let steemDBcall = mongo.collection("users").find({ _id: 1 }).each(function (err, result) {
    if (err) throw err;

    //steamDBcall = result;
    //console.log(steamDBcall);



    fetch("http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" + key.apiKey + "&steamid=" + result[0].steamId + "&format=json")

      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.response.total_count) {
          numGames = json.response.total_count;

          for (let i = 0; i < numGames; i++) {
            steamGames.push(json.response.games[i].name);
          }

          console.log(steamGames);

          //Reddit API Call on Steam games

          let steamLen = steamGames.length;
          for (let i = 0; i<steamLen;i++) {
            let currentGame = steamGames[i];

            let db_return = mongo.collection("games").find({"redditName": currentGame}).each(function (err, result) {

              let redditJSONsteam = result;

              //If something found in DB we use those results
              if (redditJSONsteam) {
                redditAPIresults.push(result.reddits);
              }

              //If not move onto API
              else {
                fetch("http://www.reddit.com/subreddits/search.json?q=" + currentGame + "&sort=new")
                    .then(response => {
                      return response.json();
                    })

                    .then(json => {
                      lenvar = json.data.children.length;
                      for (let i = 0; i < lenvar; i++) {
                        console.log(json.data.children[i].data.display_name_prefixed);
                        redditAPIresults.push(json.data.children[i].data.display_name_prefixed);
                      }
                    })

                    .catch(err => {
                      res.render('index', {title: "An error has occured"});
                    })
              }
            });


            // res.render('dbRes', { dbRes: `You have played ${steamGames.toString()} in the past two weeks.` });

          }

          res.render('dbRes', {dbRes: `We suggest these reddits ${redditAPIresults.toString()} `});
          //res.write('steamAPI', {steamRes: `We suggest these reddits ${redditAPIresults.toString()} ` });

        } else {
          console.log("Not enough games played on Steam")
          //res.render('dbRes', { dbRes: `You have played have not played any Steam games in the past two weeks.` });
        }
      })
    .catch(err => {
      console.log("error")
    })
  });
});



module.exports = router;