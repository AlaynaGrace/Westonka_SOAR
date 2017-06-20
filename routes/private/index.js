/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();

var teacher = require('./teacher');
var admin = require ('./admin');
var student = require ('./student');

/** ---------- SUBROUTES ---------- **/
router.use('/teacher', teacher);
router.use('/admin', admin);
router.use('/student', student);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
