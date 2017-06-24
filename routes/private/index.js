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

var isAdmin = require('../../utils/checkAdminStatus');
var isTeacher = require('../../utils/checkTeacherStatus');
var isStudent = require('../../utils/checkStudentStatus');


/** ---------- SUBROUTES ---------- **/
router.use('/teacher', isTeacher, teacher);
router.use('/admin', isAdmin, admin);
router.use('/student', isStudent, student);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  if(req.user.admin && !req.user.teacher){
    res.redirect('/#!/admins'); // they made it!
  }
  else if(!req.user.admin && req.user.teacher){
    res.redirect('/#!/teachers'); // they made it!
  }
  else{
    res.redirect('/#!/students'); // they made it!
  }
});

module.exports = router;
