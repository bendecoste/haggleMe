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
  res.sendfile(__dirname + "/upload_images/" + id + ".jpg", function(err) {
    if(err) return res.json({ 'err': new Error("Image not found"), 'response': null }, 500);
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

