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

module.exports = router;
