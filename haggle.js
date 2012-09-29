var haggle = exports; exports.constructor = function haggle(){};

var mysqlCli = require('./db/client.js');
var async = require('async');
var path = require('path');
var Hash = require('hashish');

var DBG = (process.env.DEBUG) ? console.log : false;

var HAGGLE_RUNNING = 1;


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
      DBG&&DBG(" body: " + body);

      processPost(pid, uid, body, function(err, haggle) {
        var retBody ={
          'err' : err,
          'haggle' : haggle
        };
        return res.json({ 'response': retBody, 'err': err }, 200);
      });

    } catch(err) {
      console.log('err', err);
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

haggle.poll = function() {
  console.log('POLLING FROM DATABASE');
  var sql = 'SELECT id, start_time, status ' +
            'FROM haggle ';

  mysqlCli.query(sql, function(err, res) {
    if (err) {
      DBG&&DBG('ERROR READING FROM DB');
    }

    Hash.forEach(res, function(entry) {
      var running = entry.status === HAGGLE_RUNNING;
      var startTime = Date.now(entry.startTime);
      var currTime = Date.now();
      if (startTime <= currTime && running) {
        haggle.run(entry);
      }
    });
  });
};

function processPost(pid, uid, body, cb) {
  cb(null, { 'data': "Something Interesting" } );
}

function processGet(pid, uid, cb) {
  cb(null, { 'data': "Something Interesting" } );
}


