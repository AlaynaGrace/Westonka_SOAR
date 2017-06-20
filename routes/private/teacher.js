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
  pool.connect(function ( err, connection, done){
    if (err) {
      res.send( 'NO!!!' );
    } else {
      //replace this with actualy query
      let homeRoom = connection.query("SELECT * FROM homerooms WHERE id =$1, [123456]");
        console.log(homeRoom);
        //  var userArray = [];
        // homeRoom.on('row', function(row){
        // userArray.push(row);
      // }); //end on row
        // resultSet.on('end', function(){
        // done();
        // console.log(userArray);
        res.send("YES!");
      // });
    }//end else
  });// end pool connect
  // res.sendStatus(200);

});

module.exports = router;
