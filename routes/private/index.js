/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var calendar = require('./calendar');

/** ---------- SUBROUTES ---------- **/
router.use('/calendar', calendar);

/**
 * GET private/index
 */
router.get('/', function (req, res) {
  console.log('I am in a random route in private index.js');
  console.log('I have a user I think', req.user);
  // res.send(req.user);
  res.redirect('/'); // they made it!
});

module.exports = router;
