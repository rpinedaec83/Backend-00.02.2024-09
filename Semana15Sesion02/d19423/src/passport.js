const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
import { CLIENTID, CLIENTESECRET, CALLBACKURL } from "./config";

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: CLIENTID,
    clientSecret: CLIENTESECRET,
    callbackURL: CALLBACKURL,
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));