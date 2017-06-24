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




router.post('/', function (req, res) {
  console.log('req.body on server /teacher', req.body.email);
  var userEmail = req.body.email;
  var userHomeroom = req.body.homeroom;
  var namesArray = [];

  pool.connect(function ( err, connection, done){
    if (err) {
      console.log(err);
      res.send( 400 );
    } else{
    console.log('connected to db');
    var resultSet = connection.query("SELECT * FROM slips JOIN users ON slips.student_id = users.id WHERE homeroom_id =$1", [userHomeroom]);
    resultSet.on('row', function(row){
      // console.log('are you running', row);
      namesArray.push(row);
    });
    resultSet.on('end', function(){
      console.log('namesArray', namesArray);
      res.send(namesArray);
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
