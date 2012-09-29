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

  dbClient.query("SELECT * FROM user WHERE id = ?", function(err, results) {
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
  DBG&&DBG("POST:");

  var body = "";
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    try {
      DBG&&DBG("POST");
      DBG&&DBG(" body: " + body);

      var user = JSON.parse(body);
      dbClient.query("INSERT INTO user (name) VALUES (?)", [user.name], function(err, results) {
        if (err) {
          DBG&&DBG("Error creating user info");
          DBG&&DBG(err);
          err = new Error("Server error: could not create new user info");
        }
    
        return res.json({ 'err': err,
          'response': [{
            'id' : (err ? 0 : results.insertId),
            'name' : (err ? null : user.name)
          }]
        }, err ? 500 : 200);
      });

    } catch(err) {
      return res.json({ 'err': err, 'response': null }, 500);
    }
  });
};

