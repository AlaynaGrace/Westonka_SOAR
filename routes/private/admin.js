/**
 * Provides basic route for admin view
 *
 * @module routes/private admin
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
const pg = require('pg');
let port = 3000;

//PG stuff************
let config = {
  database: '',
  host: 'localhost',
  port: port,
  max: 20
};// end config
let pool = new pg.Pool ( config );

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

module.exports = router;
