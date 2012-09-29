var item = exports; exports.constructor = function item(){};

var mysql = require('mysql');
var async = require('async');
var path = require('path');

var DBG = (process.env.DEBUG) ? console.log : false;

var dbClient = mysql.createClient({
    "host":"localhost",
    "port": 3306,
    "item":"goinstant",
    'user': 'goinstant',
    "password":"",
    "database":"haggle"
});

// GET (id) - Retrieve the data instance referenced by id
item.get = function(req, res) {
  var id = req.params.id;

  DBG&&DBG("GET - id:", id);

  dbClient.query("SELECT * FROM item WHERE id = ?", [id], function(err, results) {
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
  DBG&&DBG("POST");

  var item = req.body;
  try {
    DBG&&DBG(" body:", item);

    dbClient.query("INSERT INTO item (`name`, `description`, `quantity`, `condition`, `location`, `shipping`, `min_price`, `max_price`, `extra_haggles`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [item.name ? item.name : "no name supplied",
        item.description ? item.description : "no description supplied",
        item.quantity ? item.quantity : 1,
        item.condition ? item.condition : "",
        item.location ? item.location : "",
        item.shipping ? item.shipping : "",
        item.min_price ? item.min_price : 0,
        item.max_price ? item.max_price : 0,
        item.extra_haggles ? item.extra_haggles : 'no',
        0], function(err, results) {
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
};

