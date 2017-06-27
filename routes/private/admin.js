/**
 * Provides basic route for admin view
 *
 * @module routes/private admin
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var csvtojson = require('csvtojson');
var json2csv = require('json2csv');
var pool = require('../../modules/pool');

// GET Admin
router.get('/:group', function (req, res) {
  console.log('in admin server route: ', req.params.group);
  pool.connect(function ( err, connection, done){

    if (err) {
      console.log(err);
      res.sendStatus( 400 );
    } else {
      console.log('inside else adminjs');
      //replace this with actualy query
      connection.query("SELECT * FROM slips JOIN users on slips.student_id=users.id JOIN homerooms ON users.homeroom_id=homerooms.id WHERE grade in " + req.params.group, function(err, result){
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


router.delete('/dropTables',function(req,res){
  pool.connect(function(err,connection,done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      //drops all of the slips that have a student attached to it
      connection.query('DELETE FROM slips WHERE student_id != NULL', function(err){
        done();
        if(err){
          console.log(err);
          res.sendStatus(500);
        }
        else{
          //deletes all the users
          connection.query('DELETE FROM users WHERE id !=$1',[req.user.id], function(err){
            done();
            if(err){
              console.log(err);
              res.sendStatus(500);
            }
            else{
              //Next four queries makes sure that there are at least 4 slips in the db to start out
                connection.query("INSERT INTO slips (slip_number) VALUES ('3ndkgid6')", function(err){

                  done();
                  if(err){
                    console.log(err);
                    res.sendStatus(500);
                  }
                  else{

                    connection.query("INSERT INTO slips (slip_number) VALUES ('47ufndks')", function(err){

                      done();
                      if(err){
                        console.log(err);
                        res.sendStatus(500);
                      }
                      else{

                        connection.query("INSERT INTO slips (slip_number) VALUES ('pld96nw2')", function(err){

                          done();
                          if(err){
                            console.log(err);
                            res.sendStatus(500);
                          }
                          else{

                            connection.query("INSERT INTO slips (slip_number) VALUES ('0k4mxive')", function(err){

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
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });


router.post('/createTables',function(req,res){
    pool.connect(function(err,connection,done){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }
      else{
        // connection.query('CREATE TABLE homerooms(id SERIAL PRIMARY KEY NOT NULL,identifier VARCHAR(120),grade VARCHAR(120));', function(err){
        //   done();
        //   if(err){
        //     console.log(err);
        //     res.sendStatus(500);
        //   }
        //   else{
        //     connection.query('CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL,name VARCHAR(120),email VARCHAR(120),admin BOOLEAN,teacher BOOLEAN,homeroom_id INT REFERENCES homerooms(id),google_id VARCHAR(120),token VARCHAR(1200));', function(err){
        //       done();
        //       if(err){
        //         console.log(err);
        //         res.sendStatus(500);
        //       }
        //       else{
        //         connection.query('CREATE TABLE slips(id SERIAL PRIMARY KEY NOT NULL,slip_number VARCHAR(120),s BOOLEAN,o BOOLEAN,a BOOLEAN,r BOOLEAN,date_entered TIMESTAMP,student_id INT REFERENCES users(id) ON DELETE CASCADE);', function(err){
        //           done();
        //           if(err){
        //             console.log(err);
        //             res.sendStatus(500);
        //           }
        //           else{
                    connection.query('CREATE TABLE json_users(id SERIAL PRIMARY KEY NOT NULL,info VARCHAR(12000));', function(err){
                      done();
                      if(err){
                        console.log(err);
                        res.sendStatus(500);
                      }
                      else{
                        res.sendStatus(201);
                      }
                });
              }
  //           });
  //         }
  //       });
  //     }
  //   });
  // }
});
});

router.post('/upload', function(req,res){
  if(req.isAuthenticated()) {
    console.log('in admin/upload');
   var homeroomContent = req.body.fileContent[0];
   var userContent = req.body.fileContent[1];
   // deletes temporary table
   deleteJSONTable();
   // converts fileContent to JSON
   csvtojson({noheader:false})
   .fromString(userContent)
   .on('end_parsed',function(jsonArrObj) {
     // Inserts into json_volunteer table
     pool.connect(function(err,connection,done) {
       if(err) {
         console.log('Error connecting to the database');
       } else {
         for (var i = 0; i < jsonArrObj.length; i++) {
           jsonObject = jsonArrObj[i];
           connection.query('INSERT INTO json_users (info) VALUES ($1)',
           [jsonObject], function(err) {
             done();
             if (err) {
               console.log(err);
               res.sendStatus(500);
             }
           });
         } // end of for loop
         // Moves information into users table
         connection.query("INSERT INTO users (name,email,teacher,admin) " +
         "SELECT INITCAP(info ->> 'name') AS name, LOWER(info ->> 'email') AS email, " +
         "(info ->> 'admin')::boolean AS admin, (info ->> 'teacher')::boolean AS teacher" +
         " FROM json_users " +
         "ON CONFLICT DO NOTHING;",
          function(err) {
           done();
           if (err) {
             console.log(err);
             res.sendStatus(500);
           } else {
             console.log('Homeroom info complete');
            //  res.sendStatus(200);
            deleteJSONTable();
            // converts fileContent to JSON
            csvtojson({noheader:false})
            .fromString(homeroomContent)
            .on('end_parsed',function(jsonArrObj) {
              // Inserts into json_volunteer table
                if(err) {
                  console.log('Error connecting to the database');
                } else {
                  for (var i = 0; i < jsonArrObj.length; i++) {
                    jsonObject = jsonArrObj[i];
                    connection.query('INSERT INTO json_users (info) VALUES ($1)',
                    [jsonObject], function(err) {
                      done();
                      if (err) {
                        console.log(err);
                        res.sendStatus(500);
                      }
                    });
                  } // end of for loop
                  // Moves information into users table
                  connection.query("INSERT INTO homerooms (identifier,grade) " +
                  "SELECT (info ->> 'identifier') AS identifier, LOWER(info ->> 'grade') AS grade " +
                  "FROM json_users ON CONFLICT DO NOTHING",
                   function(err) {
                    done();
                    if (err) {
                      console.log(err);
                      res.sendStatus(500);
                    } else {
                      res.sendStatus(200);
                    }
                  });
                }
            }); // end of csvtojson
           }
         });
       }
     }); // pool.connect
   }); // end of csvtojson


 } else {
   res.sendStatus(401);
 }
});

function deleteJSONTable() {
  pool.connect(function(err,connection,done) {
    if(err) {
      console.log('Error connecting to the database');
    } else {
      connection.query('DELETE FROM json_users', function(err) {
        done();
        if (err) {
          console.log(err);
        }
      });
    }
  });
}


module.exports = router;
