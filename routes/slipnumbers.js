var md5 = require('md5');
//md5('message') returns 78e731027d8fd50ed642340b7c9a63b3


var pool = require('../modules/pool');

var express = require('express');
var router = express.Router();

//in app.js: app.use('/slipnumber', slipnumber);
router.get('/', function(req,res){
  pool.connect(function(err,connection,done){
    if(err){
      res.sendStatus(500);
    }
    else{
      connection.query('SELECT * FROM slips',function(error,result){
        done();
        if(error){
          console.log(error);
          res.sendStatus(500);
        }
        else{
          console.log('this is the results',result.rows);
          // var holder = result.rows;
          // console.log('popping off the last thing and grabbing the id:', result.rows.pop().id);
          var slips = [];
          for (var i = 0; i < 40; i++) {
            slips.push(md5(result.rows.pop().id).substring(0,9));
          }
          for(i = 0; i<slips.length; i++){
            connection.query('INSERT INTO slips (slip_number) VALUES ($1)', [slips[i]]);
          }
          res.send(slips);
        }
      });
    }
  });
});

module.exports = router;
