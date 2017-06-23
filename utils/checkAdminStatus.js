module.exports = function (req, res, next) {

  // if user is authenticated in the session, complete the request
  if (req.user.admin === true) {
    return next();
  } else {
    // if user is not authenticated, send an error message
    if(!req.user.admin && req.user.teacher){
      res.redirect('/#!/teachers'); // they made it!
    }
    else{
      res.redirect('/#!/students'); // they made it!
    }
  }

};
