"use strict";

var _config = require("./config");
var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(new GoogleStrategy({
  clientID: _config.CLIENTID,
  clientSecret: _config.CLIENTESECRET,
  callbackURL: _config.CALLBACKURL,
  passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));