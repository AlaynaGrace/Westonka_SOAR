# Westonka SOAR

Westonka SOAR is a full-stack web application that helps automate the process of keeping track of students’ SOAR slips, and the reward drawings for teachers and administrators.  SOAR slips are a tool for positive behavior reinforcement represented as a slip of paper indicating when students have demonstrated “Safety”, “Own It”, “Achieve”, and “Respect”.  Students will be able to enter a new SOAR slip that they have received into the application. Students will also see a count of how many slips they have received to date. Administrators will have a separate view to determine how many slips have been given to students and the ability to complete a prize drawing using the application, which will select a slip id number from the slips that have been awarded to students from the desired time period.  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To run this code, you will first need to install [Node.js](https://nodejs.org/en/)

You will also need to install Postico, or another Ui for postgreSQL.


### Installing

A step by step series of examples that tell you have to get a development env running

1. Clone this repository

2. Install Node.js

3. In terminal, cd into the folder where this repository is
```
ex:
$ cd westonka_soar
```

4. In terminal, use 'npm install' to get all of the necessary dependencies
```
$ npm install
```

5. Copy queries from the data.sql file and execute queries.
note: you must create tables in this order
  1. homerooms
  2. users
  3. slips

6. To get the code running, in terminal type 'node app.js'
```
$ node app.js
```

7. In your preferred browser, go to
```
localhost:3000
```

End with an example of getting some data out of the system or using it for a little demo


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Angular](https://angularjs.org/)
* [Passport](http://passportjs.org/)
* [pSQL](https://www.postgresql.org/)
* [Google OAuth](https://www.npmjs.com/package/passport-google-oauth-2)
* [Bootstrap](http://getbootstrap.com/)
* [jsPDF](https://github.com/MrRio/jsPDF)
* [csvtojson](https://www.npmjs.com/package/csvtojson)


## Authors

* **Charlie Garnaas** - [CharGar](https://github.com/CharGar)
* **Droo Hastings** - [Mong005e](https://github.com/Mong005e)
* **Tiffany Love** - [tiffanylove](https://github.com/tiffanylove)
* **Abby Sepple** - [AbbySepple](https://github.com/AbbySepple)
* **Alayna Buysse** - [AlaynaGrace](https://github.com/AlaynaGrace)


## Acknowledgments

* Thank you to Andrew at Hilltop Primary School for giving us the opportunity to work on this project
* Thank you to our instructors for teaching us and helping with difficult bugs
* Thank you to our cohort (Psi) for all of the support and the help
