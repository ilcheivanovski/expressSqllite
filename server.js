const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');
const express = require('express');
const bodyparser = require('body-parser')
// Express handlebars module
const exphbs = require('express-handlebars');
const restapi = express();

///library for long poll
const longpoll = require("express-longpoll")(restapi);

// Tell express to use handlebars as it's templating engine
// and look for a file called "views/layouts/base.handlebars" for
// the master layouts and then other files inside "views"
restapi.engine('handlebars', exphbs({ defaultLayout: 'base' }));
restapi.set('view engine', 'handlebars');


// BODY PARSERS URLENCODED/JSON
restapi.use(bodyparser.urlencoded({ extended: true }));
restapi.use(bodyparser.json());

db.serialize(function () {
    // db.run('DROP TABLE IF EXISTS users')
    db.run(`CREATE TABLE IF NOT EXISTS users (
        first_name text NOT NULL,
        last_name text NOT NULL)`);
});


longpoll.create("/userspoll");

//  DEFAULT ROUTER RENDERS BUTONS FOR LIST ALL USERS AND FOR SHOW FORM FOR ADDING USER
restapi.get('', function (req, res) {
    db.all("SELECT * FROM users", function (err, rows) {
        //RENDER USERS ENGINE express-handlebars FROM ABOVE
        res.render('home', {
            //show_polls: polls 
            show_polls: rows
        });
    });
});

/// ROUTE FOR LISTING ALL USERS
restapi.get('/users', function (req, res) {
    //DATABSE QUERY FOR ALL USERS
    db.all("SELECT * FROM users", function (err, rows) {
        res.json({
            rows
        });
    });
});


/// ROUTE FOR UPDATE USER
restapi.put('/users', function (req, res) {
    //DATABSE QUERY FOR ALL USERS
    db.all(`UPDATE users SET first_name = ${req.body.first_name} last_name = ${req.body.last_name} WHERE id = ${req.body.id}`, function (err, rows) {
        res.json({
            rows
        });
    });
});

/// ROUTE FOR DELETE USER BY ID
restapi.delete('/users/:id', function (req, res) {

    sqlDB.run("DELETE FROM users WHERE id=(?)", req.params.id, function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Successful");
        }
        res.send('Success!')
    });
});

//  METHOD THAT SAVES USER AND RETRIEVES LISTOF USERS
restapi.post('/adduser', function (req, res) {

    const sql = `INSERT INTO users (first_name, last_name) VALUES ('${req.body.first_name}', '${req.body.last_name}')`;
    db.run(sql, function (err) {
        if (err) {
            return console.error(err.message);
        }
    });

    // Publishes data to all clients long polling /userspoll endpoint
    // You need to call this AFTER you make a GET request to /poll
    db.all("SELECT * FROM users", function (err, rows) {
        longpoll.publish("/userspoll", { rows });
    });

    res.send("Success");

});

restapi.listen(3000);