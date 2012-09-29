var haggle = exports; exports.constructor = function haggle(){};

var mysql = require('mysql');
var async = require('async');
var path = require('path');

var DBG = (process.env.DEBUG) ? console.log : false;

haggle.post = function(req, res) {
  var pid = req.params.pid;
  var uid = req.params.uid;
  var price = req.params.price;
  var body = "";
  
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    try {
      DBG&&DBG("POST: (" + pid + ", " + uid + "," + price + ")");
      DBG&&DBG(" body: " + JSON.stringify(body));

      processPost(pid, uid, JSON.parse(body), function(err, haggle) {
        var retBody ={
          'err' : err,
          'haggle' : haggle
        };
        return res.json({ 'response': retBody, 'err': err }, 200);
      });

    } catch(err) {
      return res.json({ 'err': err }, 500);
    }
  });
};

haggle.get = function(req, res) {
  var pid = req.params.pid;
  var uid = req.params.uid;
  var body = "";
  
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    try {
      DBG&&DBG("GET: (" + pid + ", " + uid + ")");

      processGet(pid, uid, function(err, haggle) {
        var retBody ={
          'err' : err,
          'haggle' : haggle
        };
        return res.json({ 'response': retBody, 'err': err }, 200);
      });

    } catch(err) {
      return res.json({ 'err': err }, 500);
    }
  });
};

function processPost(pid, uid, cb) {
  cb(null, { 'data': "Something Interesting" } );
}

function processGet(pid, uid, cb) {
  cb(null, { 'data': "Something Interesting" } );
}

