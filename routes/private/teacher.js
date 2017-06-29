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
 // var userHomeroom;



router.post('/', function (req, res) {
  console.log('req.body on server /teacher', req.body.email);
  var userEmail = req.body.email;
  var userHomeroom = req.body.homeroom;
  console.log('userHomeroom', userHomeroom);
  var arrayToSend = [];

  pool.connect(function ( err, connection, done){
    arrayToSend = [];

    if (err) {
      console.log(err);
      res.send( 400 );
    } else{
      console.log('hit else in getStudents');
      resultsArray = [];
    // console.log('connected to db');
    // var resultSet = connection.query('SELECT users.name, count(users.id) from slips JOIN users on slips.student_id = users.id where homeroom_id = $1 group by users.id', [userHomeroom]);
    var resultSet = connection.query('SELECT users.name, count(slips.id) from slips right outer JOIN users on slips.student_id = users.id where homeroom_id = $1 AND users.teacher = false group by users.id;', [userHomeroom]);
    resultSet.on('row', function(row){
      resultsArray.push(row);
      console.log('$$$$$$this is resultsArray', resultsArray);
    });
    resultSet.on('end', function(){
      for (var i = 0; i < resultsArray.length; i++) {
        var stName = resultsArray[i].name;
        var stCount = resultsArray[i].count;
        if (stCount === undefined) {
          stCount = 0;
        }
        var studentObj = {
          name: stName,
          count: stCount
          };
        arrayToSend.push(studentObj);
        }
        res.send(arrayToSend);

        done();
      });
    }
  });
}); // end router.get

// function getNullUsers (homeroom){
//   console.log('hit null users', homeroom);
//   arrayToSend = [];
//   pool.connect(function ( err, connection, done){
//   if (err) {
//     console.log(err);
//   } else{
//   console.log('connected to db');
//   var resultSet = connection.query('SELECT users.id, users.name from slips right JOIN users on slips.student_id = users.id where homeroom_id = $1 AND slips.id IS NULL AND users.teacher = false group by users.id', [homeroom]);
//   resultSet.on('row', function(row){
//     resultsArray.push(row);
//   });
//   resultSet.on('end', function(){
//     for (var i = 0; i < resultsArray.length; i++) {
//       var stName = resultsArray[i].name;
//       var stCount = resultsArray[i].count;
//       var studentObj = {
//         name: stName,
//         count: stCount
//         };
//       arrayToSend.push(studentObj);
//     }
//     console.log('arrayToSend in null', arrayToSend);
//     done();
//     });
//   }
// });
// }




router.get('/random/:homeroom',function(req,res){
  console.log('!!! hit random winners on server', req.params.homeroom);
  // router.get('/random',function(req,res){
    console.log('### hit random');
    var today = new Date();
    // var weekAgo = new Date(myDate.getTime() - (60*60*24*7*1000));
    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
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
            console.log('@@@@@@@@', results.rows);
            res.send(results.rows);
          }
        });
      }
    });
  // });
});



module.exports = router;
