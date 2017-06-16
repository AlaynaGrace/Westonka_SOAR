/**
 * Provides basic route for providing initial package
 * to client.
 *
 * @module routes/index
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
/**
 * GET /
 *
 * Send client the top-level index.html page.
 * @return index.html
 */



// GET Admin
router.get('/', function (req, res) {
  pool.connect(function ( err, connection, done){
    if (err) {
      res.send( 400 );
    } else {
      //replace this with actualy query
      let resultSet = connection.query("SELECT * FROM slips WHERE student_id IS NOT NULL");
         var userArray = [];
        resultSet.on('row', function(row){
        // userArray.push(row);
      }); //end on row
        resultSet.on('end', function(){
        done();
        console.log(userArray);
        res.send( userArray);
      });
    }//end else
  });// end pool connect

  res.sendStatus(200);

});

module.exports = router;
