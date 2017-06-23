/**
 * Provides basic route for admin view
 *
 * @module routes/private admin
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

//pg database
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

module.exports = router;
