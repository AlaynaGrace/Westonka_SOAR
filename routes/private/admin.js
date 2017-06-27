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
  console.log('in admin server route: ', req.params.group);
  pool.connect(function ( err, connection, done){

    if (err) {
      res.send( 400 );
    } else {
      console.log('inside else adminjs');
      //replace this with actualy query
      connection.query("SELECT * FROM slips JOIN users on slips.student_id=users.id JOIN homerooms ON users.homeroom_id=homerooms.id WHERE identifier in " + req.params.group, function(err, result){
        done();
        if(err){
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log('results: ', result.rows);
          res.send(result.rows);
        }
      });
        //  var userArray = [];
        // resultSet.on('row', function(row){
        //   // console.log('this is the row: ', row);
        // userArray.push(row);

      // }); //end on row
      //   resultSet.on('end', function(){
      //
      //   console.log('user array: ', userArray);
      //   res.send( userArray);
      //       done();
      // });
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
          res.send(results.rows);
        }
      });
    }
  });
});

router.put('/',function(req,res){
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      connection.query('UPDATE users SET ' + req.body.type + '=true WHERE id=$1', [req.body.user.id], function(err){
        done();
        if(err){
          console.log(err);
          res.sendStatus(500);
        }
        else{
          res.sendStatus(200);
        }
      });
    }
  });
});

router.get('/findEmail/:email', function(req,res){
    pool.connect(function(err,connection,done){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }
      else{
        connection.query('SELECT * FROM users WHERE email=$1',[req.params.email],function(err,result){
          done();
          if(err){
            console.log(err);
            res.sendStatus(500);
          }
          else{
            res.send(result.rows);
          }
        });
      }
    });
});

module.exports = router;
