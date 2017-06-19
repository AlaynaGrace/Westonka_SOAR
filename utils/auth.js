/**
 * Middleware that checks if a user is authenticated.
 * NOTE: Does not handle authorization.
 *
 * @module utils/auth
 */
module.exports = function (req, res, next) {

  // if user is authenticated in the session, complete the request
  if (req.isAuthenticated()) {
    // console.log('what is next? next is...',next);
    // console.log("i am in utils auth.js with this req",req);
    console.log("I think I have a user in auth.js",req.user);
    return next();
  } else {
    // if user is not authenticated, send an error message
    res.json({ err: 'User is not authenticated' });
  }

};
