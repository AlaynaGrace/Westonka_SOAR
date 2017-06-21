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
var pool = require('../../modules/pool');


router.get('/',function(req,res){
  console.log('in student slips');
  // var studentSlips = [];
  //
  // pool.connect(function(err, connection, done){
  //   if(err){
  //     console.log(err);
  //     res.send(400);
  //   }
  //   else{
  //     var resultSet = connection.query('SELECT * FROM users JOIN slips ON user.id=slips.student_id');
  //
  //     resultSet.on('row', function(row){
  //       studentSlips.push(row);
  //     });
  //     resultSet.on('end', function(){
  //       done();
  //       console.log(studentSlips);
  //       res.send(studentSlips);
  //     });
  //   }
  // });
  res.send(200);
}); // end router.get


router.post('/', function(req,res){
  console.log('in student post with:',req.body);
  var data = req.body;
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      connection.query('UPDATE slips SET s=$1, o=$2, a=$3, r=$4, date_entered=$5, student_id=$6  WHERE slip_number=$7',
        [data.s,data.o,data.a,data.o,data.date_entered,data.student_id,data.slip_number],function(err){
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
});// end router.post

router.get('/check/:slipNumber', function(req,res){
  pool.connect(function(err,connection,done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      connection.query('SELECT * FROM slips WHERE slip_number=$1', [req.params.slipNumber], function(err,result){
        if(err){
          console.log(err);
          res.sendStatus(500);
        }
        else{
          console.log('here is the result from a specific slip:',result.rows[0]);
          if(result.rows[0].student_id === null || result.rows[0].student_id === undefined){
            res.send({isNotUsed: true});
          }
          else{
            res.send({isNotUsed: false});
          }
        }
      });
    }
  });
});

module.exports = router;
