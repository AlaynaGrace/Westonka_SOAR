/**
 * We configure our instance of passport in this file.
 * We must specify:
 * (1) How the user will be serialized (i.e., what data will be made
 * available in a session)
 * (2) How the user will be deserialized (i.e., how do we find the user based
 * on the data available in our session)
 *
 * In addition, we define our authentication strategy in this file.
 *
 * @module auth/passport
 */
 /** ---------- REQUIRE NODE MODULES ---------- **/
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
// var gooogleStrategy = require('passport-google-oauth').OAuth2Strategy;
/** ---------- REQUIRE CUSTOM APP MODULES ---------- **/
var config = require('../config/auth.js');

// all db queries moved to a service layer, necessary for proper unit testing
var UserService = require('../services/user');
/** ---------- PASSPORT SESSION SERIALIZATION ---------- **/

// serialize the user onto the session
passport.serializeUser(function (user, done) {
  console.log('this is the user in passport.serializeUser', user);
  done(null, user.id);
});

// deserialize the user from the session and provide user object
passport.deserializeUser(function (id, done) {
  console.log("I am in the deserializeUser function, with this id", id);
  UserService.findUserById(id, function (err, user) {
    // console.log('this is the user',user);
    if (err) {
      // console.log('there was an error but hopefully i will be done');
      console.log(err);
      return done(err); //getting rid of "return"
    }
    else{ //added an else
      // console.log('actually there were no errors so I am here');
      console.log('im deserialzing this id',user.id);
      return done(null, user); //getting rid of "return"
    }
  });
});
/** ---------- PASSPORT STRATEGY DEFINITION ---------- **/
passport.use('google', new GoogleStrategy({
  // identify ourselves to Google and request Google user data
  clientID: config.googleAuth.clientId,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL: config.googleAuth.callbackUrl,
}, function (token, refreshToken, profile, done) {
  // Google has responded
  console.log('google responded');
  // does this user exist in our database already?
  UserService.findUserByGoogleId(profile.id, function (err, user) {
      if (err) {
        console.log('there was an error finding the user by google id',err);
        return done(err);
      }

      else if (user) { // user does exist!
        console.log('this is the user',user);
        return done(null, user);
      }
      else{
        // user does not exist in our database, let's create one!
        UserService.createGoogleUser(profile.id, token, profile.displayName,
          profile.emails[0].value, /* we take first email address */
          function (err, user) {
            if (err) {
              return done(err);
            }

            return done(null, user);
          });
      }

    });

}));

module.exports = passport;
