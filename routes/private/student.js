/**
 * Provides basic route for student view
 *
 * @module routes/private student
 */


var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

//pg database
var pool = require('../../modules/pool');
// var pool = new pg.Pool(config);


router.get('/',function(req,res){
  console.log('in student slips');
  var studentSlips = [];

  pool.connect(function (err, connection, done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      console.log('connected to db');
      // var resultSet = connection.query('SELECT * FROM users JOIN slips ON user.id=slips.student_id');
        var resultSet = connection.query('SELECT * FROM slips WHERE id = 1');
      resultSet.on('row', function(row){
        console.log('are you running', row);
        studentSlips.push(row);
      });
      resultSet.on('end', function(){

        console.log('student slips', studentSlips);
        res.send(studentSlips);

        done();
      });
    }
  });
  // res.send(200);
}); // end router.get


router.post('/', function(req,res){
console.log('in student post');
// var data = req.body;
// pool.connect(function(err, connection, done){
//   if(err){
//     console.log(err);
//     res.send(400);
//   }
//   else{
//     connection.query( 'INSERT INTO slips (slip_number, s, o, a, r, date_entered, student_id) VALUES ($1, $2, $3, $4, $5, $6, $7) ');
//     done();
//     res.send(200);
//   }
// });
});// end router.post

module.exports = router;
