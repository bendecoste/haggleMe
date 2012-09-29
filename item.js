var item = exports; exports.constructor = function item(){};

var mysql = require('mysql');
var async = require('async');
var path = require('path');

var DBG = (process.env.DEBUG) ? console.log : false;

var dbClient = mysql.createClient({
    "host":"localhost",
    "port": 3306,
    "item":"goinstant",
    "password":"",
    "database":"haggle"
});

// GET (id) - Retrieve the data instance referenced by id
item.get = function(req, res) {
  var id = req.params.id;

  DBG&&DBG("GET - id:", id);

  dbClient.query("SELECT * FROM item WHERE id = ?", function(err, results) {
    if (!results) results = [];
    
    if (err) {
      DBG&&DBG("Error retrieving item info");
      DBG&&DBG(err);
      err = new Error("Server error: could not retrieve item info");
    
    } else if (results.length === 0) {
      err = new Error("Invalid id: item does not exist.");
    }

    res.json({'err': err, 'response': results}, err ? 500 : 200);
  });
};

// POST - Add a new item to the db
item.post = function(req, res) {
  DBG&&DBG("POST:");

  var body = "";
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    try {
      DBG&&DBG("POST");
      DBG&&DBG(" body: " + body);

      var item = JSON.parse(body);
      dbClient.query("INSERT INTO item (name) VALUES (?)", [item.name], function(err, results) {
        if (err) {
          DBG&&DBG("Error creating item info");
          DBG&&DBG(err);
          err = new Error("Server error: could not create new item info");
        }
    
        return res.json({ 'err': err,
          'response': [{
            'id' : (err ? 0 : results.insertId),
            'name' : (err ? null : item.name)
          }]
        }, err ? 500 : 200);
      });

    } catch(err) {
      return res.json({ 'err': err, 'response': null }, 500);
    }
  });
};

