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
  pool.connect(function ( err, connection, done){
    if (err) {
      console.log(err);
      res.send( 400 );
    } else {
      //replace this with actualy query
      // var resultSet = connection.query("SELECT * FROM users JOIN homerooms ON users.homeroom_id=homerooms.id WHERE users.email=$1 AND teacher=NULL", [userEmail]);
        var resultSet = connection.query("SELECT * from users WHERE homeroom_id=(SELECT homeroom_id from users WHERE email =$1)", [req.body.email]);
         var userArray = [];
        resultSet.on('row', function(row){
        userArray.push(row);
      }); //end on row
        resultSet.on('end', function(){
        done();
        console.log('userArray', userArray);
        res.send(userArray);
      });
    }//end else
  });// end pool connect


});

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
