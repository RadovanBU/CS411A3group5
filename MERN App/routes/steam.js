const express = require('express');
const router = express.Router();

const fetch = require("node-fetch");
const db = require('../mongo/mongo');
const key = require('../config/keys')


db.connect(function (err, client) {
  if (err) {
    console.log(`Err ${err}`);
  }
});

router.get('/', function (req, res, next) {
  res.render('steamAPI');

  let mongo = db.getDB();
  let steamGames = new Array();

  mongo.collection("users").find({ _id: 1 }).toArray(function (err, result) {
    if (err) throw err;

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
        } else {
          console.log("Not enough games played on Steam")
        }
      })
    .catch(err => {
      console.log("error")
    })
  });
});



module.exports = router;