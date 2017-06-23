/**
 * Provides basic route for admin view
 *
 * @module routes/private admin
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

var pool = require('../../modules/pool');

// GET Admin
router.get('/:group', function (req, res) {
  console.log('in admin server route: ', req.params);
  pool.connect(function ( err, connection, done){

    if (err) {
      res.send( 400 );
    } else {
      console.log('inside else adminjs');
      //replace this with actualy query
      var resultSet = connection.query("SELECT name FROM users JOIN homerooms ON users.homeroom_id=homerooms.id WHERE identifier in " + req.params.group);
         var userArray = [];
        resultSet.on('row', function(row){
          // console.log('this is the row: ', row);
        userArray.push(row);

      }); //end on row
        resultSet.on('end', function(){

        // console.log('user array: 'userArray);
        res.send( userArray);
            done();
      });
    }//end else
  });// end pool connect

  // res.sendStatus(200);

});

router.get('/',function(req,res){
  console.log('in student slips');
  var allSchoolSlips = [];

  pool.connect(function (err, connection, done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      console.log('connected to db');
      var resultSet = connection.query('SELECT * FROM users JOIN slips ON users.id=slips.student_id');
        
      resultSet.on('row', function(row){
        // console.log('are you running', row);
        allSchoolSlips.push(row);
      });
      resultSet.on('end', function(){

        console.log('all School Slips', allSchoolSlips);
        res.send(allSchoolSlips);

        done();
      });
    }
  });
  // res.send(200);
}); // end router.get

router.get('/random',function(req,res){
  var today = new Date();
  var weekAgo = new Date(myDate.getTime() - (60*60*24*7*1000));
  pool.connect(function(err,connection,done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      connection.query('SELECT * FROM slips WHERE date_entered > $1 AND date_entered < $2', [weekAgo,today], function(err,results){
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

module.exports = router;
