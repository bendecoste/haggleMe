var queue = exports; exports.constructor = function queue() {};

var async = require('async');
var Hash = require('hashish');
var mysql = require('mysql');

var mysqlCli = mysql.createClient({
  'host': 'localhost',
  'database': 'haggle'
});

queue.post = function(req, res) {
  var pid = req.params.pid;
  var uid = req.params.uid;

  var body = "";

  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    getRequestedQueue(pid, uid);
  });
};

queue.get = function(req, res) {
  var pid = req.params.pid;

  var body = "";

  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    getRequestedQueue(pid);
  });
  
};

function getRequestedQueue(pid, uid) {
  var sql = 'INSERT INTO queue (pid, uid) VALUES (?, ?)';

  mysqlCli.query(sql, [pid, uid], function(err, res) {
    // something
  });
}

function setRequestedQueue(pid) {
  var sql = 'SELECT * FROM queue WHERE pid = ?';

  mysqlCli.query(sql, [pid], function(err, res) {
    // something
  });
}
