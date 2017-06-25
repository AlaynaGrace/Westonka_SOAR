/**
 * Handles requests for teacher view data.
 * @module private/teacher
 */

 var express = require('express');
 var app = express();
 var router = express.Router();
 var path = require('path');
 var bodyParser = require('body-parser');
 var pool = require('../../modules/pool.js');
 var arrayToSend = [];
 var resultsArray = [];



router.post('/', function (req, res) {
  console.log('req.body on server /teacher', req.body.email);
  var userEmail = req.body.email;
  var userHomeroom = req.body.homeroom;
  var arrayToSend = [];

  pool.connect(function ( err, connection, done){
    if (err) {
      console.log(err);
      res.send( 400 );
    } else{
      resultsArray = [];
    console.log('connected to db');
    // var resultSet = connection.query("SELECT * FROM slips JOIN users ON slips.student_id = users.id WHERE homeroom_id =$1", [userHomeroom]);
    var resultSet = connection.query('SELECT users.name, count(users.id) from slips JOIN users on slips.student_id = users.id where homeroom_id = 123 group by users.id');
    // var nullSet = connection.query('SELECT users.id, users.name from slips right JOIN users on slips.student_id = users.id where homeroom_id = 123 AND slips.id IS NULL AND users.teacher = false group by users.id');
    resultSet.on('row', function(row){
      // resultsArray.push(row);
      resultsArray.push(row);
      console.log('this is resultsArray', resultsArray);
    });
    resultSet.on('end', function(){
      for (var i = 0; i < resultsArray.length; i++) {
        var stName = resultsArray[i].name;
        var stCount = resultsArray[i].count;
        var studentObj = {
          name: stName,
          count: stCount
          };
        arrayToSend.push(studentObj);
      }


      console.log('namesArray', arrayToSend);
      res.send(arrayToSend);
      done();
      });
    }
  });
}); // end router.get






router.get('/random/:homeroom',function(req,res){
  router.get('/random',function(req,res){
    var today = new Date();
    var weekAgo = new Date(myDate.getTime() - (60*60*24*7*1000));
    pool.connect(function(err,connection,done){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }
      else{
        connection.query('SELECT * FROM slips JOIN users ON slips.student_id = users.id WHERE date_entered > $1 AND date_entered < $2 AND homeroom_id=$3', [weekAgo,today,req.params.homeroom], function(err,results){
          done();
          if(err){
            console.log(err);
            res.sendStatus(500);
          }
          else{
            res.send(results.rows);
          }
        });
      }
    });
  });
});

module.exports = router;

// var userArray = [];
// resultSet.on('row', function(row){
//  userArray.push(row);
//  for (var i = 0; i < userArray.length; i++) {
//    var classObjects = userArray[i];
//    var studentNames = studentObjects.name;
//    namesArray.push(studentNames);
// }
// }); //end on row
// resultSet.on('end', function(){
// done();
// // console.log('userArray', userArray);
// console.log('!!!studentNames', slipsArray);
// res.send(userArray);
// });
// }//end else
// });// end pool connect
//
//
// });
