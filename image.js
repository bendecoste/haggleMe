var image = exports; exports.constructor = function image(){};

var mysql = require('mysql');
var async = require('async');
var path = require('path');
var fs = require('fs');

var DBG = (process.env.DEBUG) ? console.log : false;

var dbClient = mysql.createClient({
    "host":"localhost",
    "port": 3306,
    "image":"goinstant",
    "password":"",
    "database":"haggle"
});

// GET (id) - Retrieve the data instance referenced by id
image.get = function(req, res) {
  var id = req.params.id;

  DBG&&DBG("GET - id:", id);

  dbClient.query("SELECT * FROM image WHERE id = ?", function(err, results) {
    if (!results) results = [];
    
    if (err) {
      DBG&&DBG("Error retrieving item info");
      DBG&&DBG(err);
      err = new Error("Server error: could not retrieve item info");
    
    } else if (results.length === 0) {
      err = new Error("Invalid id: item does not exist.");
    }

    if (err) return res.json({'err': err, 'response': null}, 500);
    fs.readFile("/images/" + imageId + ".jpg", body, function(err) {
      if(err) return res.json(err, 500);
      return res.json({ 'err': null, 'response': { 'id': imageId } });
    });
  });
};

// POST - Add a new image to the db
image.post = function(req, res) {
  DBG&&DBG("POST:");

  var body = "";
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    try {
      DBG&&DBG("POST");
      DBG&&DBG(" body: " + body);

      var image = JSON.parse(body);
      dbClient.query("INSERT INTO image", function(err, results) {
        var imageId = results.insertId;
        if (err || !imageId) {
          DBG&&DBG("Error creating image");
          DBG&&DBG(err);
          return res.json(new Error("Server error: could not create new image"), 500);
        }
    
        fs.writeFile("/images/" + imageId + ".jpg", body, function(err) {
          if(err) return res.json(err, 500);
          return res.json({ 'err': null, 'response': { 'id': imageId } });
        });
      });

    } catch(err) {
      return res.json({ 'err': err }, 500);
    }
  });
};

