const SteamStrategy = require('passport-steam').Strategy
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./keys')
const db = require('../mongo/mongo');

db.connect(function (err, client) {
  if (err) {
    console.log(`Err ${err}`);
  }
});

module.exports = (passport) => {
  passport.use(new SteamStrategy({
    returnURL: keys.returnURL,
    realm: keys.realm,
    apiKey: keys.apiKey,
    profile: true
  },

    function (identifier, profile, done) {
      process.nextTick(function () {
        let mongo = db.getDB();
        try {
          mongo.collection("users").drop();
          console.log(profile._json.steamid)
          mongo.collection("users").insert({ _id: 1, steamId: profile._json.steamid })
        } catch (e) {
          console.log(e);
        }
        return done(null, profile._json.steamid);
      });
    }));
}