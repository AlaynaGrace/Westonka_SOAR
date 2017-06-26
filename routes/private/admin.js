/**
 * Provides basic route for admin view
 *
 * @module routes/private admin
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

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
  var weekAgo = new Date(myDate.getTime() - (60*60*24*7*1000));
  pool.connect(function(err,connection,done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      connection.query('SELECT * FROM slips WHERE date_entered > $1 AND date_entered < $2', [weekAgo,today], function(err,results){
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

router.get('/experimentCreate/createTable', function(req,res){
  pool.connect(function(err,connection,done){
    if(err){
      res.sendStatus(500);
    }
    connection.query('DROP TABLE slips,users,homerooms',function(err){

    // connection.query('CREATE TABLE test(id SERIAL PRIMARY KEY NOT NULL)',function(err){
      done();
      if(err){
        console.log(err);
        res.sendStatus(500);
      }
      else{
        // res.sendStatus(200);
        connection.query('CREATE TABLE homerooms(id SERIAL PRIMARY KEY NOT NULL, identifier VARCHAR(120), grade VARCHAR(120))',function(err){
          done();
          if(err){
            console.log(err);
            res.sendStatus(500);
          }
          else{
            connection.query('CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL,name VARCHAR(120),email VARCHAR(120),admin BOOLEAN,teacher BOOLEAN,homeroom_id INT REFERENCES homerooms(id),google_id VARCHAR(120),token VARCHAR(1200),status BOOLEAN)',function(err){
              done();
              if(err){
                console.log(err);
                res.sendStatus(500);
              }
              else{
                connection.query('CREATE TABLE slips(id SERIAL PRIMARY KEY NOT NULL,slip_number VARCHAR(120),s BOOLEAN,o BOOLEAN,a BOOLEAN,r BOOLEAN,date_entered TIMESTAMP,student_id INT REFERENCES users(id) ON DELETE CASCADE)',function(err){
                  done();
                  if(err){
                    console.log(err);
                    res.sendStatus(500);
                  }
                  else{
                    connection.query("COPY homerooms (identifier,grade) FROM '/Users/alaynabuysse/Downloads/homeroom_upload.csv' DELIMITER ',' CSV", function(err){
                      done();
                      if(err){
                        console.log(err);
                        res.sendStatus(500);
                      }
                      else{
                        connection.query("COPY users (name,email,homeroom_id) FROM '/Users/alaynabuysse/Downloads/soar_students.csv' DELIMITER ',' CSV", function(err){
                          done();
                          if(err){
                            console.log(err);
                            res.sendStatus(500);
                          }
                          else{
                            connection.query("COPY users (name,email,homeroom_id,teacher,admin,status) FROM '/Users/alaynabuysse/Downloads/soar_teachers.csv' DELIMITER ',' CSV", function(err){
                              done();
                              if(err){
                                console.log(err);
                                res.sendStatus(500);
                              }
                              else{
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
                  }
                });
              }
            });
          }
        });
      }
    });
  });
});

module.exports = router;
