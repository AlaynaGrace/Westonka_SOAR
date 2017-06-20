/**
 * Handles requests for teacher view data.
 * @module private/teacher
 */
var express = require('express');
var router = express.Router();
const pg = require('pg');
let port = 3000;
var pool = require('../../modules/pool.js');
var UserService = require('../../services/user.js');



router.get('/', function (req, res) {
  console.log('hit teacher route on server');
  UserService.findUserByGoogleId().then(function(response){
    console.log(response.data);
    getStudentData();//<--- need to pass in id here
  });
});

function getStudentData (){
  pool.connect(function ( err, connection, done){
    if (err) {
      res.send( 'NO!!!' );
      console.log(err);
    } else {
      console.log('connected to DB');
      let resultSet = connection.query("SELECT * FROM homerooms");
        console.log('this is resultSet', resultSet);
         let userArray = [];
        resultSet.on('row', function(row){
        userArray.push(row);
      }); //end on row
        resultSet.on('end', function(){
        done();
        console.log(userArray);
        res.send(userArray);
      });
    }//end else
  });// end pool connect
  // res.sendStatus(200);
}//end getStudentData

module.exports = router;
