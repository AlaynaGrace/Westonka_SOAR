/**
 * Handles requests for teacher view data.
 * @module private/teacher
 */
var express = require('express');
var router = express.Router();
const pg = require('pg');
let port = 3000;

var config = {
 database: '',
 host: 'localhost',
 port: port,
 max: 20
};// end config

router.get('/', function (req, res) {
  console.log('hit teacher route on server');
  // pool.connect(function ( err, connection, done){
  //   if (err) {
  //     res.send( 400 );
  //   } else {
  //     //replace this with actualy query
  //     let resultSet = connection.query("SELECT * FROM users WHERE homeroom_id =$1, [req.user.homeroom_id]");
  //        var userArray = [];
  //       resultSet.on('row', function(row){
  //       userArray.push(row);
  //     }); //end on row
  //       resultSet.on('end', function(){
  //       done();
  //       console.log(userArray);
  //       res.send(userArray);
  //     });
  //   }//end else
  // });// end pool connect
  res.sendStatus(200);

});

module.exports = router;
