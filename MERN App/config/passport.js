const SteamStrategy = require('passort-steam').Strategy
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./keys')

module.exports = (passport) => {
    passport.use(new SteamStrategy({
        returnURL: keys.returnURL,
        realm: keys.realm,
        apiKey: keys.apiKey,
        profile: true // set to false to skip fetching data from the Steam Web API, removing need for API key
      },
      function(identifier, profile, done) {
          console.log(identifier)
          console.log(profile)
        // User.findByOpenID({ openId: identifier }, function (err, user) {
        //   return done(err, user);
        // });
      }
    ));
}