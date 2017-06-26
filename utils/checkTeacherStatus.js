module.exports = function (req, res, next) {

  // if user is authenticated in the session, complete the request
  if (req.user.teacher === true) {
    return next();
  } else {
    if(req.user.admin && !req.user.teacher){
      res.redirect('/#!/admins'); // they made it!
    }
    else{
      res.redirect('/#!/students'); // they made it!
    }
  }

};
