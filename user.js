var user = exports; exports.constructor = function user(){};

var mysql = require('mysql');
var async = require('async');
var path = require('path');

var DBG = (process.env.DEBUG) ? console.log : false;

var dbClient = mysql.createClient({
    "host":"localhost",
    "port": 3306,
    "user":"goinstant",
    "password":"",
    "database":"haggle"
});

// GET (id) - Retrieve the data instance referenced by id
user.get = function(req, res) {
  var id = req.params.id;

  DBG&&DBG("GET - id:", id);

  dbClient.query("SELECT * FROM user WHERE id = ?", [id], function(err, results) {
    if (!results) results = [];
    
    if (err) {
      DBG&&DBG("Error retrieving user info");
      DBG&&DBG(err);
      err = new Error("Server error: could not retrieve user info");
    
    } else if (results.length === 0) {
      err = new Error("Invalid id: user does not exist.");
    }

    res.json({'err': err, 'response': results}, err ? 500 : 200);
  });
};

// POST - Add a new user to the db
user.post = function(req, res) {
  DBG&&DBG("POST");

  var user = req.body;
  try {
    DBG&&DBG(" body:", user);

    dbClient.query("INSERT INTO user (`username`, `email`, `password`, `image`) VALUES (?, ?, ?, ?)",
        [user.username ? user.username : "no name supplied",
        user.email ? user.email : "no email supplied",
        user.password ? user.password : "no password supplied",
        0], function(err, results) {
      if (err) {
        DBG&&DBG("Error creating user info");
        DBG&&DBG(err);
        err = new Error("Server error: could not create new user info");
      }
 
      return res.json({ 'err': err,
        'response': [{
          'id' : (err ? 0 : results.insertId),
          'username' : (err ? null : user.username)
        }]
      }, err ? 500 : 200);
    });

  } catch(err) {
    return res.json({ 'err': err, 'response': null }, 500);
  }
};

