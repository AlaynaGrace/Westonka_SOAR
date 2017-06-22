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
router.get('/', function (req, res) {
  console.log('in admin server route');
  // pool.connect(function ( err, connection, done){

  //   if (err) {
  //     res.send( 400 );
  //   } else {
  //     //replace this with actualy query
  //     let resultSet = connection.query("SELECT * FROM slips WHERE student_id IS NOT NULL");
  //        var userArray = [];
  //       resultSet.on('row', function(row){
  //       // userArray.push(row);
  //     }); //end on row
  //       resultSet.on('end', function(){
  //       done();
  //       console.log(userArray);
  //       res.send( userArray);
  //     });
  //   }//end else
  // });// end pool connect

  res.sendStatus(200);

});

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
